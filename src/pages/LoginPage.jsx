import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  loginWithEmail,
  loginWithGoogle,
  loginWithGithub,
} from "../firebase/auth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate("/");
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
        <h2 style={titleStyle}>Welcome Back</h2>
        <p style={subtitleStyle}>Login to your account</p>

        <Alert message={error} type="error" />

        <form onSubmit={handleLogin}>
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
            placeholder="Your password"
            required
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

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
