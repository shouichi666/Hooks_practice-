import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../hooks/contexts/AppContext";
import {
  POSTER_342,
  _windowTop,
  _mapXsliderBox,
  _registerDataPepole,
} from "../../../hooks/hoge";
import { db } from "../../../firebase";
import { CastDialogList } from "../../components/";
import PlaylistAddTwoToneIcon from "@material-ui/icons/PlaylistAddTwoTone";

const IdCast = () => {
  const { state } = useContext(AppContext);
  const _cast = state.cast.viewItem.cast;
  const _work = state.cast.viewItem.work;
  const [open, setOpen] = useState(true);

  useEffect(_windowTop, [state]);
  const onClickCloseDialog = () => setOpen(true);
  const onClickOpenDialog = () => setOpen(false);

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
            <div
              className='Cast__left--nameBox'
              hidden={window.innerWidth > 400 ? true : false}
            >
              <h2 className='Cast__name'>{_cast.name}</h2>
              <PlaylistAddTwoToneIcon
                onClick={onClickOpenDialog}
                className='Cast__icon'
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
          <CastDialogList
            top={window.innerWidth > 400 ? "100px" : "40%"}
            left={window.innerWidth > 400 ? "100%" : "40%"}
            data={_cast}
            open={open}
            onClose={onClickCloseDialog}
            registerDataPepole={() =>
              _registerDataPepole(db, state.users.id, _cast, onClickCloseDialog)
            }
          />
        </section>

        <section className='Cast__right'>
          <div
            className='Cast__right--nameBox'
            hidden={window.innerWidth > 400 ? false : true}
          >
            <h2 className='Cast__name'>{_cast.name}</h2>
            <PlaylistAddTwoToneIcon
              onClick={onClickOpenDialog}
              className='Cast__icon'
            />
          </div>

          <div className='Cast__careerBox'>
            <h4 className='Cast__careerBox--heading'>経歴</h4>
            <p className='Cast__careerBox--text'>
              wiki APIを使って情報を取得する
            </p>
          </div>

          <div className='Cast__works'>
            <h4 className='Cast__works--heading'>
              出演 <span>{_work.length}</span> 作品
            </h4>
            <div className='flexWrap Cast__works--flex'>
              {_mapXsliderBox(_work)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default IdCast;
