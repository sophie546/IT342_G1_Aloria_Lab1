import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut, Edit2, Save, X, Camera } from "lucide-react";
import api from '../services/api'; // Add this import

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validation states
  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: ''
  });

  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false
  });

  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userData = JSON.parse(userStr);
        setFirstName(userData.firstname || '');
        
        // If lastname is "User" (default from registration), set it to empty string
        const lastname = userData.lastname === 'User' ? '' : userData.lastname;
        setLastName(lastname || '');
        
        setEmail(userData.email || '');
        
        // Load profile image if exists
        const savedImage = localStorage.getItem(`profileImage_${userData.userId}`);
        if (savedImage) {
          setProfileImage(savedImage);
          setOriginalImage(savedImage);
        }
      } else {
        // If no user data, redirect to login
        navigate('/');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Validation functions
  const validateFirstName = (value) => {
    if (!value.trim()) return 'First name is required';
    if (value.trim().length < 2) return 'First name must be at least 2 characters';
    if (value.trim().length > 30) return 'First name cannot exceed 30 characters';
    if (!/^[A-Za-z\s\-']+$/.test(value.trim())) return 'First name can only contain letters, spaces, hyphens and apostrophes';
    return '';
  };

  const validateLastName = (value) => {
    // Last name is optional, so only validate if something is entered
    if (value.trim()) {
      if (value.trim().length < 2) return 'Last name must be at least 2 characters';
      if (value.trim().length > 30) return 'Last name cannot exceed 30 characters';
      if (!/^[A-Za-z\s\-']+$/.test(value.trim())) return 'Last name can only contain letters, spaces, hyphens and apostrophes';
    }
    return '';
  };

  const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Only JPG, PNG, GIF, and WEBP images are allowed';
    }
    if (file.size > maxSize) {
      return 'Image size must be less than 5MB';
    }
    return '';
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateImage(file);
      if (error) {
        alert(error);
        e.target.value = ''; // Clear the input
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleInputChange = (field, value) => {
    // Update field value
    switch(field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      default:
        break;
    }

    // Validate field
    let error = '';
    switch(field) {
      case 'firstName':
        error = validateFirstName(value);
        break;
      case 'lastName':
        error = validateLastName(value);
        break;
      default:
        break;
    }

    setValidationErrors(prev => ({ ...prev, [field]: error }));
  };

  const isFormValid = () => {
    const firstNameError = validateFirstName(firstName);
    const lastNameError = validateLastName(lastName);

    return !firstNameError && !lastNameError;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouchedFields({
      firstName: true,
      lastName: true
    });

    // Validate all fields
    const firstNameError = validateFirstName(firstName);
    const lastNameError = validateLastName(lastName);

    setValidationErrors({
      firstName: firstNameError,
      lastName: lastNameError
    });

    if (firstNameError || lastNameError) {
      alert("Please fix the validation errors before saving.");
      return;
    }

    try {
      setIsLoading(true);
      
      // Get user data from localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userData = JSON.parse(userStr);
        
        // Prepare updated user data
        const updatedUserData = {
          userId: userData.userId,
          firstname: firstName,
          lastname: lastName || '', // Allow empty last name
          email: email // Keep existing email
        };

        // Make API call to update user in database
        // You'll need to create this endpoint in your backend
        // Make API call to update user in database
          const response = await api.put('/auth/profile', updatedUserData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
        
        if (response.status === 200) {
          // Update localStorage with new data
          localStorage.setItem('user', JSON.stringify({
            ...userData,
            firstname: firstName,
            lastname: lastName || ''
          }));
          
          // Save profile image if changed
          if (profileImage && profileImage !== originalImage) {
            localStorage.setItem(`profileImage_${userData.userId}`, profileImage);
            setOriginalImage(profileImage);
            
            // Optional: Upload image to backend
            // await api.post('/user/profile/image', { 
            //   userId: userData.userId, 
            //   image: profileImage 
            // });
          }

          alert("Profile updated successfully!");
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      
      // Handle different error scenarios
      if (error.response) {
        if (error.response.status === 401) {
          alert("Session expired. Please login again.");
          navigate('/');
        } else if (error.response.status === 400) {
          alert(error.response.data?.message || "Invalid data. Please check your input.");
        } else {
          alert("Failed to update profile. Please try again.");
        }
      } else if (error.request) {
        alert("Network error. Please check your connection.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset validation states
    setValidationErrors({
      firstName: '',
      lastName: ''
    });
    setTouchedFields({
      firstName: false,
      lastName: false
    });
    // Reset to original values
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setFirstName(userData.firstname || '');
      
      // If lastname is "User" (default from registration), set it to empty string
      const lastname = userData.lastname === 'User' ? '' : userData.lastname;
      setLastName(lastname || '');
    }
    // Reset image to original
    setProfileImage(originalImage);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Note: We keep profile images in localStorage so they persist across sessions
      navigate("/");
    }
  };

  // Get initials for avatar (handle empty last name)
  const getInitials = () => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return first + last || '?';
  };

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', 'Inter', 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    },

    decorativeCircle1: {
      position: "absolute",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "#fbbf24",
      bottom: "-100px",
      left: "-50px",
      opacity: "0.8",
      zIndex: 0,
    },

    decorativeCircle2: {
      position: "absolute",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      background: "#f87171",
      top: "-50px",
      right: "-30px",
      opacity: "0.7",
      zIndex: 0,
    },

    card: {
      width: "100%",
      maxWidth: "450px",
      backgroundColor: "#fff",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 30px 80px rgba(0, 0, 0, 0.15)",
      position: "relative",
      zIndex: 1,
    },

    header: {
      background: "linear-gradient(135deg, #4db8a5 0%, #3ba795 100%)",
      padding: "30px 40px 70px",
      position: "relative",
      color: "white",
    },

    headerTitle: {
      fontSize: "1.8rem",
      fontWeight: "700",
      margin: "0",
      textAlign: "center",
    },

    decorativeShape: {
      position: "absolute",
      width: "80px",
      height: "80px",
      border: "12px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "18px",
      transform: "rotate(45deg)",
      bottom: "30px",
      left: "30px",
    },

    decorativeShape2: {
      position: "absolute",
      width: "60px",
      height: "60px",
      border: "10px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      transform: "rotate(25deg)",
      top: "40px",
      right: "30px",
    },

    avatarContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "-60px",
      marginBottom: "20px",
      position: "relative",
      zIndex: 2,
    },

    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      backgroundColor: "#4db8a5",
      border: "5px solid white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      color: "white",
      fontWeight: "600",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      cursor: isEditing ? "pointer" : "default",
      position: "relative",
      overflow: "hidden",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: profileImage ? `url(${profileImage})` : "none",
    },

    avatarOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0,
      transition: "opacity 0.3s ease",
      color: "white",
    },

    hiddenInput: {
      display: "none",
    },

    content: {
      padding: "15px 30px 30px",
    },

    nameSection: {
      textAlign: "center",
      marginBottom: "20px",
    },

    fullName: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#333",
      margin: "0 0 5px 0",
    },

    email: {
      fontSize: "0.95rem",
      color: "#666",
      margin: "0",
    },

    formGroup: {
      marginBottom: "20px",
    },

    label: {
      display: "block",
      fontSize: "0.85rem",
      fontWeight: "600",
      color: "#555",
      marginBottom: "8px",
      marginLeft: "4px",
    },

    optionalLabel: {
      fontSize: "0.75rem",
      color: "#999",
      fontWeight: "400",
      marginLeft: "8px",
    },

    inputWrapper: {
      position: "relative",
      width: "100%",
    },

    input: {
      width: "100%",
      padding: "14px 14px 14px 45px",
      border: validationErrors.firstName && touchedFields.firstName ? "2px solid #f87171" : "none",
      backgroundColor: validationErrors.firstName && touchedFields.firstName ? "#fff1f0" : "#f5f5f5",
      borderRadius: "8px",
      fontSize: "14px",
      transition: "all 0.3s ease",
      outline: "none",
      boxSizing: "border-box",
      color: "#555",
    },

    inputDisabled: {
      backgroundColor: "#fafafa",
      color: "#888",
      cursor: "not-allowed",
    },

    inputIcon: {
      position: "absolute",
      left: "16px",
      top: "14px",
      color: "#999",
      transition: "color 0.3s ease",
    },

    errorMessage: {
      color: "#f87171",
      fontSize: "0.75rem",
      marginTop: "5px",
      marginLeft: "4px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },

    buttonGroup: {
      display: "flex",
      gap: "12px",
      marginTop: "20px",
    },

    editBtn: {
      flex: 1,
      padding: "14px",
      backgroundColor: "#4db8a5",
      color: "white",
      border: "none",
      borderRadius: "25px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      letterSpacing: "1px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },

    saveBtn: {
      flex: 1,
      padding: "14px",
      backgroundColor: "#4db8a5",
      color: "white",
      border: "none",
      borderRadius: "25px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: isFormValid() && !isLoading ? "pointer" : "not-allowed",
      transition: "all 0.3s ease",
      letterSpacing: "1px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      opacity: isFormValid() && !isLoading ? 1 : 0.6,
    },

    cancelBtn: {
      flex: 1,
      padding: "14px",
      backgroundColor: "transparent",
      color: "#666",
      border: "2px solid #ddd",
      borderRadius: "25px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      letterSpacing: "1px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },

    logoutBtn: {
      width: "100%",
      padding: "14px",
      backgroundColor: "transparent",
      color: "#f87171",
      border: "2px solid #f87171",
      borderRadius: "25px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      letterSpacing: "1px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "20px",
    },

    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "300px",
    },

    loadingSpinner: {
      width: "40px",
      height: "40px",
      border: "3px solid #f3f3f3",
      borderTop: "3px solid #4db8a5",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };

  const handleInputFocus = (e) => {
    e.target.style.backgroundColor = "#fff";
    e.target.style.boxShadow = "0 0 0 2px rgba(77, 184, 165, 0.2)";
  };

  const handleInputBlur = (e) => {
    const fieldName = e.target.name;
    if (!validationErrors[fieldName]) {
      e.target.style.backgroundColor = "#f5f5f5";
      e.target.style.boxShadow = "none";
    }
  };

  const handleBtnHover = (e) => {
    if (isFormValid() || e.target.style.cursor !== "not-allowed") {
      e.target.style.backgroundColor = "#3ba795";
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "0 8px 20px rgba(77, 184, 165, 0.3)";
    }
  };

  const handleBtnLeave = (e) => {
    e.target.style.backgroundColor = "#4db8a5";
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "none";
  };

  const handleCancelBtnHover = (e) => {
    e.target.style.backgroundColor = "#f5f5f5";
    e.target.style.borderColor = "#bbb";
  };

  const handleCancelBtnLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.borderColor = "#ddd";
  };

  const handleLogoutBtnHover = (e) => {
    e.target.style.backgroundColor = "#f87171";
    e.target.style.color = "white";
    e.target.style.transform = "translateY(-2px)";
  };

  const handleLogoutBtnLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.color = "#f87171";
    e.target.style.transform = "translateY(0)";
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.decorativeCircle1}></div>
      <div style={styles.decorativeCircle2}></div>

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.decorativeShape}></div>
          <div style={styles.decorativeShape2}></div>
          <h1 style={styles.headerTitle}>My Profile</h1>
        </div>

        {/* Avatar */}
        <div style={styles.avatarContainer}>
          <div 
            style={styles.avatar} 
            onClick={handleAvatarClick}
            onMouseEnter={(e) => {
              if (isEditing) {
                const overlay = e.currentTarget.querySelector('.avatar-overlay');
                if (overlay) overlay.style.opacity = '1';
              }
            }}
            onMouseLeave={(e) => {
              if (isEditing) {
                const overlay = e.currentTarget.querySelector('.avatar-overlay');
                if (overlay) overlay.style.opacity = '0';
              }
            }}
          >
            {!profileImage && (
              <span>{getInitials()}</span>
            )}
            {isEditing && (
              <div className="avatar-overlay" style={styles.avatarOverlay}>
                <Camera size={32} />
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.hiddenInput}
          />
        </div>

        {/* Content */}
        <div style={styles.content}>
          {!isEditing ? (
            <>
              <div style={styles.nameSection}>
                <h2 style={styles.fullName}>
                  {firstName} {lastName}
                </h2>
                <p style={styles.email}>{email}</p>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  style={styles.editBtn}
                  onClick={() => setIsEditing(true)}
                  onMouseEnter={handleBtnHover}
                  onMouseLeave={handleBtnLeave}
                >
                  <Edit2 size={18} />
                  EDIT PROFILE
                </button>
              </div>

              <button
                style={styles.logoutBtn}
                onClick={handleLogout}
                onMouseEnter={handleLogoutBtnHover}
                onMouseLeave={handleLogoutBtnLeave}
              >
                <LogOut size={18} />
                LOGOUT
              </button>
            </>
          ) : (
            <form onSubmit={handleSave}>
              <div style={styles.formGroup}>
                <label style={styles.label}>First Name</label>
                <div style={styles.inputWrapper}>
                  <User size={18} style={styles.inputIcon} />
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    onBlur={() => handleFieldBlur('firstName')}
                    onFocus={handleInputFocus}
                    required
                    style={styles.input}
                    placeholder="First Name"
                  />
                </div>
                {validationErrors.firstName && touchedFields.firstName && (
                  <div style={styles.errorMessage}>
                    <span>⚠</span> {validationErrors.firstName}
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Last Name
                  <span style={styles.optionalLabel}>(optional)</span>
                </label>
                <div style={styles.inputWrapper}>
                  <User size={18} style={styles.inputIcon} />
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    onBlur={() => handleFieldBlur('lastName')}
                    onFocus={handleInputFocus}
                    style={styles.input}
                    placeholder="Last Name (optional)"
                  />
                </div>
                {validationErrors.lastName && touchedFields.lastName && (
                  <div style={styles.errorMessage}>
                    <span>⚠</span> {validationErrors.lastName}
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <div style={styles.inputWrapper}>
                  <Mail size={18} style={styles.inputIcon} />
                  <input
                    type="email"
                    value={email}
                    style={{...styles.input, ...styles.inputDisabled}}
                    placeholder="Email"
                    disabled
                  />
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  style={styles.saveBtn}
                  onMouseEnter={handleBtnHover}
                  onMouseLeave={handleBtnLeave}
                  disabled={!isFormValid() || isLoading}
                >
                  <Save size={18} />
                  {isLoading ? 'SAVING...' : 'SAVE'}
                </button>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={handleCancel}
                  onMouseEnter={handleCancelBtnHover}
                  onMouseLeave={handleCancelBtnLeave}
                >
                  <X size={18} />
                  CANCEL
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Add keyframe animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Profile;