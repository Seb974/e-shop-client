import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";
import HomeContext from "../../contexts/HomeContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const BannerThirtySix = ({ spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);
  const { selectedCatalog } = useContext(AuthContext);
  const [mainBanner, setMainBanner] = useState(null);
  const [banners, setBanners] = useState([]);

  // useEffect(() => fetchBanners(),[]);
  useEffect(() => fetchBanners(),[homepage, selectedCatalog]);

  const fetchBanners = () => {
    if (isDefined(homepage) && isDefined(homepage.banners) && isDefined(selectedCatalog)) {
        const main = homepage.banners.find(b => b.isMain && b.bannerNumber === 2 && (!isDefinedAndNotVoid(b.catalogs) || b.catalogs.find(cat => cat.id === selectedCatalog.id)));
        const others = homepage.banners.filter(b => !b.isMain && b.bannerNumber === 2 && (!isDefinedAndNotVoid(b.catalogs) || b.catalogs.find(cat => cat.id === selectedCatalog.id))).filter((b, i) => i < 2);
        setMainBanner(main);
        setBanners(others);
    }
  }

  return (
    <div className={`banner-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container padding-20-row-col">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single-banner mb-20">
              <Link to={isDefined(mainBanner) && isDefined(mainBanner.product) ? "/product/" + mainBanner.product.id : "/shop"}>
                { isDefined(mainBanner) ?
                      isDefined(mainBanner.image.imgPath) ?
                        <Imgix  src={ mainBanner.image.imgPath } className="lazyload default-img" alt={ mainBanner.image.filePath } width={ 575 } disableSrcSet={ true } disableLibraryParam={ true }
                                attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                        />
                        :
                        <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + mainBanner.image.filePath } alt="" />
                  : <></>
                }
              </Link>
              <div className="banner-content-6">
                <h2 style={{ 
                    color: isDefined(mainBanner) && isDefined(mainBanner.textColor) ? mainBanner.textColor : "red",
                    shadow: isDefined(mainBanner) && isDefined(mainBanner.textShadow) && mainBanner.textShadow ? "0.1em 0.1em 0.2em black" : "none",
                    fontSize: '2.2em'
                }}>
                    { isDefined(mainBanner) && isDefined(mainBanner.subtitle) ? mainBanner.subtitle : "" }
                </h2>
                <Link 
                    to={isDefined(mainBanner) && isDefined(mainBanner.product) ? "/product/" + mainBanner.product.id : "/shop"}
                    style={{ 
                      border: 'none',
                      backgroundColor: isDefined(mainBanner) && isDefined(mainBanner.titleColor) ? mainBanner.titleColor : "#ED59A0",
                    }}
                >
                  { isDefined(mainBanner) && isDefined(mainBanner.buttonText) ? mainBanner.buttonText.toUpperCase() : "J'EN PROFITE !"}
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
                                  <Imgix  src={ banner.image.imgPath } className="lazyload default-img" alt={ banner.image.filePath } width={ 575 } disableSrcSet={ true } disableLibraryParam={ true }
                                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                                  />
                                  :
                                  <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + banner.image.filePath } alt="" />
                              }
                          </Link>
                          <div className="banner-content-7">
                            <span style={{ 
                                color: isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "black",
                                shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                            }}>
                                { banner.title }
                            </span>
                            <h2 style={{ 
                                color: isDefined(banner) && isDefined(banner.textColor) ? banner.textColor : "red",
                                shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none",
                                fontSize: '2.8em'
                            }}>
                                { banner.subtitle }
                            </h2>
                            <Link 
                              to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : "/shop"}
                              style={{ 
                                color: isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "red",
                                border: '3px solid ' + (isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "red"), 
                                shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                            }}
                            >
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
