import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Container - Full Screen
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  // Left Panel - Form
  const leftPanelStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#fff'
  };

  // Right Panel - Welcome
  const rightPanelStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    textAlign: 'center'
  };

  // Form container
  const formContainerStyle = {
    width: '100%',
    maxWidth: '400px'
  };

  // Input styles
  const inputStyle = {
    width: '100%',
    padding: '16px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  // Button styles
  const buttonStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  };

  // Link styles
  const linkStyle = {
    color: '#667eea',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Mock registration
    localStorage.setItem('user', JSON.stringify({ 
      name, 
      email 
    }));
    navigate('/profile');
  };

  return (
    <div style={containerStyle}>
      {/* Left Panel - Register Form */}
      <div style={leftPanelStyle}>
        <div style={formContainerStyle}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '10px',
            color: '#333',
            fontWeight: '700'
          }}>
            Create Account
          </h2>
          
          <p style={{ 
            color: '#666', 
            marginBottom: '40px',
            fontSize: '1.1rem'
          }}>
            or use your email for registration
          </p>
          
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            
            <button 
              type="submit" 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              Sign Up
            </button>
          </form>
          
          <p style={{ 
            marginTop: '30px', 
            color: '#666',
            fontSize: '1rem',
            textAlign: 'center'
          }}>
            Already have an account?{' '}
            <span 
              onClick={() => navigate('/login')} 
              style={linkStyle}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* Right Panel - Welcome */}
      <div style={rightPanelStyle}>
        <div style={{ maxWidth: '500px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '20px',
            fontWeight: '700'
          }}>
            Hello, Friend!
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '40px',
            opacity: '0.9',
            lineHeight: '1.6'
          }}>
            Join our community today! Create an account to get started 
            and unlock all the amazing features we have to offer.
          </p>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '40px'
          }}>
            <div style={{ 
              fontSize: '2.5rem',
              marginBottom: '15px'
            }}>
              ✨
            </div>
            <h3 style={{ marginBottom: '10px' }}>Start Your Journey</h3>
            <p style={{ opacity: '0.8', fontSize: '0.9rem' }}>
              Join thousands of satisfied users
            </p>
          </div>
          
          <p style={{ marginBottom: '20px', opacity: '0.8' }}>
            Already have an account?
          </p>
          
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '15px 40px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;