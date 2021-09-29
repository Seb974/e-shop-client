import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";
import HomeContext from "../../contexts/HomeContext";
import ProductsContext from "../../contexts/ProductsContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const BannerNineteen = ({ spaceTopClass, spaceBottomClass }) => {

  const { homepage } = useContext(HomeContext);
  const { products } = useContext(ProductsContext);
  const { selectedCatalog } = useContext(AuthContext);
  const [mainBanner, setMainBanner] = useState(null);
  const [banners, setBanners] = useState([]);

  // useEffect(() => fetchBanners(),[]);
  useEffect(() => fetchBanners(),[homepage, selectedCatalog]);

  const fetchBanners = () => {
    if (isDefined(homepage) && isDefined(homepage.banners) && isDefined(selectedCatalog)) {
        const main = homepage.banners.find(b => b.isMain && (!isDefinedAndNotVoid(b.catalogs) || b.catalogs.find(cat => cat.id === selectedCatalog.id)));
        const others = homepage.banners.filter(b => !b.isMain && (!isDefinedAndNotVoid(b.catalogs) || b.catalogs.find(cat => cat.id === selectedCatalog.id))).filter((b, i) => i < 2);
        setMainBanner(main);
        setBanners(others);
    }
  };

  const hasValidDiscount = product => {
    return isDefined(product.discount) && product.discount > 0 && isDefined(product.offerEnd) && new Date(product.offerEnd) >= new Date();
  };

  const getProductPrice = (product) => {
    if (isDefinedAndNotVoid(products)) {
      const selection = products.find(p => p.id === product.id);
      const tax = selection.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.id === selectedCatalog.id);
      const discount = hasValidDiscount(selection) ? selection.discount / 100 : 0;
      return (selection.price * (1 + tax.percent) * (1 - discount)).toFixed(2);
    }
    return 0;
  }

  return (
    <div
      className={`banner-area ${spaceTopClass ? spaceTopClass : ""}  ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container padding-20-row-col">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single-banner mb-20 rounded">
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
              <div className="banner-content-4 banner-position-hm15-2 pink-banner">
                {isDefined(mainBanner) && isDefined(mainBanner.product) && hasValidDiscount(mainBanner.product) && <span>-{mainBanner.product.discount} %</span>}
                <h2 style={{ 
                    color: isDefined(mainBanner) && isDefined(mainBanner.titleColor) ? mainBanner.titleColor : "#ED59A0",
                    shadow: isDefined(mainBanner) && isDefined(mainBanner.textShadow) && mainBanner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                }}>
                    { isDefined(mainBanner) && mainBanner.title }
                </h2>
                <h5 style={{ 
                    color: isDefined(mainBanner) && isDefined(mainBanner.textColor) ? mainBanner.textColor : "black",
                    shadow: isDefined(mainBanner) && isDefined(mainBanner.textShadow) && mainBanner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                }}>
                    { isDefined(mainBanner) && mainBanner.subtitle }
                </h5>
                <Link className="rounded"
                    to={isDefined(mainBanner) && isDefined(mainBanner.product) ? "/product/" + mainBanner.product.id : "/shop"}
                    style={{ 
                      backgroundColor: isDefined(mainBanner) && isDefined(mainBanner.titleColor) ? mainBanner.titleColor : "#ED59A0",
                  }}
                >
                  J'EN PROFITE
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
              { banners.map((banner, key) => {
                return (
                    <div key={ key } className="single-banner mb-20 rounded">
                        <Link to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : "/shop"}>
                            { isDefined(banner) && isDefined(banner.image.imgPath) ?
                                <Imgix  src={ banner.image.imgPath } className="lazyload default-img" alt={ banner.image.filePath } width={ 575 } disableSrcSet={ true } disableLibraryParam={ true }
                                        attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                                />
                                :
                                <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + banner.image.filePath } alt="" />
                            }
                        </Link>
                        <div className="banner-content-3 banner-position-hm15-2 pink-banner">
                            <h3 style={{ 
                                color: isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "black",
                                shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                            }}>
                                { banner.title }
                            </h3>
                            <p style={{ 
                                color: isDefined(banner) && isDefined(banner.textColor) ? banner.textColor : "#ED59A0",
                                shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                            }}>
                                { banner.subtitle }
                                { isDefined(selectedCatalog) && isDefined(banner) && isDefined(banner.product) && 
                                    <span className="ml-2" style={{ 
                                      color: isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "black",
                                      shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                                    }}>
                                        { getProductPrice(banner.product) } €
                                    </span>
                                }
                            </p>
                            <Link 
                                to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : "/shop"}
                                style={{ 
                                    color: isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "#ED59A0",
                                    border: '3px solid ' + (isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "#ED59A0"), 
                                    shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                                }}
                            >
                                <i className="fa fa-long-arrow-right" />
                            </Link>
                        </div>
                    </div>

                )
              }) }
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
