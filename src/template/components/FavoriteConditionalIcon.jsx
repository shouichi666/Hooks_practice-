import React, { useState, useEffect, useContext } from "react";
import StarTwoToneIcon from "@material-ui/icons/StarTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../hooks/contexts/AppContext";

const FavoriteConditionalIcon = (props) => {
  const { state } = useContext(AppContext);
  const [color, setColor] = useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: 0,
        opcity: color ? "1" : "0",
        color: "#ABFF74",
        display: color && state.users.isSignIn ? "block" : "none",
      },
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    if (props.like && state.users.isSignIn) {
      setColor(true);
    } else {
      setColor(false);
    }
  }, [props.like, state]);

  return (
    <>
      <StarTwoToneIcon className={`${classes.root} ${props.className}`} />
    </>
  );
};

export default FavoriteConditionalIcon;
