import "./css/button.css";

const ButtonCom = ({ onClick, type, disabled, color, children }) => {
  return (
    <>
      <button
        className={`button ${disabled ? "button-disabled" : ""}`}
        disabled={disabled}
        style={{ "--button-color": color }}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default ButtonCom;
