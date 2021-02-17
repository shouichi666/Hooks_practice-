import React, { useState, useContext } from "react";
import { InputName, InputEmail, InputPassword } from ".";
import AppContext from "../../hooks/contexts/AppContext";
import { SignButton } from "./button";

const SignUp = () => {
  const { dispatch } = useContext(AppContext);

  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [values, setValues] = useState({
      password: "",
      showPassword: false,
    });

  //setState onChange
  const handleChangeName = (e) => setName(e.target.value),
    handleChangeEmail = (e) => setEmail(e.target.value),
    handleChangePassword = (e) =>
      setValues({ ...values, password: e.target.value }),
    handleClickShowPassword = () =>
      setValues({ ...values, showPassword: !values.showPassword }),
    handleMouseDownPassword = (e) => e.preventDefault(),
    signUp = () => {
      dispatch({ type: "SIGN_UP" });
    };
  //
  //
  //
  return (
    <form className="form" noValidate autoComplete="off">
      <InputName onChange={handleChangeName} value={name} />

      <InputEmail onChange={handleChangeEmail} value={email} />

      <InputPassword
        onChange={handleChangePassword}
        password={values.password}
        value={values.showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />

      <SignButton label="SIGN UP" onClick={signUp} />
    </form>
  );
};

export default SignUp;
