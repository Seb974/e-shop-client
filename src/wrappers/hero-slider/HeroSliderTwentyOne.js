import React, { useContext, useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import sliderData from "../../data/hero-sliders/hero-slider-twenty-one.json";
import HeroSliderTwentyOneSingle from "../../components/hero-slider/HeroSliderTwentyOneSingle.js";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

const HeroSliderTwentyOne = () => {

  const { selectedCatalog } = useContext(AuthContext);
  const { homepage } = useContext(HomeContext);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => refreshHeroes(), []);
  useEffect(() => refreshHeroes(), [homepage, selectedCatalog]);

  const refreshHeroes = () => {
      if (isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes) && isDefined(selectedCatalog)) {
        const activeHeroes = homepage.heroes.filter(h => !isDefinedAndNotVoid(h.catalogs) || h.catalogs.find(cat => cat.id === selectedCatalog.id));
        setHeroes(activeHeroes);
      }
  };

  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper {...params}>
          { isDefinedAndNotVoid(heroes) && heroes.map((single, key) => {
              return (
                <HeroSliderTwentyOneSingle
                  data={single}
                  key={key}
                  sliderClass="swiper-slide"
                />
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderTwentyOne;
