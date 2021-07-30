import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import bannerData from "../../data/banner/banner-thirty-four.json";
import BannerThirtyFourSingle from "../../components/banner/BannerThirtyFourSingle";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const BannerThirtyFour = ({spaceTopClass, spaceBottomClass, bgColorClass}) => {

  const { homepage } = useContext(HomeContext);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (isDefined(homepage) && isDefined(homepage.banners)) {
        const selectedBanners = homepage.banners.filter(b => b.bannerNumber === 1).filter((b, i) => i < 3);
        setBanners(selectedBanners);
    }
  },[homepage]);

  return (
    <div className={`banner-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""} ${bgColorClass ? bgColorClass : ""}`}>
      <div className="container">
        <div className="row">
          { isDefinedAndNotVoid(banners) && banners.map((single, key) => {
              return (
                  <BannerThirtyFourSingle
                      data={ single }
                      key={ key }
                      spaceBottomClass="mb-30"
                  />
              );
            })}
        </div>
      </div>
    </div>
  );
};

BannerThirtyFour.propTypes = {
  bgColorClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerThirtyFour;
