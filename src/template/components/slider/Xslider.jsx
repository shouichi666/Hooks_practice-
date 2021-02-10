import React, { useState, useRef } from "react";
import { SliderNextButton, SliderBackButton } from "../button";

const Xslider = (props) => {
  const [nextDisabled, setNextDisabled] = useState(false);
  const [backDisabled, setBackDisabled] = useState(true);
  const startPosition = useRef(null);
  const endPosition = useRef(null);
  const slider = useRef(null);

  //scroll event
  const XsliderScrollEvent = () => {
    const windowWidth = window.outerWidth;
    let start = startPosition.current.getBoundingClientRect().x;
    let end = endPosition.current.getBoundingClientRect().x;
    setNextDisabled(end - windowWidth < 10 ? true : false);
    setBackDisabled(start > 5 ? true : false);
  };

  //click event
  const onClickScroll = (arg) => {
    let ListWidth = slider.current.clientWidth;
    if (arg === "left") {
      slider.current.scrollLeft += ListWidth - 30;
    } else if (arg === "right") {
      slider.current.scrollLeft -= ListWidth - 30;
    }
  };
  const nextScroll = () => onClickScroll("left");
  const backScroll = () => onClickScroll("right");

  return (
    <section className='slider'>
      <div className='slider__top'>
        <h2 className='slider__heading'>{props.heading}</h2>
        {props.tab}
      </div>
      <div className='slider__slider'>
        <div className='slider__list' onScroll={XsliderScrollEvent} ref={slider}>
          <div ref={startPosition}></div>

          {props.children}

          <div ref={endPosition}></div>
        </div>
        <div className='slider__arrows'>
          <SliderBackButton onClick={backScroll} disabled={backDisabled} />
          <SliderNextButton onClick={nextScroll} disabled={nextDisabled} />
        </div>
      </div>
    </section>
  );
};

export default Xslider;
