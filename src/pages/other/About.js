import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutSeven from "../../layouts/LayoutSeven";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import BannerOne from "../../wrappers/banner/BannerOne";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import api from "../../config/api";

const About = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
          <title>{ "Frais Péi, votre maraîcher en ligne - A propos de nous" }</title>
          <meta property="title" content={ "Frais Péi, votre maraîcher en ligne - A propos de nous" } />
          <meta property="og:title" content={ "Frais Péi, votre maraîcher en ligne - A propos de nous" } />
          <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
          <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
      </MetaTags>

      <LayoutSeven stick="stick">

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        {/* banner */}
        <BannerOne spaceBottomClass="pb-70" />

        {/* text grid */}
        <TextGridOne spaceBottomClass="pb-70" />

        {/* fun fact */}
        <FunFactOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgClass="bg-gray-3"
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
