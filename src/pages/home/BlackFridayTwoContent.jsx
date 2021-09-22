import React from "react";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderThirtyFive from "../../wrappers/hero-slider/HeroSliderThirtyFive";
import BannerThirtyFive from "../../wrappers/banner/BannerThirtyFive";
import TabProductFour from "../../wrappers/product/TabProductFour";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import TestimonialFour from "../../wrappers/testimonial/TestimonialFour";
import NewsletterThree from "../../wrappers/newsletter/NewsletterThree";
import ImageSliderOne from "../../wrappers/image-slider/ImageSliderOne";
import BannerThirtySix from "../../wrappers/banner/BannerThirtySix";
import TabProductThirteen from "../../wrappers/product/TabProductThirteen";
import TabProductPersonalized from "../../wrappers/product/TabProductPersonalized";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

const BlackFridayTwoContent = () => {
  return (
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* hero slider */}
        <HeroSliderThirtyFive />
        {/* banner */}
        <BannerThirtyFive spaceTopClass="pt-100" spaceBottomClass="pb-70" />
        {/* tab product */}
        {/* <TabProductFour
          category="furniture"
          productTabClass="product-tab-pink"
          spaceBottomClass="pb-100"
        /> */}
        {/* <TabProductThirteen
          spaceBottomClass="pb-60"
          spaceTopClass="pt-100"
          category="auto parts"
        /> */}

        <TabProductPersonalized
          spaceBottomClass="pb-60"
          spaceTopClass="pt-100"
          category="auto parts"
        />

        {/* banner */}
        <BannerThirtySix spaceBottomClass="pb-80" />
        {/* feature icon */}
        {/* <FeatureIconFour
          containerClass="container"
          gutterClass="padding-10-row-col"
          spaceBottomClass="pb-100"
        />*/}
        {/* testimonial */}
        {/* <TestimonialFour
          spaceTopClass="pt-100"
          spaceBottomClass="pb-95"
          backgroundImage="/assets/img/bg/testimonial-bg-3.jpg"
          testimonialClass="single-testimonial-2"
        />  */}
        {/* subscribe */}
        <NewsletterThree
          spaceTopClass="pt-80"
          spaceBottomClass="pb-95"
          subscribeBtnClass="dark-red-subscribe"
        />
        {/* image slider */}
        {/* <ImageSliderOne /> */}
        <BrandLogoSliderOne spaceBottomClass="pb-95" spaceTopClass="pt-100" />
      </LayoutOne>
  );
};

export default BlackFridayTwoContent;
