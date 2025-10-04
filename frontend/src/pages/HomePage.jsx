import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f5f7fa' }}>
      
    
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 20px',
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        color: 'white',
        clipPath: 'ellipse(100% 100% at 50% 0%)'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2', textShadow: '2px 2px 6px rgba(0,0,0,0.2)' }}>
          HelpDesk Mini
        </h1>
        <p style={{ fontSize: '20px', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.6', textShadow: '1px 1px 4px rgba(0,0,0,0.2)' }}>
          Create, assign, and resolve tickets seamlessly. Monitor SLA deadlines, collaborate with your team, and stay organized.
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/login')}
            style={heroBtnStyle('#1e3a8a')}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            style={heroBtnStyle('#db2777')}
          >
            Register
          </button>
        </div>
      </section>

     
      <section style={{
        backgroundColor: '#f9fafb',
        padding: '60px 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {[
          { title: 'Ticket Management', desc: 'Create, update, and track tickets with ease.', color: '#6366f1' },
          { title: 'SLA Monitoring', desc: 'Keep track of deadlines and priorities.', color: '#ec4899' },
          { title: 'Team Collaboration', desc: 'Comment and assign tickets to team members.', color: '#10b981' },
          { title: 'Analytics', desc: 'View reports and improve your workflow.', color: '#f59e0b' },
        ].map((feature, idx) => (
          <div key={idx} style={{
            background: 'white',
            padding: '30px 20px',
            borderRadius: '20px',
            boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
            textAlign: 'center',
            borderTop: `4px solid ${feature.color}`
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px', color: feature.color }}>{feature.title}</h3>
            <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.5' }}>{feature.desc}</p>
          </div>
        ))}
      </section>

   
      <footer style={{
        backgroundColor: '#1f2937',
        color: 'white',
        textAlign: 'center',
        padding: '25px 20px',
        marginTop: '40px'
      }}>
        <p>© 2025 HelpDesk Mini. All rights reserved.</p>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>Crafted for seamless support management</p>
      </footer>
    </div>
  );
}

const heroBtnStyle = (color) => ({
  backgroundColor: color,
  color: 'white',
  fontWeight: '700',
  fontSize: '16px',
  padding: '12px 28px',
  borderRadius: '30px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s',
});
