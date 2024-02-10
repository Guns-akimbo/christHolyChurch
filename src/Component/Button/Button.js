import React from "react";
import "./Button.css";

const Button = ({
  text,
  type,
  backgroundColor,
  onClick,
  width,
  fontSize,
  color,
  style = {},
}) => {
  const buttonStyle = {
    width,
    color,
    fontSize,
    ...style,
  };
  return (
    <div>
      <button
        className="button"
        onClick={onClick}
        type={type}
        style={{ ...buttonStyle, backgroundColor }}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
