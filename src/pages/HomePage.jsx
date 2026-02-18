import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Avatar */}
        <div style={avatarStyle}>
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="avatar"
              referrerPolicy="no-referrer"
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            />
          ) : (
            <div style={avatarPlaceholderStyle}>
              {currentUser?.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h2 style={titleStyle}>
          Welcome, {currentUser?.displayName || "User"} 👋
        </h2>
        <p style={subtitleStyle}>You are successfully logged in.</p>

        <div style={infoBoxStyle}>
          <InfoRow label="Email" value={currentUser?.email} />
          <InfoRow label="Name" value={currentUser?.displayName || "—"} />
          <InfoRow
            label="Provider"
            value={currentUser?.providerData?.[0]?.providerId || "—"}
          />
          <InfoRow
            label="Email Verified"
            value={currentUser?.emailVerified ? "✅ Yes" : "❌ No"}
          />
          <InfoRow
            label="Account Created"
            value={
              currentUser?.metadata?.creationTime
                ? new Date(
                    currentUser.metadata.creationTime,
                  ).toLocaleDateString()
                : "—"
            }
          />
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div style={infoRowStyle}>
    <span style={infoLabelStyle}>{label}</span>
    <span style={infoValueStyle}>{value}</span>
  </div>
);

export default HomePage;

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
  maxWidth: "460px",
  textAlign: "center",
};

const avatarStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "16px",
};

const avatarPlaceholderStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#4F46E5",
  color: "#fff",
  fontSize: "32px",
  fontWeight: "700",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

const infoBoxStyle = {
  backgroundColor: "#F9FAFB",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "left",
};

const infoRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #E5E7EB",
  fontSize: "13px",
};

const infoLabelStyle = {
  color: "#6B7280",
  fontWeight: "600",
};

const infoValueStyle = {
  color: "#111827",
  fontWeight: "500",
};
