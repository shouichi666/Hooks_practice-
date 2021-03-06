import React from "react";
import ChevronLeftSharpIcon from "@material-ui/icons/ChevronLeftSharp";

const SliderBackButton = (props) => {
  let toggleClass = props.disabled ? "buttonOFF" : "buttonON";

  return (
    <button
      onClick={props.onClick}
      className={`SliderBackButton ${toggleClass}`}
      disabled={props.disabled}
    >
      <ChevronLeftSharpIcon />
    </button>
  );
};

export default SliderBackButton;
