const Alert = ({ message, type = "error" }) => {
  if (!message) return null;

  const styles = {
    error: {
      backgroundColor: "#FEE2E2",
      color: "#B91C1C",
      border: "1px solid #FCA5A5",
    },
    success: {
      backgroundColor: "#D1FAE5",
      color: "#065F46",
      border: "1px solid #6EE7B7",
    },
  };

  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: "500",
        marginBottom: "16px",
        ...styles[type],
      }}
    >
      {message}
    </div>
  );
};

export default Alert;
