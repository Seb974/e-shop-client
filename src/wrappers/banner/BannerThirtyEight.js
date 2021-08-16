import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import bannerData from "../../data/banner/banner-thirty-eight.json";
import BannerThirtyEightSingle from "../../components/banner/BannerThirtyEightSingle.js";
import HomeContext from "../../contexts/HomeContext";
import { isDefined } from "../../helpers/utils";

const BannerThirtyEight = ({ spaceTopClass, spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (isDefined(homepage) && isDefined(homepage.banners)) {
        const bannersOne = homepage.banners.filter(b => b.bannerNumber === 1).filter((b, i) => i < 2);
        setBanners(bannersOne);
    }
  },[homepage]);

  return (
    <div
      className={`banner-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          { isDefined(banners) && banners.map((single, key) => {
              return <BannerThirtyEightSingle data={single} key={key} />;
            })}
        </div>
      </div>
    </div>
  );
};

BannerThirtyEight.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerThirtyEight;
