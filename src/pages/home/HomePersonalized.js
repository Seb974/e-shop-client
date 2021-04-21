import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import LayoutSeven from "../../layouts/LayoutSeven";
import HeroSliderTwentyOne from "../../wrappers/hero-slider/HeroSliderTwentyOne";
import TabProductPersonalized from "../../wrappers/product/TabProductPersonalized";
import BannerNineteen from "../../wrappers/banner/BannerNineteen";
import CountDownFour from "../../wrappers/countdown/CountDownFour";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import NewsletterThree from "../../wrappers/newsletter/NewsletterThree";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";

const HomePersonalized = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Auto parts Home</title>
        <meta
          name="description"
          content="Auto parts home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutSeven headerTop="visible">
        {/* headerTop="visible" */}
        {/* hero slider */}
        <HeroSliderTwentyOne />
        {/* Intro */}
        <SectionTitleWithText spaceTopClass="pt-95" spaceBottomClass="pb-90" />
        {/* banner */}
        <BannerNineteen spaceBottomClass="pb-85" />
  
        {/* tab product */}
        <TabProductPersonalized
          spaceBottomClass="pb-60"
          spaceTopClass="pt-100"
          category="auto parts"
        />

        {/* <br/> */}
        {/* countdown */}
        <CountDownFour
          spaceBottomClass="pb-100"
          dateTime="April 29, 2021 23:12:00"
          countDownImage="/assets/img/banner/deal-7.png"
        />
        
        {/* feature icon */}
        <BrandLogoSliderOne spaceBottomClass="pb-95" spaceTopClass="pt-100" />

        {/* newsletter */}
        <NewsletterThree
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          subscribeBtnClass="dark-red-subscribe"
        />
      </LayoutSeven>
    </Fragment>
  );
};

export default HomePersonalized;
