const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div
      style={{
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      {label && (
        <label
          style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}
        >
          {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          padding: "10px 14px",
          borderRadius: "6px",
          border: "1px solid #D1D5DB",
          fontSize: "14px",
          outline: "none",
          transition: "border 0.2s",
          width: "100%",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.border = "1px solid #4F46E5")}
        onBlur={(e) => (e.target.style.border = "1px solid #D1D5DB")}
      />
    </div>
  );
};

export default Input;
