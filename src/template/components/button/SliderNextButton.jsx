import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SlideNextButton = (props) => {
  let toggleClass = props.disabled ? "buttonOFF" : "buttonON";

  return (
    <button
      onClick={props.onClick}
      className={`SliderBackButton ${toggleClass}`}
      disabled={props.disabled}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );
};

export default SlideNextButton;
