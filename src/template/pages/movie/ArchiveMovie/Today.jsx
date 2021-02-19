import React, { useContext } from "react";
import AppContext from "../../../../hooks/contexts/AppContext";
import { _MapXsliderBox } from "../../../../hooks/hoge";

const Favorite = (props) => {
  const { state } = useContext(AppContext);

  return (
    <>
      {/* メイン */}
      <div className='flexWrap'>{_MapXsliderBox(state.movie.day, "movie")}</div>
    </>
  );
};

export default Favorite;
