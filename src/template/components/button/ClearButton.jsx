import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { ClearSharpIcon } from "../../../asset/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: 0,
      color: "white",
    },
  },
}));

export default function ClearButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete" onClick={props.onClick}>
        <ClearSharpIcon fontSize="large"/>
      </IconButton>
    </div>
  );
}
