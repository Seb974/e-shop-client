import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import bannerData from "../../data/banner/banner-thirty-two.json";
import BannerThirtyTwoSingle from "../../components/banner/BannerThirtyTwoSingle.js";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

const BannerThirtyTwo = ({ spaceTopClass, spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);
  const { selectedCatalog } = useContext(AuthContext);
  const [banners, setBanners] = useState([]);

  // useEffect(() => fetchBanners(),[]);
  useEffect(() => fetchBanners(),[homepage, selectedCatalog]);

  const fetchBanners = () => {
      if (isDefined(homepage) && isDefined(homepage.banners)) {
          const selectedBanners = homepage.banners.filter(b => b.bannerNumber === 1 && (!isDefinedAndNotVoid(b.catalogs) || b.catalogs.find(cat => cat.id === selectedCatalog.id)))
                                                  .filter((b, i) => i < 3);
          setBanners(selectedBanners);
      }
  };

  return (
    <div className={`banner-area ${spaceTopClass ? spaceTopClass : ""}  ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <div className="row">
          { isDefinedAndNotVoid(banners) && banners.map((single, key) => {
              return (
                <BannerThirtyTwoSingle
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

BannerThirtyTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerThirtyTwo;
