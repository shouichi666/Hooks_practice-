import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteDialogList = React.memo(({
  data,
  open,
  onClose,
  deleteData,
  top,
  bottom,
  right,
  left,
}) => {
  const style = {
    bottom: bottom,
    top: top,
    right: right,
    left: left,
  };

  return (
    <>
      <div hidden={open} onClick={onClose} className='coverSheets'></div>
      <ul className='DialogList' hidden={open} style={style}>
        <li className='DialogList__item' onClick={deleteData}>
          <DeleteIcon />
          <p className='DialogList__item--text'>
            {data.name || data.title} <br />
            を削除する
          </p>
        </li>
      </ul>
    </>
  );
});

export default DeleteDialogList;
