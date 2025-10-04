import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTicket, addComment, updateTicket } from '../api/tickets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TicketPage.css';

export default function TicketPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const role = JSON.parse(atob(token.split('.')[1])).role;
      setUserRole(role);
    }

    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const res = await getTicket(id);
      setTicket(res.data.ticket);
      setComments(res.data.comments);
      setStatus(res.data.ticket.status);
      setAssignedTo(res.data.ticket.assignedTo || '');
      setVersion(res.data.ticket.version);
    } catch (err) {
      toast.error('Failed to load ticket.');
    }
  };

  const onCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.warning('Comment cannot be empty.');
      return;
    }
    try {
      const res = await addComment(id, comment);
      setComments([...comments, res.data.comment]);
      setComment('');
      toast.success('Comment added successfully!');
    } catch (err) {
      toast.error('Failed to add comment.');
    }
  };

  const onUpdateTicket = async (e) => {
    e.preventDefault();
    try {
      await updateTicket(id, { status, assignedTo, version });
      toast.success('Ticket updated successfully!');
      fetchTicket();
    } catch (err) {
      toast.error('Failed to update ticket.');
    }
  };

  if (!ticket) return <div className="loading">Loading...</div>;

  const slaExceeded = ticket.slaDeadline && new Date(ticket.slaDeadline) < new Date();

  return (
    <div className="ticket-page">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="ticket-card">
        <div className="ticket-header">
          <h2 className="ticket-title">{ticket.title}</h2>
          <span className={`status-badge ${ticket.status}`}>{ticket.status.toUpperCase()}</span>
        </div>
        <p className="ticket-desc">{ticket.description}</p>

        <div className="ticket-meta">
          <div className={`sla-card ${slaExceeded ? 'sla-exceeded' : ''}`}>
            SLA: {ticket.slaDeadline ? new Date(ticket.slaDeadline).toLocaleString() : 'N/A'}
          </div>
          <div className="priority-card">
            Priority: {ticket.priority || 'Normal'}
          </div>
        </div>

        {(userRole === 'agent' || userRole === 'admin') && (
          <form onSubmit={onUpdateTicket} className="update-form">
            <h3>Update Ticket</h3>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </select>
            <input
              type="text"
              placeholder="Assign to UserID"
              value={assignedTo}
              onChange={e => setAssignedTo(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        )}

        <div className="timeline-section">
          <h3>Timeline</h3>
          <ul className="timeline">
            {ticket.timeline.map((t, index) => (
              <li key={index}>
                <span className="action">{t.action}</span> by <strong>{t.actor.username || t.actor}</strong> at {new Date(t.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          <ul className="comments">
            {comments.map(c => (
              <li key={c._id} className="comment-card">
                <strong>{c.author?.username || c.author}:</strong> {c.message}
              </li>
            ))}
          </ul>

          <form onSubmit={onCommentSubmit} className="comment-form">
            <textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            />
            <button type="submit">Add Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
}
