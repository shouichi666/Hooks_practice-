import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const SliderBackButton = (props) => {
  let toggleClass = props.disabled ? "buttonOFF" : "buttonON";

  return (
    <button
      onClick={props.onClick}
      className={`SliderBackButton ${toggleClass}`}
      disabled={props.disabled}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
};

export default SliderBackButton;
