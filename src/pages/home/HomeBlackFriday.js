import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutTen from "../../layouts/LayoutTen";
import HeroSliderThirtyFour from "../../wrappers/hero-slider/HeroSliderThirtyFour";
import BannerThirtyFour from "../../wrappers/banner/BannerThirtyFour";
import TabProductTwentyOne from "../../wrappers/product/TabProductTwentyOne";
import FeatureIconNine from "../../wrappers/feature-icon/FeatureIconNine";
import NewsletterThree from "../../wrappers/newsletter/NewsletterThree";
import TestimonialOne from "../../wrappers/testimonial/TestimonialOne";
import BannerThirtyThree from "../../wrappers/banner/BannerThirtyThree";
import CountDownSeven from "../../wrappers/countdown/CountDownSeven";
import TabProductThirteen from "../../wrappers/product/TabProductThirteen";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

const HomeBlackFriday = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Black friday Home</title>
        <meta
          name="description"
          content="Black friday home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutTen>
        {/* hero slider */}
        <HeroSliderThirtyFour />
        {/* countdown */}
        <CountDownSeven
          dateTime="November 13, 2020 12:12:00"
          bgColorClass="bg-black-2"
          spaceTopClass="pt-100"
        />
        {/* banner */}
        <BannerThirtyFour
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgColorClass="bg-black-2"
        />
        {/* tab product */}
        {/* <TabProductThirteen
          spaceBottomClass="pb-60"
          spaceTopClass="pt-100"
          category="auto parts"
        /> */}
        {/* feature icon */}
        {/* <FeatureIconNine
          containerClass="container"
          gutterClass="padding-10-row-col"
          bgColorClass="bg-black-2"
        /> */}
        <BrandLogoSliderOne spaceBottomClass="pb-95" spaceTopClass="pt-100" />
        
        {/* newsletter */}
        <NewsletterThree
          spaceTopClass="pt-100"
          spaceBottomClass="pb-95"
          subscribeBtnClass="dark-red-subscribe"
          bgColorClass="bg-black-2"
          subscribeColorClass="subscribe-style-3-white"
        />
        {/* banner */}
        <BannerThirtyThree spaceBottomClass="pb-70" bgColorClass="bg-black-2" />
        {/* testimonial */}
        {/* <TestimonialOne
          spaceBottomClass="pb-95"
          bgColorClass="bg-black-2"
          testimonialClass="single-testimonial-2"
        /> */}
      </LayoutTen>
    </Fragment>
  );
};

export default HomeBlackFriday;
