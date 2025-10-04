import React, { useEffect, useState } from 'react';
import { getTickets } from '../api/tickets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [breachedTickets, setBreachedTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit] = useState(6);
  const [nextOffset, setNextOffset] = useState(null);

  const fetchTickets = async () => {
    try {
      const res = await getTickets({ limit, offset, search });
      setTickets(res.data.items);
      setBreachedTickets(res.data.breached.map(t => t._id));
      setNextOffset(res.data.next_offset);
      if (res.data.items.length === 0) toast.info('No tickets found.');
    } catch (err) {
      toast.error('Failed to fetch tickets.');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [offset, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setOffset(0);
  };

  return (
    <div style={container}>
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 style={heading}>Tickets</h2>

      <input
        type="text"
        placeholder="Search by title, description, or latest comment..."
        value={search}
        onChange={handleSearch}
        style={searchStyle}
      />

      <div style={ticketsContainer}>
        {tickets.map(ticket => (
          <a
            key={ticket._id}
            href={`/tickets/${ticket._id}`}
            style={{
              ...ticketCard,
              backgroundColor: breachedTickets.includes(ticket._id) ? '#fff1f0' : 'white'
            }}
          >
            <div style={ticketTitle}>{ticket.title}</div>
            <div style={ticketInfo}>
              Status: <span style={statusStyle(ticket.status)}>{ticket.status}</span> | Priority: <span style={priorityStyle(ticket.priority)}>{ticket.priority}</span>
            </div>
            {ticket.slaDeadline && (
              <div style={deadlineStyle(ticket.slaDeadline)}>
                Deadline: {new Date(ticket.slaDeadline).toLocaleString()}
              </div>
            )}
          </a>
        ))}
      </div>

      <div style={pagination}>
        {offset > 0 && <button style={pageBtn} onClick={() => setOffset(offset - limit)}>Prev</button>}
        {nextOffset && <button style={pageBtn} onClick={() => setOffset(nextOffset)}>Next</button>}
      </div>
    </div>
  );
}
const container = {
  padding: '30px 15px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: '#f9fafb',
  minHeight: '100vh',
};

const heading = {
  fontSize: '28px',
  fontWeight: '700',
  marginBottom: '20px',
  color: '#1e3a8a',
  textAlign: 'center',
};

const searchStyle = {
  width: '100%',
  maxWidth: '400px',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  fontSize: '14px',
  outline: 'none',
  marginBottom: '25px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  transition: 'all 0.3s',
};

const ticketsContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '15px',
};

const ticketCard = {
  display: 'block',
  padding: '15px',
  borderRadius: '14px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  textDecoration: 'none',
  color: '#1f2937',
  transition: 'transform 0.25s, box-shadow 0.25s',
  cursor: 'pointer',
};

const ticketTitle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '6px',
  color: '#1e40af',
};

const ticketInfo = {
  fontSize: '13px',
  marginBottom: '6px',
};

const statusStyle = (status) => ({
  fontWeight: '600',
  color: status === 'open' ? '#10b981' : status === 'pending' ? '#f59e0b' : '#ef4444',
});

const priorityStyle = (priority) => ({
  fontWeight: '600',
  color: priority === 'low' ? '#3b82f6' : priority === 'medium' ? '#fbbf24' : '#dc2626',
});

const deadlineStyle = (date) => ({
  fontSize: '12px',
  fontWeight: '500',
  color: new Date(date) < new Date() ? '#dc2626' : '#6b7280',
});

const pagination = {
  marginTop: '25px',
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
};

const pageBtn = {
  padding: '8px 16px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#2563eb',
  color: 'white',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '13px',
  transition: 'all 0.25s',
};
