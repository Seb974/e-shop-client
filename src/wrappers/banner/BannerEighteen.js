import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import bannerData from "../../data/banner/banner-eighteen.json";
import BannerEighteenSingle from "../../components/banner/BannerEighteenSingle.js";
import HomeContext from "../../contexts/HomeContext";
import ProductsContext from "../../contexts/ProductsContext";
import AuthContext from "../../contexts/AuthContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const BannerEighteen = ({ spaceTopClass, spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);
  const { products } = useContext(ProductsContext);
  const { selectedCatalog } = useContext(AuthContext);
  const [banners, setBanners] = useState([]);

  useEffect(() => console.log(banners), [banners]);

  useEffect(() => fetchBanners(),[homepage, selectedCatalog]);

  const fetchBanners = () => {
    if (isDefined(homepage) && isDefined(homepage.banners) && isDefined(selectedCatalog)) {
        const others = homepage.banners.filter(b => b.bannerNumber === 2 && (!isDefinedAndNotVoid(b.catalogs) || b.catalogs.find(cat => cat.id === selectedCatalog.id))).filter((b, i) => i < 3);
        setBanners(others);
    }
  };

  return (
    <div
      className={`banner-area banner-area-2 ${
        spaceTopClass ? spaceTopClass : ""
      } ${spaceBottomClass ? spaceBottomClass : ""}`}
    >
      <div className="container-fluid">
        <div className="custom-row-2">
          {isDefinedAndNotVoid(banners) && banners.map((single, key) => {
              return (
                <BannerEighteenSingle
                  spaceBottomClass="mb-10"
                  data={ single }
                  key={ key }
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

BannerEighteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerEighteen;
