import React, { useState } from "react";
import { SignIn, SignUp } from "../components";
import SwipeableViews from "react-swipeable-views";
// import React,{useContext,useState,useReducer} from 'react';
//
//

const Sign = () => {
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState(true);

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

  return (
    <main className="Sign">
      <ul
        className="tabBar"
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
    </main>
  );
};

export default Sign;
