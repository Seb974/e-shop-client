import React, { useContext, useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";
import HomeContext from "../../contexts/HomeContext";
import ProductsContext from "../../contexts/ProductsContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";

const BannerFive = () => {

  const { homepage } = useContext(HomeContext);
  const { products } = useContext(ProductsContext);
  const { selectedCatalog } = useContext(AuthContext);
  const [mainBanner, setMainBanner] = useState(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => fetchBanners(),[homepage, selectedCatalog]);

  const fetchBanners = () => {
    if (isDefined(homepage) && isDefined(homepage.banners) && isDefined(selectedCatalog)) {
        const main = homepage.banners.find(b => b.bannerNumber ===1 && b.isMain && (!isDefinedAndNotVoid(b.catalogs) || b.catalogs.find(cat => cat.id === selectedCatalog.id)));
        const others = homepage.banners.filter(b => b.bannerNumber ===1 && !b.isMain && (!isDefinedAndNotVoid(b.catalogs) || b.catalogs.find(cat => cat.id === selectedCatalog.id))).filter((b, i) => i < 4);
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
    <div className="banner-area hm9-section-padding mt-90 mb-90">
      <div className="container-fluid">
        <div className="row">
        <div className="col-lg-4 col-md-6">
            <div className="row">
                { banners
                    .filter((b, i) => i < 2)
                    .map((banner, key) => {
                      return (
                        <div key={ key } className="col-lg-12">
                          <div className="single-banner mb-20">
                            <Link to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : isDefined(banner) && isDefined(banner.category) ? "/shop?category=" + banner.category.id : "/shop"}>
                              { isDefined(banner) ?
                                    isDefined(banner.image.imgPath) ?
                                      <Imgix  src={ banner.image.imgPath } className="lazyload default-img" alt={ banner.image.filePath } width={ 580 } disableSrcSet={ true } disableLibraryParam={ true }
                                              attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                                      />
                                      :
                                      <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + banner.image.filePath } alt="" />
                                : <></>
                              }
                            </Link>
                            <div className="banner-content-3 banner-position-hm15-1">
                              <h3 style={{
                                  color: isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "black",
                                  shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                              }}>
                                  { isDefined(banner) && banner.title }
                              </h3>
                              <p> 
                                  <span style={{
                                      color: isDefined(banner) && isDefined(banner.textColor) ? banner.textColor : "#ED59A0",
                                      shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                                  }}>
                                      { isDefined(banner) && banner.subtitle }
                                  </span>
                                  { isDefined(selectedCatalog) && isDefined(banner) && isDefined(banner.product) && 
                                    <span className="ml-2" style={{ 
                                      color: isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "black",
                                      shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                                    }}>
                                        { getProductPrice(banner.product) } €
                                    </span>
                                  }
                              </p>
                              <Link to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : isDefined(banner) && isDefined(banner.category) ? "/shop?category=" + banner.category.id : "/shop"}>
                                <i className="fa fa-long-arrow-right" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                  })
                }
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-banner mb-20">
              <Link to={isDefined(mainBanner) && isDefined(mainBanner.product) ? "/product/" + mainBanner.product.id : isDefined(mainBanner) && isDefined(mainBanner.category) ? "/shop?category=" + mainBanner.category.id : "/shop"}>
                { isDefined(mainBanner) ?
                      isDefined(mainBanner.image.imgPath) ?
                        <Imgix  src={ mainBanner.image.imgPath } className="lazyload default-img" alt={ mainBanner.image.filePath } width={ 580 } disableSrcSet={ true } disableLibraryParam={ true }
                                attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                        />
                        :
                        <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + mainBanner.image.filePath } alt="" />
                  : <></>
                }
              </Link>
              <div className="banner-content-4 banner-position-hm15-2">
                { isDefined(selectedCatalog) && isDefined(mainBanner) && isDefined(mainBanner.product) && 
                  <span className="ml-2" style={{ 
                    color: isDefined(mainBanner) && isDefined(mainBanner.titleColor) ? mainBanner.titleColor : "black",
                    shadow: isDefined(mainBanner) && isDefined(mainBanner.textShadow) && mainBanner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                  }}>
                    { getProductPrice(mainBanner.product) } €
                  </span>
                }
                <h2 style={{
                    color: isDefined(mainBanner) && isDefined(mainBanner.titleColor) ? mainBanner.titleColor : "black",
                    shadow: isDefined(mainBanner) && isDefined(mainBanner.textShadow) && mainBanner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                }}>
                    { isDefined(mainBanner) && mainBanner.title }
                </h2>
                <h5 style={{
                    color: isDefined(mainBanner) && isDefined(mainBanner.textColor) ? mainBanner.textColor : "#ED59A0",
                    shadow: isDefined(mainBanner) && isDefined(mainBanner.textShadow) && mainBanner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                }}>
                    { isDefined(mainBanner) && mainBanner.subtitle }
                </h5>
                <Link to={isDefined(mainBanner) && isDefined(mainBanner.product) ? "/product/" + mainBanner.product.id : isDefined(mainBanner) && isDefined(mainBanner.category) ? "/shop?category=" + mainBanner.category.id : "/shop"}>
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="row">
            { banners
                .filter((b, i) => i >= 2)
                .map((banner, key) => {
                  return (
                    <div key={ key } className="col-lg-12 col-md-6">
                      <div className="single-banner mb-20">
                        <Link to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : isDefined(banner) && isDefined(banner.category) ? "/shop?category=" + banner.category.id : "/shop"}>
                          { isDefined(banner) ?
                                isDefined(banner.image.imgPath) ?
                                  <Imgix  src={ banner.image.imgPath } className="lazyload default-img" alt={ banner.image.filePath } width={ 580 } disableSrcSet={ true } disableLibraryParam={ true }
                                          attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                                  />
                                  :
                                  <img className="default-img" src={ api.API_DOMAIN + "/uploads/pictures/" + banner.image.filePath } alt="" />
                            : <></>
                          }
                        </Link>
                        <div className="banner-content-3 banner-position-hm15-2">
                          <h3 style={{
                              color: isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "black",
                              shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                          }}>
                              { isDefined(banner) && banner.title }
                          </h3>
                          <p> 
                              <span style={{
                                  color: isDefined(banner) && isDefined(banner.textColor) ? banner.textColor : "#ED59A0",
                                  shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                              }}>
                                  { isDefined(banner) && banner.subtitle }
                              </span>
                              { isDefined(selectedCatalog) && isDefined(banner) && isDefined(banner.product) && 
                                <span className="ml-2" style={{ 
                                  color: isDefined(banner) && isDefined(banner.titleColor) ? banner.titleColor : "black",
                                  shadow: isDefined(banner) && isDefined(banner.textShadow) && banner.textShadow ? "0.1em 0.1em 0.2em black" : "none"
                                }}>
                                    { getProductPrice(banner.product) } €
                                </span>
                              }
                          </p>
                          <Link to={isDefined(banner) && isDefined(banner.product) ? "/product/" + banner.product.id : isDefined(banner) && isDefined(banner.category) ? "/shop?category=" + banner.category.id : "/shop"}>
                            <i className="fa fa-long-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
              })
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFive;
