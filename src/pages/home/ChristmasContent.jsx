import React from "react";
import LayoutNine from "../../layouts/LayoutNine";
import HeroSliderThirtyThree from "../../wrappers/hero-slider/HeroSliderThirtyThree";
import BannerThirtyTwo from "../../wrappers/banner/BannerThirtyTwo";
import TabProductEleven from "../../wrappers/product/TabProductEleven";
import TabProductPersonalized from "../../wrappers/product/TabProductPersonalized";
import CountDownSix from "../../wrappers/countdown/CountDownSix";
import TestimonialThree from "../../wrappers/testimonial/TestimonialThree";
import NewsletterThree from "../../wrappers/newsletter/NewsletterThree";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import BannerFive from "../../wrappers/banner/BannerFive";
import BannerEighteen from "../../wrappers/banner/BannerEighteen";

const ChristmasContent = () => {
  return (
      <LayoutNine
        headerContainerClass="container-fluid"
        headerBorderStyle="fluid-border"
        headerPaddingClass="header-padding-2"
      >
        {/* hero slider */}
        <HeroSliderThirtyThree />
        {/* banner */}
        <BannerFive spaceTopClass="pt-125" spaceBottomClass="pb-40" />
        {/* <BannerThirtyTwo spaceTopClass="pt-95" spaceBottomClass="pb-70" /> */}
        {/* tab product */}
  
        {/* countdown */}
        <CountDownSix
          spaceTopClass="pt-1"
          spaceBottomClass="pb-45"
          dateTime="November 13, 2020 12:12:00"
          countDownImage="/assets/img/banner/deal-11.png"
        />

        {/* tab product */}
        <TabProductPersonalized
          spaceBottomClass="pb-60"
          spaceTopClass="pt-100"
          category="auto parts"
        />

        {/* banner */}
        <BannerEighteen spaceTopClass="pt-95" spaceBottomClass="pb-70" />
        {/* <TabProductEleven
          category="christmas"
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          sectionTitle="Featured Products"
          bgColorClass="bg-gray-3"
          bgShape={true}
          colorClass="pro-puce-color"
        /> */}
        
        {/* testimonial */}
        {/* <TestimonialThree /> */}

        {/* tab product */}
        {/* <TabProductEleven
          category="christmas"
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          sectionTitle="Best Products"
          bgColorClass="bg-gray-3"
          bgShape={true}
          colorClass="pro-puce-color"
        /> */}
        {/* newsletter */}
        <NewsletterThree
          spaceTopClass="pt-80"
          spaceBottomClass="pb-95"
          subscribeBtnClass="dark-red-subscribe"
        />
        <BrandLogoSliderOne spaceBottomClass="pb-95" spaceTopClass="pt-100" />
      </LayoutNine>
  );
};

export default ChristmasContent;
