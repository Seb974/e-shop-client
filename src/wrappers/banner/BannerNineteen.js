import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import HomeContext from "../../contexts/HomeContext";
import { isDefined } from "../../helpers/utils";

const BannerNineteen = ({ spaceTopClass, spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);
  const [mainBanner, setMainBanner] = useState(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (isDefined(homepage) && isDefined(homepage.banners)) {
        const main = homepage.banners.find(b => b.main);
        const others = homepage.banners.filter(b => !b.main).filter((b, i) => i < 2);
        setMainBanner(main);
        setBanners(others);
    }
  },[homepage]);

  return (
    <div
      className={`banner-area ${spaceTopClass ? spaceTopClass : ""}  ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
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
              <div className="banner-content-4 banner-position-hm15-2 pink-banner">
                <span>-20% Off</span>
                <h2>{ isDefined(mainBanner) && mainBanner.title }</h2>
                <h5>{ isDefined(mainBanner) && mainBanner.subtitle }</h5>
                <Link to={isDefined(mainBanner) && isDefined(mainBanner.product) ? "/product/" + mainBanner.product.id : "/shop"}>
                  J'EN PROFITE
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
                        <div className="banner-content-3 banner-position-hm15-2 pink-banner">
                            <h3>{ banner.title }</h3>
                            <p>{ banner.subtitle }<span>$99.00</span></p>
                            <Link to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : "/shop"}>
                                <i className="fa fa-long-arrow-right" />
                            </Link>
                        </div>
                    </div>

                )
              }) }

            {/* <div className="single-banner mb-20">
              <Link to={process.env.PUBLIC_URL + "/shop"}>
                <img src={ process.env.PUBLIC_URL + "/assets/img/banner/banner26.jpg" } alt="" />
              </Link>
              <div className="banner-content-3 banner-position-hm17-1 pink-banner">
                <h3>Cup Cake </h3>
                <p>
                  Starting At <span>$99.00</span>
                </p>
                <Link to={process.env.PUBLIC_URL + "/shop"}>
                  <i className="fa fa-long-arrow-right" />
                </Link>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

BannerNineteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerNineteen;
