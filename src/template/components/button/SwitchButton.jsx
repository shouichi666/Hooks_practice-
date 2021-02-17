import React from "react";

const SwitchButton = (props) => {
  return (
    <div className='conversion'>
      {props.datas.map((data, i) => {
        return (
          <button key={i}>
            <input
              type='radio'
              id={data.id}
              value={data.value}
              checked={props.state === data.value}
              onChange={props.onChange}
              key={i}
            />
            <label className='conversion__label' htmlFor={data.id}>
              {data.label}
            </label>
          </button>
        );
      })}
    </div>
  );
};

export default SwitchButton;
