import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../hooks/contexts/AppContext";
import { InputPassword, InputEmail } from "./";
import { SignButton } from "./button";
import { auth } from "../../firebase/";

const SignIn = () => {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const [email, setEmail] = useState(""),
    [values, setValues] = useState({
      password: "",
      showPassword: false,
    });

  //setState onChange
  const signIn = () => {
    if (email !== "" && values.password !== "") {
      auth
        .signInWithEmailAndPassword(email, values.password)
        .then((user) => {
          dispatch({
            type: "SIGN_IN",
            isSignIn: true,
            id: user.user.uid,
          });
          setEmail("");
          setValues({ ...values, password: "" });
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("shit");
    }
  };

  return (
    <form className='form' noValidate autoComplete='off'>
      <InputEmail onChange={(e) => setEmail(e.target.value)} value={email} />

      <InputPassword
        password={values.password}
        value={values.showPassword}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        handleClickShowPassword={() =>
          setValues({ ...values, showPassword: !values.showPassword })
        }
        handleMouseDownPassword={(e) => e.preventDefault()}
      />

      <SignButton label='SIGN IN' onClick={signIn} />
    </form>
  );
};

export default SignIn;
