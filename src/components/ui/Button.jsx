const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const base = {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "14px",
    fontWeight: "600",
    width: "100%",
    transition: "background 0.2s ease",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      backgroundColor: "#4F46E5",
      color: "#fff",
    },
    google: {
      backgroundColor: "#fff",
      color: "#333",
      border: "1px solid #ddd",
    },
    github: {
      backgroundColor: "#24292e",
      color: "#fff",
    },
    danger: {
      backgroundColor: "#EF4444",
      color: "#fff",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant] }}
    >
      {children}
    </button>
  );
};

export default Button;
