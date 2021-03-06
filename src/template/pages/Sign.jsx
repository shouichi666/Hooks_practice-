import React, { useState, useContext } from "react";
import { SignIn, SignUp } from "../components";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { auth, db } from "../../firebase";
import AppContext from "../../hooks/contexts/AppContext";
//
//

const Sign = () => {
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState(true);
  const { dispatch } = useContext(AppContext);
  const history = useHistory();

  const onClickSetIndexTab = (e) => {
    const value = e.target.value;
    value === 0 ? setTab(true) : value === 1 ? setTab(false) : setTab(null);
    setIndex(value);
  };

  const onChangeTab = (value) => {
    setIndex(value);
  };

  const onChangeIndex = (index) => {
    setIndex(index);
  };

  const onClickAnonymous = () => {
    auth
      .signInAnonymously()
      .then((user) => {
        dispatch({ type: "ANONYMOUSE", id: user.user.uid });
        db.ref("users/").child(user.user.uid).child("userName").set("匿名");
        history.push("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage, errorCode);
      });
  };

  return (
    <main className='Sign'>
      <ul
        className='tabBar'
        onChange={onChangeTab}
        onClick={onClickSetIndexTab}
      >
        <li
          className={`tabBar__tab tab${index === 0 ? "--active" : ""}`}
          value={0}
        >
          SIGN IN
        </li>
        <li
          className={`tabBar__tab tab${index === 1 ? "--active" : ""}`}
          value={1}
        >
          SIGN UP
        </li>
      </ul>
      <SwipeableViews index={index} onChangeIndex={onChangeIndex}>
        <div hidden={!tab}>
          <SignIn />
        </div>
        <div hidden={tab}>
          <SignUp />
        </div>
      </SwipeableViews>

      <div className='Sign__anonymous'>
        <button onClick={onClickAnonymous}>匿名でサインアップする</button>
      </div>
    </main>
  );
};

export default Sign;
