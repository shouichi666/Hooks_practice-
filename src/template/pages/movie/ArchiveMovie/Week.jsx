import React, { useContext } from "react";
import AppContext from "../../../../hooks/contexts/AppContext";
import { _mapXsliderBox } from "../../../../hooks/hoge";

const Favorite = (props) => {
  const { state } = useContext(AppContext);

  return (
    <>
      {/* メイン */}
      <div className='flexWrap'>
        {_mapXsliderBox(state.movie.week, "movie")}
      </div>
    </>
  );
};

export default Favorite;
