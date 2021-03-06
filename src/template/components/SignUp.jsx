import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { InputName, InputEmail, InputPassword } from ".";
import AppContext from "../../hooks/contexts/AppContext";
import { SignButton } from "./button";
import { auth, db } from "../../firebase/";

const SignUp = () => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [values, setValues] = useState({
      password: "",
      showPassword: false,
    });

  const signUp = () => {
    if (name !== "" && email !== "" && values.password !== "") {
      auth
        .createUserWithEmailAndPassword(email, values.password)
        .then((user) => {
          dispatch({
            type: "SIGN_UP",
            name: name,
            isSignIn: true,
            id: user.user.uid,
          });
          db.ref("users/").child(user.user.uid).child("userName").set(name);
          setEmail("");
          setName("");
          setValues({ ...values, password: "" });
          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode, errorMessage);
          console.log(errorCode);
          console.log(errorMessage);
        });
    } else {
      alert("error");
    }
  };

  return (
    <form className='form' noValidate autoComplete='off'>
      <InputName onChange={(e) => setName(e.target.value)} value={name} />

      <InputEmail onChange={(e) => setEmail(e.target.value)} value={email} />

      <InputPassword
        password={values.password}
        value={values.showPassword}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        handleMouseDownPassword={(e) => e.preventDefault()}
        handleClickShowPassword={() =>
          setValues({
            ...values,
            showPassword: !values.showPassword,
          })
        }
      />

      <SignButton label='SIGN UP' onClick={signUp} />
    </form>
  );
};

export default SignUp;
