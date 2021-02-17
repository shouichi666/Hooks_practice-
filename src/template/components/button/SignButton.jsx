import React from "react";

const SignButton = (props) => {
  return (
    <button className="form__button" onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default SignButton;
