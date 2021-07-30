import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import bannerData from "../../data/banner/banner-thirty-three.json";
import BannerThirtyThreeSingle from "../../components/banner/BannerThirtyThreeSingle.js";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const BannerThirtyThree = ({ spaceBottomClass, bgColorClass }) => {

  const { homepage } = useContext(HomeContext);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (isDefined(homepage) && isDefined(homepage.banners)) {
        const selectedBanners = homepage.banners.filter(b => b.bannerNumber === 2).filter((b, i) => i < 2);
        setBanners(selectedBanners);
    }
  },[homepage]);

  return (
    <div className={`banner-area ${bgColorClass ? bgColorClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <div className="row">
          { isDefinedAndNotVoid(banners) && banners.map((single, key) => {
              return (
                <BannerThirtyThreeSingle
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

BannerThirtyThree.propTypes = {
  spaceBottomClass: PropTypes.string,
  bgColorClass: PropTypes.string
};

export default BannerThirtyThree;
