import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../firebase/auth";
import Button from "../ui/Button";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 32px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#4F46E5",
          cursor: "pointer",
        }}
      >
        🔐 AuthApp
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {currentUser ? (
          <>
            <span style={{ fontSize: "13px", color: "#6B7280" }}>
              {currentUser.displayName || currentUser.email}
            </span>
            <div style={{ width: "120px" }}>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <span
              onClick={() => navigate("/login")}
              style={{
                fontSize: "14px",
                color: "#4F46E5",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Login
            </span>
            <span
              onClick={() => navigate("/register")}
              style={{
                fontSize: "14px",
                color: "#4F46E5",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Register
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
