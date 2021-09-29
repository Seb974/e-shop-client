import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutSeven from "../../layouts/LayoutSeven";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import BannerOne from "../../wrappers/banner/BannerOne";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import api from "../../config/api";
import AboutUsActions from "../../services/AboutUsActions";
import HeroSliderThirty from "../../wrappers/hero-slider/HeroSliderThirty";
import HeroSliderThirteen from "../../wrappers/hero-slider/HeroSliderThirteen";
import HeroSliderEight from "../../wrappers/hero-slider/HeroSliderEight";
import ProductsContext from "../../contexts/ProductsContext";
import DeliveryContext from "../../contexts/DeliveryContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import RelaypointActions from "../../services/RelaypointActions";
import SellerActions from "../../services/SellerActions";
import AuthContext from "../../contexts/AuthContext";

const About = ({ location }) => {

  const { pathname } = location;
  const [aboutUs, setAboutUs] = useState(null);
  const [sellers, setSellers] = useState([]);
  const { platform } = useContext(AuthContext);
  const { products } = useContext(ProductsContext);
  const { relaypoints, setRelaypoints } = useContext(DeliveryContext);

  useEffect(() => {
      fetchAboutUs();
      fetchRelaypoints();
      fetchSellers();
  }, []);

  const fetchAboutUs = () => {
    AboutUsActions
        .find()
        .then(response => setAboutUs(response));
  };

  const fetchRelaypoints = () => {
      if (!isDefinedAndNotVoid(relaypoints))
        RelaypointActions
            .findAll()
            .then(response => setRelaypoints(response.filter(r => !r.private)))
  };

  const fetchSellers = () => {
      SellerActions
          .findAll()
          .then(response => setSellers(response));
  };

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
          <title>{ platform.name + " - A propos de nous" }</title>
          <meta property="title" content={ platform.name + " - A propos de nous" } />
          <meta property="og:title" content={ platform.name + " - A propos de nous" } />
          <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
          <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
      </MetaTags>

      <LayoutSeven stick="stick">

        {/* <HeroSliderThirty/> */}
        <HeroSliderEight data={ aboutUs }/>

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        {/* banner */}
        <BannerOne spaceBottomClass="pb-70" data={ aboutUs }/>

        {/* text grid */}
        <TextGridOne spaceBottomClass="pb-70" data={ aboutUs }/>

        {/* fun fact */}
        <FunFactOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgClass="bg-gray-3"
          data={ aboutUs }
          sellers={ sellers }
          products={ products }
          relaypoints={ relaypoints }
        />

        {/* team member */}
        <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" />

        {/* brand logo slider */}
        <BrandLogoSliderOne spaceBottomClass="pb-70" />
      </LayoutSeven>
    </Fragment>
  );
};

About.propTypes = {
  location: PropTypes.object
};

export default About;
