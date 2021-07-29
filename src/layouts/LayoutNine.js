import PropTypes from "prop-types";
import React, { Fragment } from "react";
import HeaderOne from "../wrappers/header/HeaderOne";
import FooterTwo from "../wrappers/footer/FooterTwo";
import FooterOne from "../wrappers/footer/FooterOne";
import HeaderSix from "../wrappers/header/HeaderSix";

const LayoutNine = ({
  children, stick = ""}) => {
  return (
    <Fragment>
      {/* <HeaderOne
        layout={headerContainerClass}
        top={headerTop}
        borderStyle={headerBorderStyle}
        headerPaddingClass={headerPaddingClass}
      /> */}
      <HeaderSix layout="container-fluid" stick={ stick }/>
      {children}
      <FooterTwo
        footerTopSpaceTopClass="pt-80"
        spaceBottomClass="pb-25"
        footerLogo="/assets/img/logo/logo-2.png"
        backgroundImage="/assets/img/bg/footer-bg.jpg"
      />
      {/* <FooterOne
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      /> */}
    </Fragment>
  );
};

LayoutNine.propTypes = {
  children: PropTypes.any,
  headerBorderStyle: PropTypes.string,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerTop: PropTypes.string
};

export default LayoutNine;
