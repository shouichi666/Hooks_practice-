import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const InputEmail = (props) => {
  return (
    <>
      <InputLabel htmlFor="component-helper">email</InputLabel>
      <Input
        type="email"
        id="component-helper"
        value={props.value}
        onChange={props.onChange}
        aria-describedby="component-helper-text"
      />
    </>
  );
};

export default InputEmail;
