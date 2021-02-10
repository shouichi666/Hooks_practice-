import React, { useState, useContext } from "react";
import { Xslider, XsliderBox } from "./";
import { ConversionButton } from "../button";
import AppContext from "../../../hooks/contexts/AppContext";

const ToggleSlider = (props) => {
  const { state } = useContext(AppContext);
  const [toggle, setToggle] = useState(1);
  const today = state.movie.week.map((data, i) => <XsliderBox key={i} data={data} />);
  const week = state.movie.day.map((data, i) => <XsliderBox key={i} data={data} />);
  const onChangeToggle = (e) => {
    setToggle(Number(e.target.value));
  };

  return (
    <div className='ToggleSlider'>
      <Xslider
        heading={props.heading}
        tab={<ConversionButton onChange={onChangeToggle} toggle={toggle} />}
      >
        {toggle === 1 ? today : toggle === 2 ? week : ""}
      </Xslider>
    </div>
  );
};

export default ToggleSlider;
