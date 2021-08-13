import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import api from "../../config/api";
import Imgix from "react-imgix";

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade"
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  return !isDefined(product) ? <></> :  (
    <Fragment>
      <div className="product-large-image-wrapper">
        { !(product.discount || product.new) ? "":
          <div className="product-img-badges">
            {product.discount ? <span className="pink">-{product.discount}%</span> : ""}
            {product.new ? <span className="purple">New</span> : ""}
          </div>
        }
        <LightgalleryProvider>
          <Swiper {...gallerySwiperParams}>
            { !isDefined(product.image) ? <></> :
                Array.isArray(product.image) ?
                  product.image.map((single, key) => {
                    return (
                      <div key={key}>
                        <div className="single-image">
                          {/* <img src={process.env.PUBLIC_URL + single} className="img-fluid" alt="" /> */}
                          { isDefined(single.imgPath) ?
                              <Imgix  src={ single.imgPath } className="lazyload img-fluid" alt={ single.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                                      attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                              />
                              :
                              <img src={process.env.PUBLIC_URL + single} className="img-fluid" alt="" />
                          }
                        </div>
                      </div>
                    );
                  })
                :
                <div>
                  <div className="single-image">
                    { isDefined(product.image.imgPath) ?
                        <Imgix  src={ product.image.imgPath } className="lazyload img-fluid" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                                attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                        />
                        :
                        <img src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} className="img-fluid" alt="" />
                    }
                  </div>
                </div>
            }
            { !isDefinedAndNotVoid(product.variations) ? <></> : product.variations.map((single, key) => {
                return !isDefined(single.image) ? <></> : 
                    <div key={key}>
                      <div className="single-image">
                        <img src={api.API_DOMAIN + '/uploads/pictures/' + single.image.filePath} className="img-fluid" alt="" />
                      </div>
                    </div>
                })
            }
          </Swiper>
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper mt-15">
        { isDefinedAndNotVoid(product.variations) &&
          <Swiper {...thumbnailSwiperParams}>
              {isDefined(product.image) && 
                  <div>
                    <div className="single-image">
                      {
                        isDefined(product.image.imgPath) ?
                          <Imgix  src={ product.image.imgPath } className="lazyload img-fluid" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                                  attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                          />
                          :
                          <img src={api.API_DOMAIN + '/uploads/pictures/' + product.image.filePath} className="img-fluid" alt="" />
                      }
                    </div>
                  </div>
              }
              { product.variations.map((single, key) => {
                return !isDefined(single.image) ? <></> : 
                    <div key={key}>
                      <div className="single-image">
                        { isDefined(single.image.imgPath) ?
                          <Imgix  src={ single.image.imgPath } className="lazyload img-fluid" alt={ single.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                                  attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                          />
                          :
                          <img src={api.API_DOMAIN + '/uploads/pictures/' + single.image.filePath} className="img-fluid" alt="" />
                      }
                      </div>
                    </div>
                })
              }
          </Swiper>
        }
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object
};

export default ProductImageGallery;
