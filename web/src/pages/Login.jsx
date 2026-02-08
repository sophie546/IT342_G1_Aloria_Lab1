import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Poppins', 'Inter', 'Segoe UI', sans-serif",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
    },

    decorativeCircle1: {
      position: 'absolute',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: '#fbbf24',
      bottom: '-100px',
      left: '-50px',
      opacity: '0.8',
      zIndex: 0,
    },

    decorativeCircle2: {
      position: 'absolute',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: '#f87171',
      top: '-50px',
      right: '-30px',
      opacity: '0.7',
      zIndex: 0,
    },
    
    card: {
      width: '100%',
      maxWidth: '900px',
      height: '600px',
      backgroundColor: '#fff',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)',
      position: 'relative',
      display: 'flex',
      zIndex: 1,
    },
    
    // WELCOME PANEL - Slides from LEFT to RIGHT
    welcomePanel: {
      position: 'absolute',
      width: '50%',
      height: '100%',
      background: 'linear-gradient(135deg, #4db8a5 0%, #3ba795 100%)',
      color: 'white',
      padding: '60px 40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: showRegister ? 'translateX(100%)' : 'translateX(0)',
      zIndex: 10,
      left: 0,
      top: 0,
      boxSizing: 'border-box',
    },

    logo: {
      position: 'absolute',
      top: '30px',
      left: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '18px',
      fontWeight: '600',
    },

    logoIcon: {
      width: '32px',
      height: '32px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
    },

    decorativeShape: {
      position: 'absolute',
      width: '120px',
      height: '120px',
      border: '15px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '25px',
      transform: 'rotate(45deg)',
      bottom: '60px',
      left: '40px',
    },

    decorativeShape2: {
      position: 'absolute',
      width: '80px',
      height: '80px',
      border: '12px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '18px',
      transform: 'rotate(25deg)',
      top: '80px',
      right: '30px',
    },
    
    welcomeTitle: {
      fontSize: '2.2rem',
      fontWeight: '700',
      marginBottom: '20px',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
    },
    
    welcomeText: {
      fontSize: '0.95rem',
      opacity: '0.95',
      lineHeight: '1.6',
      marginBottom: '40px',
      textAlign: 'center',
      maxWidth: '280px',
      position: 'relative',
      zIndex: 2,
    },
    
    signInBtn: {
      padding: '14px 50px',
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid white',
      borderRadius: '25px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      letterSpacing: '1px',
      position: 'relative',
      zIndex: 2,
    },
    
    // FORM CONTAINER
    formContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
    },
    
    // LEFT SIDE - Register Form
    leftSide: {
      width: '50%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
    },
    
    // RIGHT SIDE - Login Form
    rightSide: {
      width: '50%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
    },
    
    // LOGIN FORM
    loginForm: {
      opacity: showRegister ? 0 : 1,
      transform: showRegister ? 'translateX(30px)' : 'translateX(0)',
      transition: 'all 0.5s ease',
      pointerEvents: showRegister ? 'none' : 'auto',
      width: '100%',
      maxWidth: '380px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    
    // REGISTER FORM
    registerForm: {
      opacity: showRegister ? 1 : 0,
      transform: showRegister ? 'translateX(0)' : 'translateX(-30px)',
      transition: 'all 0.5s ease 0.2s',
      pointerEvents: showRegister ? 'auto' : 'none',
      width: '100%',
      maxWidth: '380px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    
    formTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '10px',
      color: '#4db8a5',
      textAlign: 'center',
    },

    dividerText: {
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#666',
      fontWeight: '400',
      margin: '5px 0 15px 0',
    },
    
    formGroup: {
      marginBottom: '0',
    },
    
    inputWrapper: {
      position: 'relative',
      width: '100%',
    },
    
    input: {
      width: '100%',
      padding: '14px 14px 14px 45px',
      border: 'none',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box',
      color: '#555',
    },
    
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#999',
      transition: 'color 0.3s ease',
    },
    
    submitBtn: {
      width: '100%',
      maxWidth: '200px',
      margin: '10px auto 0',
      padding: '14px',
      backgroundColor: '#4db8a5',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      letterSpacing: '1px',
      display: 'block',
    },
    
    toggleText: {
      textAlign: 'center',
      color: '#666',
      fontSize: '0.88rem',
    },
    
    toggleLink: {
      color: '#4db8a5',
      fontWeight: '600',
      cursor: 'pointer',
      marginLeft: '4px',
    },

    forgotLink: {
      color: '#4db8a5',
      fontSize: '0.85rem',
      textDecoration: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-block',
    },
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert('Login successful!');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      alert('Registration successful!');
    }
  };

  const toggleForms = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowRegister(!showRegister);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const handleBtnHover = (e) => {
    e.target.style.backgroundColor = '#3ba795';
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 8px 20px rgba(77, 184, 165, 0.3)';
  };

  const handleBtnLeave = (e) => {
    e.target.style.backgroundColor = '#4db8a5';
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  };

  const handleSignInBtnHover = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
    e.target.style.transform = 'translateY(-2px)';
  };

  const handleSignInBtnLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.transform = 'translateY(0)';
  };

  const handleInputFocus = (e) => {
    e.target.style.backgroundColor = '#fff';
    e.target.style.boxShadow = '0 0 0 2px rgba(77, 184, 165, 0.2)';
  };

  const handleInputBlur = (e) => {
    e.target.style.backgroundColor = '#f5f5f5';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={styles.container}>
      <div style={styles.decorativeCircle1}></div>
      <div style={styles.decorativeCircle2}></div>

      <div style={styles.card}>
        {/* WELCOME PANEL */}
        <div style={styles.welcomePanel}>

          <div style={styles.decorativeShape}></div>
          <div style={styles.decorativeShape2}></div>
          
          <h1 style={styles.welcomeTitle}>
            {showRegister ? 'Welcome!' : 'Welcome Back!'}
          </h1>
          <p style={styles.welcomeText}>
            {showRegister 
              ? 'Create an account to start your journey with us'
              : 'To keep connected with us please login with your personal info'
            }
          </p>
          
          <button 
            style={styles.signInBtn}
            onClick={toggleForms}
            onMouseEnter={handleSignInBtnHover}
            onMouseLeave={handleSignInBtnLeave}
          >
            {showRegister ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </div>

        {/* FORM CONTAINER */}
        <div style={styles.formContainer}>
          {/* LEFT SIDE - Register Form */}
          <div style={styles.leftSide}>
            <div style={styles.registerForm}>
              <h2 style={styles.formTitle}>Create Account</h2>
              
              <p style={styles.dividerText}>Enter your details to get started</p>
              
              <form onSubmit={handleRegisterSubmit}>
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <User size={18} style={styles.inputIcon} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={styles.input}
                      placeholder="Name"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <Mail size={18} style={styles.inputIcon} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={styles.input}
                      placeholder="Email"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <Lock size={18} style={styles.inputIcon} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={styles.input}
                      placeholder="Password"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  style={styles.submitBtn}
                  onMouseEnter={handleBtnHover}
                  onMouseLeave={handleBtnLeave}
                >
                  SIGN UP
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE - Login Form */}
          <div style={styles.rightSide}>
            <div style={styles.loginForm}>
              <h2 style={styles.formTitle}>Sign In</h2>
              
              <p style={styles.dividerText}>Welcome back! Please login to continue</p>
              
              <form onSubmit={handleLoginSubmit}>
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <Mail size={18} style={styles.inputIcon} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={styles.input}
                      placeholder="Email"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <Lock size={18} style={styles.inputIcon} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={styles.input}
                      placeholder="Password"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                </div>

                <div style={styles.toggleText}>
                  <a 
                    href="#" 
                    style={styles.forgotLink}
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Forgot password');
                    }}
                  >
                    Forgot your password?
                  </a>
                </div>
                
                <button 
                  type="submit" 
                  style={styles.submitBtn}
                  onMouseEnter={handleBtnHover}
                  onMouseLeave={handleBtnLeave}
                >
                  SIGN IN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;