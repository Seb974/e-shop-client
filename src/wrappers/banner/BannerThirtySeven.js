import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const BannerThirtySeven = ({ spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);
  const { selectedCatalog } = useContext(AuthContext);
  const [banners, setBanners] = useState([]);

  useEffect(() => defineBanner(),[homepage, selectedCatalog]);

  const defineBanner = () => {
    if (isDefined(homepage) && isDefinedAndNotVoid(homepage.banners)) {
        const bannersTwo = homepage.banners.filter(b => b.bannerNumber === 2 && (!isDefinedAndNotVoid(b.catalogs) || b.catalogs.find(cat => cat.id === selectedCatalog.id)))
                                           .filter((b, i) => i < 2);
        setBanners(bannersTwo);
    }
  };

  return (
    <div className={`banner-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          { isDefinedAndNotVoid(banners) && banners.map((single, key) => {
              return (
                  <div className="col-lg-6 col-md-6" key={ key }>
                    <div className={`single-banner ${ key === 0 ? "mr-15" : "ml-15"} mb-15`}>
                      <Link to={isDefined(single) && isDefined(single.product) ? "/product/" + single.product.id : "/shop"}>
                        <Imgix  src={ single.image.imgPath } className="lazyload default-img" alt={ single.image.filePath } width="945" disableSrcSet={ true } disableLibraryParam={ true }
                                attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                        />
                      </Link>
                    </div>
                  </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );



};

BannerThirtySeven.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerThirtySeven;
