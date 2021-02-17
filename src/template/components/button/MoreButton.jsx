import React from "react";

const MoreButton = (props) => {
  return (
    <button className='MoreButton' onClick={props.onClick} hidden={props.hidden}>
      MORE...
    </button>
  );
};

export default MoreButton;
