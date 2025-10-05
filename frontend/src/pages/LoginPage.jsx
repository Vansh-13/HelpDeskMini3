import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Auth.css';
const API_URL = 'https://help-desk-mini3-o8fu-ihwkb1dvc-vansh-13s-projects.vercel.app/api';
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    // Password length check
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long!');
      return;
    }

    try {
      const res = await axios.post(
  `${API_URL}/auth/login`,
  { email, password },
  { withCredentials: true } // ✅ add this line
);

      // const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      navigate('/tickets');
    } catch (err) {
      // If email/password wrong
      const message = err.response?.data?.error?.message || err.message;
      toast.error('Login failed: ' + message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button login-button">Login</button>
        <p className="auth-footer">
          Don’t have an account? <span className="auth-link" onClick={() => navigate('/register')}>Create one here</span>
        </p>
      </form>
    </div>
  );
}
