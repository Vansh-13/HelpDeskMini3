const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const auth = require('../middlewares/auth');

// Create ticket
router.post('/', auth(), async (req, res) => {
  const { title, description, priority, slaDeadline } = req.body;
  if (!title) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "title" } });

  const ticket = await Ticket.create({
    title, description, priority, slaDeadline, createdBy: req.user.id,
    timeline: [{ action: "Created ticket", actor: req.user.id }]
  });

  res.json({ id: ticket._id });
});

// List tickets with pagination, search, SLA
router.get('/', auth(), async (req, res) => {
  const { limit=10, offset=0, search="" } = req.query;
  const filter = search ? { $or: [
    { title: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } }
  ]} : {};

  const items = await Ticket.find(filter).sort({ createdAt: -1 }).skip(Number(offset)).limit(Number(limit));
  const next_offset = items.length === Number(limit) ? Number(offset)+Number(limit) : null;

  // SLA check
  const now = new Date();
  const breached = items.filter(t => t.slaDeadline && t.slaDeadline < now);

  res.json({ items, next_offset, breached });
});

// Ticket details with comments
router.get('/:id', auth(), async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate('createdBy assignedTo timeline.actor');
  if (!ticket) return res.status(404).json({ error: { code: "NOT_FOUND" } });

  const comments = await Comment.find({ ticketId: req.params.id }).sort({ createdAt: 1 }).populate('author');
  res.json({ ticket, comments });
});

// Update ticket (optimistic locking)
router.patch('/:id', auth(['agent','admin']), async (req, res) => {
  const { status, assignedTo, version } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ error: { code: "NOT_FOUND" } });

  if (version !== ticket.version) return res.status(409).json({ error: { code: "VERSION_CONFLICT" } });

  if (status) ticket.status = status;
  if (assignedTo) ticket.assignedTo = assignedTo;
  ticket.version++;
  ticket.timeline.push({ action: "Updated ticket", actor: req.user.id });

  await ticket.save();
  res.json({ ticket });
});

// Add comment
router.post('/:id/comments', auth(), async (req,res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: { code: "FIELD_REQUIRED" } });

  const comment = await Comment.create({ ticketId: req.params.id, author: req.user.id, message });
  const ticket = await Ticket.findById(req.params.id);
  ticket.timeline.push({ action: "Added comment", actor: req.user.id });
  await ticket.save();

  res.json({ comment });
});

module.exports = router;
