import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";
import OffcanvasMenu from "../../components/header/OffcanvasMenu";
import { useLocation } from 'react-router-dom';
import Logo from "../../components/header/Logo";

const HeaderSix = ({ layout, headerPaddingClass, headerBgClass, stick = "" }) => {

  const { pathname } = useLocation();
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [offcanvasActive, setOffcanvasActive] = useState(false);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const getActiveState = (state) => {
    setOffcanvasActive(state);
  };

  return (
    <header
      className={`header-area sticky-bar header-padding-3 header-res-padding clearfix transparent-bar header-hm-7 
          ${headerBgClass ? headerBgClass : ""} 
          ${headerPaddingClass ? headerPaddingClass : ""} 
          ${scroll > headerTop || stick !== "" ? "stick" : ""}`}
    >
      <div className={layout === "container-fluid" ? layout : "container"}>
        <div className="row">
          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="clickable-menu clickable-mainmenu-active align-self-center mt-0">
              <button className="my-auto" onClick={() => setOffcanvasActive(true)}>
              <i className="fas fa-bars fa-sm"></i>
                {/* <i className="pe-7s-menu" /> */}
              </button>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-6">
            {/* header logo */}
            <div className="logo text-center logo-hm5 my-2">
              <Link className="sticky-none" to={process.env.PUBLIC_URL + "/"}>
                {/* <img src={} alt=""></img> */}
                <img src="/assets/img/logo/navbar-logo.png" logoClass="logo" height="60"/>
                {/* <h1> <span className="text-orange">Frais</span>  Péi<span className="text-orange">.</span></h1> width="150" */}
              </Link>
              <Link className="sticky-block" to={process.env.PUBLIC_URL + "/"}>
                <img src="/assets/img/logo/navbar-logo.png" logoClass="logo" height="60"/>
              {/* <h1> <span className="text-orange">Frais</span>  Péi<span className="text-orange">.</span></h1> width="150"*/}
              </Link>
            </div>
          </div>
          <div className="col-xl-5 col-lg-4 col-md-6 col-6">
            {/* Icon group */}
            { pathname !== '/' && <IconGroup iconWhiteClass="header-right-wrap-white" /> }
          </div>
        </div>
      </div>
      {/* offcanvas menu */}
      <OffcanvasMenu
        activeState={offcanvasActive}
        getActiveState={getActiveState}
      />
      {/* mobile menu */}
      <MobileMenu />
    </header>
  );
};

HeaderSix.propTypes = {
  headerBgClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  layout: PropTypes.string,
};

export default HeaderSix;
