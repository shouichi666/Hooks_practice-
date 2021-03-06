import React from "react";

const SwitchButton = (props) => {
  return (
    <div className='conversion'>
      {props.datas.map((data) => {
        return (
          <>
            <input
              type='radio'
              id={data.id}
              value={data.value}
              checked={props.state === data.value}
              onChange={props.onChange}
            />
            <label className='conversion__label' htmlFor={data.id}>
              {data.label}
            </label>
          </>
        );
      })}
    </div>
  );
};

export default SwitchButton;
