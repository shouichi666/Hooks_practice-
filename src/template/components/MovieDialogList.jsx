import React from "react";
import ThumbUpTwoToneIcon from "@material-ui/icons/ThumbUpTwoTone";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";

const MovieDialogList = React.memo(({
  data,
  open,
  onClose,
  registerDataWatchLater,
  registerDataFavorite,
  top,
  bottom,
  watch,
  favorite,
}) => {
  const style = {
    bottom: bottom,
    top: top,
  };

  return (
    <>
      <div hidden={open} onClick={onClose} className='coverSheets'></div>
      <ul className='DialogList' hidden={open} style={style}>
        <li className='DialogList__item' onClick={registerDataFavorite}>
          <ThumbUpTwoToneIcon />
          <p className='DialogList__item--text'>
            {favorite ? "既に登録してあります" : "お気に入りリストに追加する"}
          </p>
        </li>

        <li className='DialogList__item' onClick={registerDataWatchLater}>
          <BookmarkTwoToneIcon />
          <p className='DialogList__item--text'>
            {watch ? "既に登録してあります" : "見てみたいリストに追加"}
          </p>
        </li>
      </ul>
    </>
  );
});

export default MovieDialogList;
