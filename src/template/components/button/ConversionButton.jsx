import React from "react";

const ConversionButton = (props) => {
  return (
    <div className='conversion'>
      <input
        type='radio'
        id='1'
        value={1}
        checked={props.toggle === 1}
        onChange={props.onChange}
      />
      <label className='conversion__label' htmlFor='1'>
        今日
      </label>
      <input
        type='radio'
        id='2'
        value={2}
        checked={props.toggle === 2}
        onChange={props.onChange}
      />
      <label className='conversion__label' htmlFor='2'>
        今週
      </label>
    </div>
  );
};

export default ConversionButton;
