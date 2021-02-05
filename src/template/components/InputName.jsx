import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const InputName = (props) => {
  return (
    <>
      <InputLabel htmlFor="component-helper">Name</InputLabel>
      <Input
        type="text"
        id="component-helper"
        value={props.value}
        onChange={props.onChange}
        aria-describedby="component-helper-text"
      />
    </>
  );
};

export default InputName;
