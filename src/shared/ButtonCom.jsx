import './ComponentCss/button.css'

const ButtonCom = ({ onClick, text, type, disabled, color }) => {
  return (
    <>
      <button className={`button ${disabled ? "button-disabled" : ""}`} disabled={disabled} style={{ "--button-color": color, }} type={type} onClick={onClick}>{text}</button>
    </>
  )
}

export default ButtonCom

