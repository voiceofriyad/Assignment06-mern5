import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import {
  registerWithEmail,
  loginWithGoogle,
  loginWithGithub,
} from "../firebase/auth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      const userCredential = await registerWithEmail(email, password);
      // Save the name to Firebase profile
      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const handleGithub = async () => {
    setError("");
    try {
      await loginWithGithub();
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Create an Account</h2>
        <p style={subtitleStyle}>Sign up to get started</p>

        <Alert message={error} type="error" />
        <Alert message={success} type="success" />

        <form onSubmit={handleRegister}>
          <Input
            label="Name (optional)"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 characters"
            required
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <div style={dividerStyle}>
          <span>or continue with</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button variant="google" onClick={handleGoogle}>
            🌐 Continue with Google
          </Button>
          <Button variant="github" onClick={handleGithub}>
            🐙 Continue with GitHub
          </Button>
        </div>

        <p style={footerTextStyle}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

// --- Styles ---
const containerStyle = {
  minHeight: "calc(100vh - 60px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
  backgroundColor: "#F9FAFB",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "36px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "420px",
};

const titleStyle = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#111827",
  marginBottom: "6px",
};

const subtitleStyle = {
  fontSize: "13px",
  color: "#6B7280",
  marginBottom: "24px",
};

const dividerStyle = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  margin: "20px 0",
  color: "#9CA3AF",
  fontSize: "12px",
  gap: "10px",
};

const footerTextStyle = {
  marginTop: "20px",
  fontSize: "13px",
  color: "#6B7280",
  textAlign: "center",
};
