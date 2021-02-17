import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { AccountBoxIcon } from "../../../asset/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: 0,
      fontSize: "30px",
      color: "white",
    },
  },
}));

export default function ClearButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
        <AccountBoxIcon fontSize="large"/>
      </IconButton>
    </div>
  );
}
