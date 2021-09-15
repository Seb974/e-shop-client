import React from "react";
import Swiper from "react-id-swiper";
import HeroSliderEightSingle from "../../components/hero-slider/HeroSliderEightSingle.js";
import sliderData from "../../data/hero-sliders/hero-slider-eight.json";
import { isDefined } from "../../helpers/utils.js";

const HeroSliderEight = ({ data }) => {
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
          { isDefined(data) && isDefined(data.headerPicture) && 
                <HeroSliderEightSingle
                  data={data}
                  sliderClass="swiper-slide"
                />
            }
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderEight;
