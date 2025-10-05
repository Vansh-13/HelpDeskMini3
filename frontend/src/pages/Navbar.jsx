import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const token = localStorage.getItem('token');
  let user = null;
  try {
    user = token ? JSON.parse(atob(token.split('.')[1])) : null;
  } catch {
    user = null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>HelpDesk Mini</div>

      {isMobile ? (
        <>
          <div style={hamburgerStyle} onClick={toggleDropdown}>
            <div style={bar}></div>
            <div style={bar}></div>
            <div style={bar}></div>
          </div>

          {isOpen && (
            <div style={dropdownStyle}>
              <a href="/tickets" style={linkStyle}>Tickets</a>
              <a href="/tickets/new" style={linkStyle}>New Ticket</a>
              {user ? (
                <>
                  <span style={userStyle}>{user.username}</span>
                  <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
                </>
              ) : (
                <>
                  <a href="/login" style={linkStyle}>Login</a>
                  <a href="/register" style={linkStyle}>Register</a>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div style={linksContainer}>
          <a href="/tickets" style={linkStyle}>Tickets</a>
          <a href="/tickets/new" style={linkStyle}>New Ticket</a>
          {user ? (
            <>
              <span style={userStyle}>{user.username}</span>
              <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
            </>
          ) : (
            <>
              <a href="/login" style={linkStyle}>Login</a>
              <a href="/register" style={linkStyle}>Register</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 24px',
  backgroundColor: '#1e293b',
  color: '#f3f4f6',
  position: 'relative',
};

const logoStyle = {
  fontFamily: "'Brush Script MT', cursive",
  fontWeight: '700',
  fontSize: '28px',
  color: '#3b82f6',
};

const hamburgerStyle = {
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  gap: '4px',
};

const bar = {
  width: '25px',
  height: '3px',
  backgroundColor: '#f3f4f6',
  borderRadius: '2px',
};

const linksContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};

const dropdownStyle = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '60px',
  right: '24px',
  backgroundColor: '#1e293b',
  padding: '12px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  zIndex: 10,
};

const linkStyle = {
  color: '#f3f4f6',
  fontWeight: '500',
  textDecoration: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  transition: 'all 0.25s ease',
  cursor: 'pointer',
};

const userStyle = { fontWeight: '600', color: '#fcd34d', padding: '6px 12px' };

const logoutBtnStyle = {
  backgroundColor: '#ef4444',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
  cursor: 'pointer',
  fontWeight: '600',
};
