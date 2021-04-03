import React from "react";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";

const CastDialogList = React.memo(({
  data,
  open,
  onClose,
  registerDataPepole,
  like,
  top,
  bottom,
  left,
}) => {

  const style = {
    bottom: bottom,
    top: top,
    left: left,
  };

  return (
    <>
      <div hidden={open} onClick={onClose} className='coverSheets'></div>
      <ul className='DialogList' hidden={open} style={style}>
        <li className='DialogList__item' onClick={registerDataPepole}>
          <PeopleAltTwoToneIcon />
          <p className='DialogList__item--text'>
            {like ? "既に登録してあります" : "お気に入りに追加する"}
          </p>
        </li>
      </ul>
    </>
  );
});

export default CastDialogList;
