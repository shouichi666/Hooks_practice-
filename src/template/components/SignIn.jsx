import React, { useContext, useState } from "react";
import AppContext from "../../hooks/contexts/AppContext";
import { InputName, InputPassword } from "./";
import { SignButton } from "./button";

const SignIn = () => {
  const { dispatch } = useContext(AppContext);
  const [name, setName] = useState(""),
    [values, setValues] = useState({
      password: "",
      showPassword: false,
    });

  //setState onChange
  const handleChangeName = (e) => setName(e.target.value),
    handleChangePassword = (e) =>
      setValues({ ...values, password: e.target.value }),
    handleClickShowPassword = () =>
      setValues({ ...values, showPassword: !values.showPassword }),
    handleMouseDownPassword = (e) => e.preventDefault(),
    signIn = () => {
      dispatch({ type: "SIGN_IN", userName: name, password: values.password });
    };
  //
  //
  //
  return (
    <form className="form" noValidate autoComplete="off">
      <InputName onChange={handleChangeName} value={name} />

      <InputPassword
        onChange={handleChangePassword}
        password={values.password}
        value={values.showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />

      <SignButton label="SIGN IN" onClick={signIn} />
    </form>
  );
};

export default SignIn;
