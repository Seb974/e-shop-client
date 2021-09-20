import React, { useContext, useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import heroSliderData from "../../data/hero-sliders/hero-slider-thirty-six.json";
import HeroSliderThirtySixSingle from "../../components/hero-slider/HeroSliderThirtySixSingle.js";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

const HeroSliderThirtySix = () => {

  const { selectedCatalog } = useContext(AuthContext);
  const { homepage } = useContext(HomeContext);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => refreshHeroes(), []);
  useEffect(() => refreshHeroes(), [homepage]);

  const refreshHeroes = () => {
      if (isDefined(homepage) && isDefinedAndNotVoid(homepage.heroes)) {
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
                <HeroSliderThirtySixSingle
                  sliderClassName="swiper-slide"
                  data={single}
                  key={key}
                />
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderThirtySix;
