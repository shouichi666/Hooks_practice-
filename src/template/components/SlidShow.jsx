import React, { useContext, useState } from "react";
import AppContext from "../../hooks/contexts/AppContext";
import theMovieDb from "themoviedb-javascript-library";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import "swiper/components/pagination/pagination.scss";
import { POSTER_780, BACKDROP_780 } from "../../hooks/hoge";
SwiperCore.use([Autoplay, EffectCoverflow, Navigation, Pagination]);

const SlidShow = () => {
  const [count, setCount] = useState(0);
  const { state, dispatch } = useContext(AppContext);
  const gStateTopItem = state.movie.popular.results.slice(0,19);

  const onClick = (e) => {
    const id = e.target.id;
    theMovieDb.movies.getById(
      { id: id },
      (movie) => {
        const data = JSON.parse(movie);
        dispatch({ type: "GET_MOVIE", data: data });
      },
      (error) => {
        console.log(error);
      }
    );
    theMovieDb.movies.getKeywords(
      { id: id },
      (movie) => {
        const keyword = JSON.parse(movie);
        dispatch({ type: "GET_KEYWORD", data: keyword.keywords });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const isMapImgs = gStateTopItem.map((item, i) => {
    return (
      <SwiperSlide key={i} virtualIndex={i}>
        <Link to={"/movie/" + item.id} onClick={onClick}>
          <img
            src={POSTER_780 + item["poster_path"]}
            alt={item["poster_path"]}
            id={item.id}
          />
        </Link>
      </SwiperSlide>
    );
  });

  const isSetCount = (swiper) => {
    setCount(swiper.realIndex);
  };

  const style =
    gStateTopItem.length > 0
      ? {
          backgroundImage: `url(${BACKDROP_780 + gStateTopItem[count]["backdrop_path"]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : { display: "block" };

  const movieTitle = gStateTopItem.length > 0 ? gStateTopItem[count].title : "";

  return (
    <div className='SlideShow Home__firstView--thumbnail' style={style}>
      <Swiper
        // grabCursor={true}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 15,
          stretch: 10,
          depth: 300,
          modifier: 2.5,
          slideShadows: false,
        }}
        effect='coverflow'
        loop={true}
        navigation
        onActiveIndexChange={isSetCount}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        spaceBetween={95}
        slidesPerView={2.5}
      >
        <p className='SlideShow__movieTitle'>{movieTitle}</p>
        {isMapImgs}
      </Swiper>
    </div>
  );
};

export default SlidShow;
