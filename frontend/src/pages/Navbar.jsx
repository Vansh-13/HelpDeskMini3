import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const token = localStorage.getItem('token');
  let user = null;
  try {
    user = token ? JSON.parse(atob(token.split('.')[1])) : null;
  } catch {
    user = null;
  }

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>HelpDesk Mini</div>

      <div style={linksContainer}>
        <a href="/tickets" style={linkStyle}>Tickets</a>
        <a href="/tickets/new" style={linkStyle}>New Ticket</a>

        {user ? (
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <div 
              style={profileStyle} 
              onClick={() => setShowDropdown(prev => !prev)}
              title={`Logged in as ${user.username}`}
            >
              <span style={avatarStyle}>{user.username[0].toUpperCase()}</span>
              <span>{user.username}</span>
            </div>

            {showDropdown && (
              <div style={dropdownStyle}>
                <button onClick={handleLogout} style={dropdownBtnStyle}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <a href="/login" style={linkStyle}>Login</a>
            <a href="/register" style={linkStyle}>Register</a>
          </>
        )}
      </div>
    </nav>
  );
}

// Navbar styles
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 24px',
  backgroundColor: 'rgba(30, 41, 59, 0.75)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  transition: 'all 0.3s ease'
};

const logoStyle = {
  fontWeight: '800',
  fontSize: '24px',
  color: '#f3f4f6',
  letterSpacing: '1.5px',
};

const linksContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap'
};

const linkStyle = {
  color: '#f3f4f6',
  fontWeight: '500',
  padding: '8px 14px',
  borderRadius: '8px',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.25s ease',
  userSelect: 'none',
  backgroundColor: 'transparent',
};
linkStyle[':hover'] = {
  backgroundColor: 'rgba(255,255,255,0.1)',
};

const profileStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '6px 14px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255,255,255,0.15)',
  cursor: 'pointer',
  fontWeight: '600',
  color: '#f3f4f6',
  transition: 'all 0.3s ease',
};
profileStyle[':hover'] = {
  backgroundColor: 'rgba(255,255,255,0.25)',
};

const avatarStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#2563eb',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: '700',
  transition: 'all 0.3s ease'
};

const dropdownStyle = {
  position: 'absolute',
  top: '48px',
  right: 0,
  backgroundColor: 'rgba(30, 41, 59, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  borderRadius: '12px',
  padding: '12px',
  minWidth: '160px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  zIndex: 2000,
};

const dropdownBtnStyle = {
  border: 'none',
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '10px 16px',
  borderRadius: '8px',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};
dropdownBtnStyle[':hover'] = {
  backgroundColor: '#dc2626'
};
