import React, { useState } from 'react';
import { createTicket } from '../api/tickets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewTicketPage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('medium');
  const [hover, setHover] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title cannot be empty!');
      return;
    }

    try {
      await createTicket({ title, description: desc, priority });
      toast.success('Ticket created successfully!');
      setTitle('');
      setDesc('');
      setPriority('medium');
      setTimeout(() => { window.location.href = '/tickets'; }, 1000);
    } catch (err) {
      toast.error('Failed to create ticket: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={onSubmit} style={form}>
        <h2 style={heading}>Create New Ticket</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={input}
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          style={{ ...input, height: '120px', resize: 'vertical' }}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          style={select}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button
          type="submit"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            ...button,
            backgroundColor: hover ? '#1e40af' : '#2563eb'
          }}
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
}


const container = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #e0f2fe, #f1f5f9)',
  padding: '15px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const form = {
  backgroundColor: 'white',
  padding: '35px 30px',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
  width: '100%',
  maxWidth: '450px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  transition: 'all 0.3s ease',
};

const heading = {
  margin: '0 0 20px',
  fontSize: '26px',
  fontWeight: '700',
  color: '#1e3a8a',
  textAlign: 'center',
};

const input = {
  padding: '14px 16px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  fontSize: '15px',
  outline: 'none',
  boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
  transition: 'all 0.3s',
};

const select = {
  ...input,
  cursor: 'pointer',
  backgroundColor: 'white',
  color: '#1f2937',
};

const button = {
  padding: '14px 0',
  borderRadius: '30px',
  border: 'none',
  color: 'white',
  fontWeight: '700',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 6px 18px rgba(37,99,235,0.4)',
};
