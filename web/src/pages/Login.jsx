import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('error'); // 'error' or 'success'

  const navigate = useNavigate();

  // Notification styles
  const notificationStyles = {
    notification: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '12px',
      backgroundColor: notificationType === 'error' ? '#fee2e2' : '#dcfce7',
      color: notificationType === 'error' ? '#dc2626' : '#16a34a',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 9999,
      animation: 'slideIn 0.3s ease',
      border: notificationType === 'error' ? '1px solid #fecaca' : '1px solid #bbf7d0',
      maxWidth: '400px',
    },
    notificationContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1,
    },
    notificationIcon: {
      flexShrink: 0,
    },
    notificationMessage: {
      fontSize: '0.95rem',
      fontWeight: '500',
      lineHeight: '1.5',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: notificationType === 'error' ? '#dc2626' : '#16a34a',
      cursor: 'pointer',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
    },
  };

  const showErrorNotification = (message) => {
    setNotificationMessage(message);
    setNotificationType('error');
    setShowNotification(true);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setNotificationType('success');
    setShowNotification(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password);
  };

  const validateName = (name) => {
    // Only allows letters, spaces, and common name characters like apostrophes and hyphens
    const nameRegex = /^[A-Za-z\s.'-]+$/;
    
    // Check if it matches the allowed characters
    if (!nameRegex.test(name)) {
      return false;
    }
    
    // Remove spaces to check actual character count
    const trimmedName = name.trim();
    
    // Must have at least 4 characters (after trimming spaces)
    if (trimmedName.length < 4) {
      return false;
    }
    
    // Must contain at least one letter (not just spaces/special chars)
    const hasLetters = /[A-Za-z]/.test(trimmedName);
    if (!hasLetters) {
      return false;
    }
    
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setApiError('');
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setApiError('');
    if (value && !validatePassword(value)) {
      setPasswordError('Password must be at least 8 characters and include numbers');
    } else {
      setPasswordError('');
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setApiError('');
    
    if (!value) {
      setNameError('');
      return;
    }
    
    // Check allowed characters first
    const nameRegex = /^[A-Za-z\s.'-]+$/;
    if (!nameRegex.test(value)) {
      setNameError('Name should only contain letters, spaces, and common name characters');
      return;
    }
    
    const trimmedName = value.trim();
    
    // Check minimum length
    if (trimmedName.length < 4) {
      setNameError('Name must be at least 4 characters long');
      return;
    }
    
    // Check if contains at least one letter
    const hasLetters = /[A-Za-z]/.test(trimmedName);
    if (!hasLetters) {
      setNameError('Name must contain at least one letter');
      return;
    }
    
    setNameError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid) {
      setEmailError('Please enter a valid email address');
      showErrorNotification('Please enter a valid email address');
      return;
    }
    
    if (!isPasswordValid) {
      setPasswordError('Password must be at least 8 characters and include numbers');
      showErrorNotification('Password must be at least 8 characters and include numbers');
      return;
    }
    
    if (isEmailValid && isPasswordValid && email && password) {
      setIsLoading(true);
      setApiError('');
      
      try {
        console.log('Sending login request...');
        
        const response = await api.post('/auth/login', {
          identifier: email,
          password: password
        });
        
        console.log('Login successful:', response.data);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          userId: response.data.userId,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email
        }));
        
        showSuccessNotification('Login successful! Redirecting to profile...');
        
        // Small delay to show success message before redirect
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } catch (error) {
        console.error('Login error:', error);
        
        // Handle different error scenarios
        let errorMessage = 'Login failed. Please check your credentials.';
        
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
          
          if (status === 401) {
            if (typeof data === 'string') {
              errorMessage = data;
            } else if (data.message) {
              errorMessage = data.message;
            } else {
              errorMessage = 'Invalid email or password. Please try again.';
            }
          } else if (status === 400) {
            errorMessage = 'Invalid request. Please check your input.';
          } else if (status === 403) {
            errorMessage = 'Account locked. Please contact support.';
          } else if (status === 404) {
            errorMessage = 'User not found. Please register first.';
          } else if (status === 500) {
            errorMessage = 'Server error. Please try again later.';
          }
        } else if (error.request) {
          errorMessage = 'Network error. Please check your connection.';
        }
        
        setApiError(errorMessage);
        showErrorNotification(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isNameValid) {
      const trimmedName = name.trim();
      let nameErrorMessage = '';
      
      if (!/^[A-Za-z\s.'-]+$/.test(name)) {
        nameErrorMessage = 'Name should only contain letters, spaces, and common name characters';
        setNameError(nameErrorMessage);
      } else if (trimmedName.length < 4) {
        nameErrorMessage = 'Name must be at least 4 characters long';
        setNameError(nameErrorMessage);
      } else if (!/[A-Za-z]/.test(trimmedName)) {
        nameErrorMessage = 'Name must contain at least one letter';
        setNameError(nameErrorMessage);
      } else {
        nameErrorMessage = 'Please enter a valid name';
        setNameError(nameErrorMessage);
      }
      
      showErrorNotification(nameErrorMessage);
      return;
    }
    
    if (!isEmailValid) {
      const emailErrorMessage = 'Please enter a valid email address';
      setEmailError(emailErrorMessage);
      showErrorNotification(emailErrorMessage);
      return;
    }
    
    if (!isPasswordValid) {
      const passwordErrorMessage = 'Password must be at least 8 characters and include numbers';
      setPasswordError(passwordErrorMessage);
      showErrorNotification(passwordErrorMessage);
      return;
    }
    
    if (isNameValid && isEmailValid && isPasswordValid && name && email && password) {
      setIsLoading(true);
      setApiError('');
      
      try {
        console.log('Sending registration request...');
        
        // Split the name into first and last name
        const nameParts = name.trim().split(' ');
        const firstname = nameParts[0] || '';
        // If only one name, use "User" as lastname
        const lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'User';
        
        // Validate first and last name length for backend
        if (firstname.length < 2) {
          throw new Error('First name must be at least 2 characters long');
        }
        
        if (lastname.length < 2) {
          throw new Error('Last name must be at least 2 characters long');
        }
        
        console.log('Sending data:', { firstname, lastname, email, password });
        
        const response = await api.post('/auth/register', {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        });
        
        console.log('Registration successful:', response.data);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          userId: response.data.userId,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email
        }));
        
        showSuccessNotification('Registration successful! Redirecting to profile...');
        
        // Small delay to show success message before redirect
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } catch (error) {
        console.error('Registration error:', error);
        
        let errorMessage = 'Registration failed. Please try again.';
        
        if (error.message && error.message.includes('First name')) {
          errorMessage = error.message;
        } else if (error.message && error.message.includes('Last name')) {
          errorMessage = error.message;
        } else if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
          
          if (status === 400) {
            if (data.errors) {
              // Handle validation errors
              const validationErrors = Object.values(data.errors).join(', ');
              errorMessage = validationErrors;
            } else if (data.message) {
              errorMessage = data.message;
            } else if (typeof data === 'string') {
              errorMessage = data;
            } else {
              errorMessage = 'Invalid registration data. Please check your input.';
            }
          } else if (status === 409) {
            errorMessage = 'Email already exists. Please use a different email.';
          } else if (status === 500) {
            errorMessage = 'Server error. Please try again later.';
          }
        } else if (error.request) {
          errorMessage = 'Network error. Please check your connection.';
        }
        
        setApiError(errorMessage);
        showErrorNotification(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleForms = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowRegister(!showRegister);
    
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setApiError('');
    setShowPassword(false);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

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
    
    formContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
    },
    
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
      padding: '14px 50px 14px 45px',
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
      zIndex: 2,
    },

    passwordToggle: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#999',
      cursor: 'pointer',
      zIndex: 2,
      background: 'none',
      border: 'none',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      opacity: (nameError || emailError || passwordError || isLoading) ? 0.6 : 1,
      cursor: (nameError || emailError || passwordError || isLoading) ? 'not-allowed' : 'pointer',
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

    errorMessage: {
      fontSize: '0.8rem',
      color: '#f87171',
      marginTop: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      animation: 'fadeIn 0.3s ease',
    },

    apiError: {
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      textAlign: 'center',
      marginBottom: '10px',
      border: '1px solid #fecaca',
    },

    passwordRequirements: {
      fontSize: '0.8rem',
      color: '#666',
      marginTop: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },

    nameRequirements: {
      fontSize: '0.8rem',
      color: '#666',
      marginTop: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },

    nameHint: {
      fontSize: '0.75rem',
      color: '#888',
      marginTop: '4px',
      fontStyle: 'italic',
    },

    validCheck: {
      color: '#4db8a5',
      fontSize: '14px',
    },

    nameExample: {
      fontSize: '0.75rem',
      color: '#4db8a5',
      marginTop: '2px',
      fontStyle: 'italic',
    },
  };

  const handleBtnHover = (e) => {
    if (!nameError && !emailError && !passwordError && !isLoading) {
      e.target.style.backgroundColor = '#3ba795';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 8px 20px rgba(77, 184, 165, 0.3)';
    }
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

  const handlePasswordToggleHover = (e) => {
    e.target.style.color = '#4db8a5';
  };

  const handlePasswordToggleLeave = (e) => {
    e.target.style.color = '#999';
  };

  return (
    <div style={styles.container}>
      {/* Notification Component */}
      {showNotification && (
        <div style={notificationStyles.notification}>
          <div style={notificationStyles.notificationContent}>
            <span style={notificationStyles.notificationIcon}>
              {notificationType === 'error' ? (
                <XCircle size={20} />
              ) : (
                <CheckCircle size={20} />
              )}
            </span>
            <span style={notificationStyles.notificationMessage}>
              {notificationMessage}
            </span>
          </div>
          <button
            style={notificationStyles.closeButton}
            onClick={() => setShowNotification(false)}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = notificationType === 'error' ? '#fecaca' : '#bbf7d0';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <XCircle size={18} />
          </button>
        </div>
      )}

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
              
              <p style={styles.dividerText}>Enter your full name to get started</p>
              
              {apiError && showRegister && (
                <div style={styles.apiError}>
                  <AlertCircle size={16} style={{ marginRight: '8px' }} />
                  <div>
                    <strong>Registration failed:</strong>
                    <p style={{margin: '5px 0 0 0', fontSize: '0.85rem'}}>{apiError}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleRegisterSubmit}>
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <User size={18} style={styles.inputIcon} />
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      required
                      style={styles.input}
                      placeholder="Full Name (e.g., John Doe)"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                  {nameError ? (
                    <div style={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {nameError}
                    </div>
                  ) : name ? (
                    validateName(name) ? (
                      <div style={styles.nameRequirements}>
                        <CheckCircle size={14} style={styles.validCheck} />
                        Name is valid
                      </div>
                    ) : (
                      <div style={styles.nameRequirements}>
                        Name must be at least 4 letters long
                      </div>
                    )
                  ) : (
                    <div style={styles.nameHint}>
                      Enter your full name (first and last name)
                    </div>
                  )}
                </div>
                
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <Mail size={18} style={styles.inputIcon} />
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      style={styles.input}
                      placeholder="Email"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                  {emailError && (
                    <div style={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {emailError}
                    </div>
                  )}
                </div>
                
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <Lock size={18} style={styles.inputIcon} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      style={styles.input}
                      placeholder="Password (min 8 chars, include numbers)"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <button 
                      type="button"
                      style={styles.passwordToggle}
                      onClick={togglePasswordVisibility}
                      onMouseEnter={handlePasswordToggleHover}
                      onMouseLeave={handlePasswordToggleLeave}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {passwordError ? (
                    <div style={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {passwordError}
                    </div>
                  ) : password ? (
                    validatePassword(password) ? (
                      <div style={styles.passwordRequirements}>
                        <CheckCircle size={14} style={styles.validCheck} />
                        Password is valid
                      </div>
                    ) : (
                      <div style={styles.passwordRequirements}>
                        Password must be at least 8 characters and include numbers
                      </div>
                    )
                  ) : null}
                </div>
                
                <button 
                  type="submit" 
                  style={styles.submitBtn}
                  onMouseEnter={handleBtnHover}
                  onMouseLeave={handleBtnLeave}
                  disabled={nameError || emailError || passwordError || isLoading}
                >
                  {isLoading ? 'REGISTERING...' : 'SIGN UP'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE - Login Form */}
          <div style={styles.rightSide}>
            <div style={styles.loginForm}>
              <h2 style={styles.formTitle}>Sign In</h2>
              
              <p style={styles.dividerText}>Welcome back! Please login to continue</p>
              
              {apiError && !showRegister && (
                <div style={styles.apiError}>
                  <AlertCircle size={16} style={{ marginRight: '8px' }} />
                  <div>
                    <strong>Login failed:</strong>
                    <p style={{margin: '5px 0 0 0', fontSize: '0.85rem'}}>{apiError}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleLoginSubmit}>
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <Mail size={18} style={styles.inputIcon} />
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      style={styles.input}
                      placeholder="Email"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                  {emailError && (
                    <div style={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {emailError}
                    </div>
                  )}
                </div>
                
                <div style={styles.formGroup}>
                  <div style={styles.inputWrapper}>
                    <Lock size={18} style={styles.inputIcon} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      style={styles.input}
                      placeholder="Password"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <button 
                      type="button"
                      style={styles.passwordToggle}
                      onClick={togglePasswordVisibility}
                      onMouseEnter={handlePasswordToggleHover}
                      onMouseLeave={handlePasswordToggleLeave}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {passwordError && (
                    <div style={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {passwordError}
                    </div>
                  )}
                </div>

                <div style={styles.toggleText}>
                  <a 
                    href="#" 
                    style={styles.forgotLink}
                    onClick={(e) => {
                      e.preventDefault();
                      showErrorNotification('Please contact support to reset your password');
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
                  disabled={emailError || passwordError || isLoading}
                >
                  {isLoading ? 'LOGGING IN...' : 'SIGN IN'}
                </button>
              </form>

              <p style={styles.toggleText}>
                Don't have an account?{" "}
                <span 
                  style={styles.toggleLink}
                  onClick={toggleForms}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;