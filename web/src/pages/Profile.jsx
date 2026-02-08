import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, FileText, LogOut, Edit2, Save, X, Camera } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('James');
  const [lastName, setLastName] = useState('Carter');
  const [email, setEmail] = useState('jamescarter1930@gmail.com');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically save to backend
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  const handleLogout = () => {
    // Handle logout logic here
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      navigate("/");
    }
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
      maxWidth: "500px",
      backgroundColor: "#fff",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 30px 80px rgba(0, 0, 0, 0.15)",
      position: "relative",
      zIndex: 1,
      minHeight: "auto",
    },

    header: {
      background: "linear-gradient(135deg, #4db8a5 0%, #3ba795 100%)",
      padding: "30px 40px 70px",
      position: "relative",
      color: "white",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "30px",
    },

    logoIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
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
    },

    hiddenInput: {
      display: "none",
    },

    content: {
      padding: "15px 40px 30px",
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

    role: {
      fontSize: "0.95rem",
      color: "#666",
      margin: "0",
    },

    formGroup: {
      marginBottom: "16px",
    },

    label: {
      display: "block",
      fontSize: "0.85rem",
      fontWeight: "600",
      color: "#555",
      marginBottom: "8px",
      marginLeft: "4px",
    },

    inputWrapper: {
      position: "relative",
      width: "100%",
    },

    input: {
      width: "100%",
      padding: "14px 14px 14px 45px",
      border: "none",
      backgroundColor: "#f5f5f5",
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

    textarea: {
      width: "100%",
      padding: "14px 14px 14px 45px",
      border: "none",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      fontSize: "14px",
      transition: "all 0.3s ease",
      outline: "none",
      boxSizing: "border-box",
      color: "#555",
      minHeight: "80px",
      resize: "vertical",
      fontFamily: "'Poppins', 'Inter', 'Segoe UI', sans-serif",
    },

    inputIcon: {
      position: "absolute",
      left: "16px",
      top: "16px",
      color: "#999",
      transition: "color 0.3s ease",
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
      cursor: "pointer",
      transition: "all 0.3s ease",
      letterSpacing: "1px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
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

    divider: {
      height: "1px",
      backgroundColor: "#e5e5e5",
      margin: "30px 0",
    },
  };

  const handleInputFocus = (e) => {
    e.target.style.backgroundColor = "#fff";
    e.target.style.boxShadow = "0 0 0 2px rgba(77, 184, 165, 0.2)";
  };

  const handleInputBlur = (e) => {
    e.target.style.backgroundColor = "#f5f5f5";
    e.target.style.boxShadow = "none";
  };

  const handleBtnHover = (e) => {
    e.target.style.backgroundColor = "#3ba795";
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = "0 8px 20px rgba(77, 184, 165, 0.3)";
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
              <span>{firstName.charAt(0)}{lastName.charAt(0)}</span>
            )}
            {isEditing && (
              <div className="avatar-overlay" style={styles.avatarOverlay}>
                <Camera size={32} color="white" />
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
                <h2 style={styles.fullName}>{firstName} {lastName}</h2>
                <p style={styles.role}>{email}</p>
              </div>

              {description && (
                <>
                  <div style={styles.divider}></div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>About Me</label>
                    <p style={{
                      padding: "14px",
                      backgroundColor: "#fafafa",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#555",
                      lineHeight: "1.6",
                      margin: "0",
                    }}>
                      {description}
                    </p>
                  </div>
                </>
              )}

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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    style={styles.input}
                    placeholder="First Name"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Last Name</label>
                <div style={styles.inputWrapper}>
                  <User size={18} style={styles.inputIcon} />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    style={styles.input}
                    placeholder="Last Name"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <div style={styles.inputWrapper}>
                  <Mail size={18} style={styles.inputIcon} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{...styles.input, ...styles.inputDisabled}}
                    placeholder="Email"
                    disabled
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>About Me</label>
                <div style={styles.inputWrapper}>
                  <FileText size={18} style={styles.inputIcon} />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.textarea}
                    placeholder="Tell us about yourself..."
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  style={styles.saveBtn}
                  onMouseEnter={handleBtnHover}
                  onMouseLeave={handleBtnLeave}
                >
                  <Save size={18} />
                  SAVE
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
    </div>
  );
};

export default Profile;