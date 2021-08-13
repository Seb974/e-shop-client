import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import HomeContext from "../../contexts/HomeContext";
import { isDefined } from "../../helpers/utils";

const BannerThirtySix = ({ spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);
  const [mainBanner, setMainBanner] = useState(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (isDefined(homepage) && isDefined(homepage.banners)) {
        const main = homepage.banners.find(b => b.main && b.bannerNumber === 2);
        const others = homepage.banners.filter(b => !b.main && b.bannerNumber === 2).filter((b, i) => i < 2);
        setMainBanner(main);
        setBanners(others);
    }
  },[homepage]);

  return (
    <div className={`banner-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container padding-20-row-col">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single-banner mb-20">
              <Link to={isDefined(mainBanner) && isDefined(mainBanner.product) ? "/product/" + mainBanner.product.id : "/shop"}>
                { isDefined(mainBanner) ?
                      isDefined(mainBanner.image.imgPath) ?
                        <Imgix  src={ mainBanner.image.imgPath } className="lazyload default-img" alt={ mainBanner.image.filePath } width="575" disableSrcSet={ true } disableLibraryParam={ true }
                                attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                        />
                        :
                        <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + mainBanner.image.filePath } alt="" />
                  : <></>
                }
              </Link>
              <div className="banner-content-6">
                <Link to={isDefined(mainBanner) && isDefined(mainBanner.product) ? "/product/" + mainBanner.product.id : "/shop"}>
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
              { banners.map(banner => {
                    return (
                        <div className="single-banner mb-20">
                          <Link to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : "/shop"}>
                              { isDefined(banner) && isDefined(banner.image.imgPath) ?
                                  <Imgix  src={ banner.image.imgPath } className="lazyload default-img" alt={ banner.image.filePath } width="575" disableSrcSet={ true } disableLibraryParam={ true }
                                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                                  />
                                  :
                                  <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + banner.image.filePath } alt="" />
                              }
                          </Link>
                          <div className="banner-content-7">
                            <span>{ banner.title }</span>
                            <h2>{ banner.subtitle }</h2>
                            <Link to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : "/shop"}>
                              <i className="fa fa-long-arrow-right" />
                            </Link>
                          </div>
                        </div>
                    )})
              }
          </div>
        </div>
      </div>
    </div>
  );
};

BannerThirtySix.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerThirtySix;
