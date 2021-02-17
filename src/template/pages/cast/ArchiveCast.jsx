import React, { useState, useContext } from "react";
import AppContext from "../../../hooks/contexts/AppContext";
import { _MapCastSliderBox } from "../../../hooks/hoge";

const ArchiveCast = () => {
  const { state } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const pp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <h2 className='page_heading'>人気の出演スタッフ</h2>
      <div className='flexWrap'>{_MapCastSliderBox(state.cast.people.results)}</div>
      <ul className='pageNation'>
        {pp.map((p, i) => {
          return <li className="pageNation__num" key={i}>{p}</li>;
        })}
        <li className='pageNation__last'>NEXT</li>
      </ul>
    </>
  );
};

export default ArchiveCast;
