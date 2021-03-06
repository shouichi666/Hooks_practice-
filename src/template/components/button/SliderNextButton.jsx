import React from "react";
import ChevronRightSharpIcon from "@material-ui/icons/ChevronRightSharp";

const SlideNextButton = (props) => {
  let toggleClass = props.disabled ? "buttonOFF" : "buttonON";

  return (
    <button
      onClick={props.onClick}
      className={`SliderBackButton ${toggleClass}`}
      disabled={props.disabled}
    >
      <ChevronRightSharpIcon />
    </button>
  );
};

export default SlideNextButton;
