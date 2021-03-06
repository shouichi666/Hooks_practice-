import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../hooks/contexts/AppContext";
import { ClearButton } from "./button";

const Player = (props) => {
  const { state } = useContext(AppContext);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`https://www.youtube.com/embed/${state.common.youtubekey}`);
  }, [state.common.youtubekey]);

  return (
    <div className='Player' hidden={props.open} onClick={props.onClick}>
      <ClearButton className='Player__closeButton' onClick={props.onClick} />
      <div className='Player__wrapper'>
        <iframe
          src={url}
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
          title='video'
          className='Player__iframe'
        />
      </div>
    </div>
  );
};

export default Player;
