import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

const Register = () => {
  const [showRegister, setShowRegister] = useState(true);
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Login processed here");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* SLIDING FORMS */}
        <div
          style={{
            ...styles.formsWrapper,
            transform: showRegister
              ? "translateX(0%)"
              : "translateX(-50%)",
          }}
        >
          {/* REGISTER FORM */}
          <div style={styles.formPanel}>
            <div style={styles.formBox}>
              <h2 style={styles.title}>Create Account</h2>

              <p style={styles.dividerText}>Enter your details to get started</p>

              <form onSubmit={handleRegisterSubmit}>
                <div style={styles.inputWrapper}>
                  <User size={18} style={styles.inputIcon} />
                  <input style={styles.input} placeholder="Name" required />
                </div>
                <div style={styles.inputWrapper}>
                  <Mail size={18} style={styles.inputIcon} />
                  <input style={styles.input} placeholder="Email" type="email" required />
                </div>
                <div style={styles.inputWrapper}>
                  <Lock size={18} style={styles.inputIcon} />
                  <input
                    type="password"
                    style={styles.input}
                    placeholder="Password"
                    required
                  />
                </div>
                <button style={styles.submitBtn}>SIGN UP</button>
              </form>

              <p style={styles.switchText}>
                Already have account?{" "}
                <span
                  style={styles.link}
                  onClick={() => setShowRegister(false)}
                >
                  Login
                </span>
              </p>
            </div>
          </div>

          {/* LOGIN FORM */}
          <div style={styles.formPanel}>
            <div style={styles.formBox}>
              <h2 style={styles.title}>Sign In</h2>

              <p style={styles.dividerText}>Welcome back! Please login to continue</p>

              <form onSubmit={handleLoginSubmit}>
                <div style={styles.inputWrapper}>
                  <Mail size={18} style={styles.inputIcon} />
                  <input
                    style={styles.input}
                    placeholder="Email"
                    type="email"
                    required
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <Lock size={18} style={styles.inputIcon} />
                  <input
                    type="password"
                    style={styles.input}
                    placeholder="Password"
                    required
                  />
                </div>
                
                <p style={styles.forgotPassword}>
                  <a href="#" style={styles.link}>Forgot your password?</a>
                </p>

                <button style={styles.submitBtn}>SIGN IN</button>
              </form>

              <p style={styles.switchText}>
                No account?{" "}
                <span
                  style={styles.link}
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* WELCOME PANEL */}
        <div
          style={{
            ...styles.sidePanel,
            left: showRegister ? "50%" : "0%",
          }}
        >
          <div style={styles.logo}>
            <span></span>
          </div>

          <div style={styles.decorativeShape}></div>
          <div style={styles.decorativeShape2}></div>

          <h1 style={styles.welcomeTitle}>
            {showRegister ? "Welcome!" : "Welcome Back!"}
          </h1>
          <p style={styles.welcomeText}>
            {showRegister
              ? "To keep connected with us please login with your personal info"
              : "Create an account to start your journey with us"}
          </p>

          <button
            style={styles.actionBtn}
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister ? "SIGN IN" : "SIGN UP"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "900px",
    height: "600px",
    background: "#fff",
    borderRadius: "24px",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.15)",
  },

  formsWrapper: {
    width: "200%",
    height: "100%",
    display: "flex",
    transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  formPanel: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    boxSizing: "border-box",
  },

  formBox: {
    width: "100%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#4db8a5",
    textAlign: "center",
    marginBottom: "10px",
  },

  dividerText: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#666",
    fontWeight: "400",
    margin: "5px 0 15px 0",
  },

  inputWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: "16px",
  },

  inputIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#999",
    zIndex: 1,
  },

  input: {
    padding: "14px 14px 14px 45px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#f5f5f5",
    transition: "all 0.3s ease",
    outline: "none",
  },

  submitBtn: {
    padding: "14px",
    background: "#4db8a5",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    letterSpacing: "1px",
    marginTop: "10px",
    width: "100%",
    maxWidth: "200px",
    margin: "10px auto 0",
    display: "block",
    transition: "all 0.3s ease",
  },

  switchText: {
    fontSize: "0.88rem",
    textAlign: "center",
    color: "#666",
    marginTop: "10px",
  },

  forgotPassword: {
    textAlign: "center",
    fontSize: "0.85rem",
    margin: "5px 0",
  },

  link: {
    color: "#4db8a5",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "none",
  },

  sidePanel: {
    position: "absolute",
    top: 0,
    width: "50%",
    height: "100%",
    background: "linear-gradient(135deg, #4db8a5 0%, #3ba795 100%)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transition: "left 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: "60px 40px",
    boxSizing: "border-box",
    zIndex: 10,
  },

  logo: {
    position: "absolute",
    top: "30px",
    left: "30px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "18px",
    fontWeight: "600",
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

  decorativeShape: {
    position: "absolute",
    width: "120px",
    height: "120px",
    border: "15px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "25px",
    transform: "rotate(45deg)",
    bottom: "60px",
    left: "40px",
  },

  decorativeShape2: {
    position: "absolute",
    width: "80px",
    height: "80px",
    border: "12px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "18px",
    transform: "rotate(25deg)",
    top: "80px",
    right: "30px",
  },

  welcomeTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "20px",
    position: "relative",
    zIndex: 2,
  },

  welcomeText: {
    fontSize: "0.95rem",
    opacity: "0.95",
    lineHeight: "1.6",
    marginBottom: "40px",
    maxWidth: "280px",
    position: "relative",
    zIndex: 2,
  },

  actionBtn: {
    padding: "14px 50px",
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    borderRadius: "25px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    letterSpacing: "1px",
    position: "relative",
    zIndex: 2,
  },
};

export default Register;