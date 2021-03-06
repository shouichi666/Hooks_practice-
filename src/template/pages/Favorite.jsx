import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../hooks/contexts/AppContext";
import { Link, Route, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { _mapCastSliderBox, POSTER_342 } from "../../hooks/hoge";
import { ItemBox } from "../components/";
import SettingsApplicationsTwoToneIcon from "@material-ui/icons/SettingsApplicationsTwoTone";

const Favorite = () => {
  const { state } = useContext(AppContext);
  const history = useHistory();
  const [view, setView] = useState("");
  const [favoriteDatas, setFavoriteDatas] = useState([]);
  const [watchLaterDatas, setWatchLaterDatas] = useState([]);
  const [pepoleDatas, setPepoleDatas] = useState([]);
  const [historyDatas, sethistoryDatas] = useState([]);
  const [recentDatas, setRecentDatas] = useState([]);

  const getFavorite = () => {
    const favorite = [];
    db.ref("users/" + state.users.id + "/favorite").on("value", (datas) => {
      datas.forEach((data) => {
        favorite.push(data.val());
      });
      return favorite;
    });
    setFavoriteDatas(favorite);
  };
  const getWatchLater = () => {
    const watchLaterDatas = [];
    db.ref("users/" + state.users.id + "/watchLater").on("value", (datas) => {
      datas.forEach((data) => {
        watchLaterDatas.push(data.val());
      });
      return watchLaterDatas;
    });
    setWatchLaterDatas(watchLaterDatas);
  };
  const getCast = () => {
    const pepoleDatas = [];
    db.ref("users/" + state.users.id + "/pepole").on("value", (datas) => {
      datas.forEach((data) => {
        pepoleDatas.push(data.val());
      });
      return pepoleDatas;
    });
    setPepoleDatas(pepoleDatas);
  };

  const getHistory = () => {
    const historyDatas = [];
    db.ref("users/" + state.users.id + "/history").on("value", (datas) => {
      datas.forEach((data) => {
        historyDatas.push(data.val());
      });
      return historyDatas;
    });
    sethistoryDatas(historyDatas);
  };

  const getRecent = () => {
    const recentDatas = [];
    db.ref("users/" + state.users.id + "/recent").on("value", (datas) => {
      datas.forEach((data) => {
        recentDatas.push(data.val());
      });
      return recentDatas;
    });
    setRecentDatas(recentDatas);
  };

  useEffect(getRecent, [state]);

  const switchView = (e) => {
    const target = e.target.value;
    switch (target) {
      case "favorite":
        getFavorite();
        setView("favorite");
        return history.push("/favorite/favorite");
      case "watch":
        getWatchLater();
        setView("watch_later");
        return history.push("/favorite/watch_later");
      case "history":
        getHistory();
        setView("history");
        return history.push("/favorite/history");
      case "cast":
        getCast();
        setView("cast");
        return history.push("/favorite/cast");
      default:
        return "hoge";
    }
  };

  const mapMyItems = (datas) => {
    return datas.map((data, i) => <ItemBox data={data} key={i} />);
  };

  const onChange = (e) => setView(e.target.value);

  if (state.users.isSignIn) {
    return (
      <main className='Favorite'>
        <SettingsApplicationsTwoToneIcon className='Favorite__navigationBar--icon' />

        <section className='Favorite__navigationBar'>
          <h2 className='page_heading Favorite__heading'>
            HELLO {state.users.userName} !!
          </h2>
          <div className='Favorite__navigationBar--recent'>
            <h3 className='Favorite__navigationBar--recent-heading'>
              最近選択したアイテム
            </h3>
            <div className='Favorite__navigationBar--recent--scroll'>
              {recentDatas.length === 0 ? (
                <p>nothing</p>
              ) : (
                recentDatas.map((data, i) => {
                  return (
                    <li
                      key={i}
                      className='Favorite__navigationBar--recent--item'
                    >
                      <img
                        src={POSTER_342 + data.poster_path}
                        alt={data.poster_path}
                        className='Favorite__navigationBar--recent--img'
                        loading='lazy'
                        id={data.id}
                        // onClick={onClick}
                      />
                    </li>
                  );
                })
              )}
            </div>
          </div>

          <ul className='Favorite__navigationBar--tabBar'>
            <li className='Favorite__navigationBar--tabBar-item activeButton'>
              <input
                type='radio'
                onChange={onChange}
                className='Favorite__navigationBar--tabBar-input'
                checked={view === "favorite"}
              />
              <button
                htmlFor='favorite'
                className='Favorite__navigationBar--tabBar-button'
                value='favorite'
                onClick={switchView}
              >
                Favorite
              </button>
            </li>
            <li className='Favorite__navigationBar--tabBar-item'>
              <input
                type='radio'
                onChange={onChange}
                className='Favorite__navigationBar--tabBar-input'
                checked={view === "watch_later"}
              />
              <button
                htmlFor='watch'
                className='Favorite__navigationBar--tabBar-button'
                value='watch'
                onClick={switchView}
              >
                Watch Later
              </button>
            </li>
            <li className='Favorite__navigationBar--tabBar-item'>
              <input
                type='radio'
                onChange={onChange}
                className='Favorite__navigationBar--tabBar-input'
                checked={view === "history"}
              />
              <button
                htmlFor='history'
                className='Favorite__navigationBar--tabBar-button'
                value='history'
                onClick={switchView}
              >
                History
              </button>
            </li>
            <li className='Favorite__navigationBar--tabBar-item'>
              <input
                type='radio'
                onChange={onChange}
                className='Favorite__navigationBar--tabBar-input'
                checked={view === "cast"}
              />
              <button
                htmlFor='cast'
                className='Favorite__navigationBar--tabBar-button'
                value='cast'
                onClick={switchView}
              >
                cast
              </button>
            </li>
          </ul>
        </section>

        <div className='Favorite__container'>
          <Route path='/favorite/history'>
            <div className='flexWrap'>
              {historyDatas.length === 0 ? "nothing" : mapMyItems(historyDatas)}
            </div>
          </Route>
          <Route path='/favorite/favorite'>
            <div className='flexWrap'>
              {favoriteDatas.length === 0
                ? "nothing"
                : mapMyItems(favoriteDatas)}
            </div>
          </Route>
          <Route path='/favorite/watch_later'>
            <div className='flexWrap'>
              {favoriteDatas.length === 0
                ? "nothing"
                : mapMyItems(watchLaterDatas)}
            </div>
          </Route>
          <Route path='/favorite/cast'>
            <div className='flexWrap'>
              {pepoleDatas.length === 0
                ? "nothig"
                : _mapCastSliderBox(pepoleDatas)}
            </div>
          </Route>
        </div>
      </main>
    );
  } else {
    return (
      <main className='Favorite'>
        <Link to='/sign'>SIGN IN</Link>
      </main>
    );
  }
};

export default Favorite;
