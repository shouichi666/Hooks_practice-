import React, { useContext } from "react";
import MoreVertSharpIcon from "@material-ui/icons/MoreVertSharp";
import AppContext from "../../../hooks/contexts/AppContext";

const MoreButton = (props) => {
  const { state } = useContext(AppContext);
  return (
    <button
      className={`${props.className} MoreButton`}
      onClick={props.onClick}
      hidden={state.users.isSignIn ? false : true}
    >
      <MoreVertSharpIcon />
    </button>
  );
};

export default MoreButton;
