import React, { useContext, useEffect } from "react";
import AppContext from "../../../hooks/contexts/AppContext";
import { POSTER_342, _WindowTop, _MapXsliderBox } from "../../../hooks/hoge";

const IdCast = () => {
  const { state } = useContext(AppContext);
  const _cast = state.cast.viewItem.cast;
  const _work = state.cast.viewItem.work;

  useEffect(_WindowTop, [state]);

  return (
    <main>
      <div className='Cast'>
        <section className='Cast__left'>
          <div className='Cast__profile'>
            <div className='Cast__profile--imgBox'>
              <img
                className='Cast__profile--imgBox-img'
                src={POSTER_342 + _cast.profile_path}
                alt=''
              />
            </div>
            <h3 className='Cast__profile--title'>Profole</h3>
            <dl className='Cast__profile--details'>
              <dt>仕事</dt>
              <dd>{_cast.known_for_department}</dd>
              <dt>性別</dt>
              <dd>{_cast.gender === 1 ? "女" : "男"}</dd>
              <dt>誕生日</dt>
              <dd>{_cast.birthday}</dd>
              <dt>出生地</dt>
              <dd>{_cast.place_of_birth}</dd>
              <dt>呼び方</dt>
              <dd>
                {(_cast.also_known_as || []).map((item, i) => {
                  return <span key={i}>{item}</span>;
                })}
              </dd>
            </dl>
          </div>
        </section>

        <section className='Cast__right'>
          <h2 className='Cast__name'>{_cast.name}</h2>

          <div className='Cast__careerBox'>
            <h4 className='Cast__careerBox--heading'>経歴</h4>
            <p className='Cast__careerBox--text'>wiki APIを使って情報を取得する</p>
          </div>

          <div className='Cast__works'>
            <h4 className='Cast__works--heading'>
              出演 <span>{_work.length}</span> 作品
            </h4>
            <div className='flexWrap Cast__works--flex'>{_MapXsliderBox(_work)}</div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default IdCast;
