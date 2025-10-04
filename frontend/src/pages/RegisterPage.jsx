import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Auth.css';
const API_URL = 'https://help-desk-mini3-o8fu-ihwkb1dvc-vansh-13s-projects.vercel.app/api';
export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const onSubmit = async (e) => {
    e.preventDefault();

    // Password length check
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters!');
      return;
    }

    try {
      await axios.post(`${API_URL}/auth/register`, { username, email, password, role });
      toast.success('User registered successfully! Please login.');
      navigate('/login');
    } catch (err) {
      const message = err.response?.data?.error?.message || err.message;
      toast.error('Registration failed: ' + message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title register-title">Register</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="auth-input" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="auth-input" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="auth-input" />
        <select value={role} onChange={e => setRole(e.target.value)} required className="auth-input">
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="auth-button register-button">Register</button>
        <p className="auth-footer">
          Already have an account? <span className="auth-link" onClick={() => navigate('/login')}>Login here</span>
        </p>
      </form>
    </div>
  );
}
