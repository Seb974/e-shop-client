import React from "react";
import LayoutOne from "../../layouts/LayoutOne";
import BannerThirtyEight from "../../wrappers/banner/BannerThirtyEight";
import TabProductTwentyTwo from "../../wrappers/product/TabProductTwentyTwo";
import CountDownEight from "../../wrappers/countdown/CountDownEight";
import ProductSliderSix from "../../wrappers/product/ProductSliderSix";
import BrandLogoSliderFive from "../../wrappers/brand-logo/BrandLogoSliderFive";
import BannerThirtySeven from "../../wrappers/banner/BannerThirtySeven";
import HeroSliderThirtySix from "../../wrappers/hero-slider/HeroSliderThirtySix";
import TabProductThirteen from "../../wrappers/product/TabProductThirteen";
import TabProductPersonalized from "../../wrappers/product/TabProductPersonalized";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import NewsletterThree from "../../wrappers/newsletter/NewsletterThree";

const ValentinesDayContent = () => {
  return (
      <LayoutOne headerTop="visible">
        {/* hero slider */}
        <HeroSliderThirtySix />
        {/* banner */}
        <BannerThirtyEight spaceBottomClass="pb-70" spaceTopClass="pt-100" />
        {/* tab product */}
        {/* <TabProductTwentyTwo spaceBottomClass="pb-60" category="fashion" /> */}
        {/* deal counter */}
        <CountDownEight
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          dateTime="November 13, 2020 12:12:00"
          backgroundImage="/assets/img/bg/deal-bg.jpg"
        />
        {/* product slider */}
        <TabProductPersonalized
          spaceBottomClass="pb-95"
          spaceTopClass="pt-100"
          category="auto parts"
        />
        {/* <ProductSliderSix
          category="fashion"
          spaceBottomClass="pb-100"
          spaceTopClass="pt-100"
        /> */}
        {/* <TabProductThirteen
          spaceBottomClass="pb-60"
          spaceTopClass="pt-100"
          category="auto parts"
        /> */}
        
        {/* banner */}
        <BannerThirtySeven spaceBottomClass="pb-85" />
        {/* brand logo */}
        {/* <BrandLogoSliderFive spaceBottomClass="pb-100" /> */}
        <BrandLogoSliderOne spaceBottomClass="pb-70" spaceTopClass="pt-50" />

        <NewsletterThree
          spaceTopClass="pt-50"
          spaceBottomClass="pb-100"
          subscribeBtnClass="dark-red-subscribe"
        />
      </LayoutOne>
  );
};

export default ValentinesDayContent;
