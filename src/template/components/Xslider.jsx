import React, { useState, useRef, useEffect } from "react";
import XsliderBox from "./XsliderBox";

const Xslider = (props) => {
  const [states, setStates] = useState({
    targetElement: null, //.Xslider__list--item
    slideElement: null, //.Xslider__list
    toggleClass: true,
  });
  const moveX = useRef(null);
  const slider = useRef(null);

  useEffect(() => {
    setStates({
      ...states,
      targetElement: moveX.current,
      slideElement: slider.current,
    });
  }, []);

  //<XsliderBox>の格納
  const box = props.datas.map((data, i) => {
    return <XsliderBox key={i} data={data} />;
  });

  //scroll event
  const XsliderScrollEvent = () => {
    let refarencePosition = states.targetElement.getBoundingClientRect().x;
    refarencePosition < -10
      ? setStates({ ...states, toggleClass: false })
      : setStates({ ...states, toggleClass: true });
  };

  //click event
  const jumpScroll = () => {
    const amountOfScroll = window.innerWidth;
    states.slideElement.scrollLeft = amountOfScroll;
  };

  let changeName = states.toggleClass ? "jsAnimationOn" : "jsAnimationOff";

  return (
    <section className="Xslider">
      <h2 className="Xslider__heading">{props.heading}</h2>
      <div className="Xslider__slider">
        <div
          className={`Xslider__shadow ${changeName}`}
          onClick={jumpScroll}
        ></div>
        <div
          className="Xslider__list"
          onScroll={XsliderScrollEvent}
          ref={slider}
        >
          <div ref={moveX}></div>
          {box}
        </div>
      </div>
    </section>
  );
};

export default Xslider;
