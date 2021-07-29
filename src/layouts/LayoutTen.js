import PropTypes from "prop-types";
import React, { Fragment } from "react";
import HeaderSix from "../wrappers/header/HeaderSix";
import FooterFour from "../wrappers/footer/FooterFour";
import FooterOne from "../wrappers/footer/FooterOne";

const LayoutTen = ({ children, stick="" }) => {
  return (
    <Fragment>
      <HeaderSix layout="container-fluid" stick={ stick }/>
      {children}
      <FooterOne
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
      {/* <FooterFour
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
        backgroundColorClass="bg-black-3"
      /> */}
    </Fragment>
  );
};

export default LayoutTen;

LayoutTen.propTypes = {
  children: PropTypes.any
};
