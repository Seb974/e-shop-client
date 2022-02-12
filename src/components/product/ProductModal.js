import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import {
  hasVariationScope,
  getProductCartQuantity,
  getAvailableStock,
  hasSizeScope,
} from "../../helpers/product";
import { Modal } from "react-bootstrap";
import Rating from "./sub-components/ProductRating";
import { connect } from "react-redux";
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { useToasts } from "react-toast-notifications";
import Imgix from "react-imgix";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
import {
  RiShoppingCartLine,
  RiCloseLine,
  RiEmotionUnhappyLine,
  RiHeart3Line,
  RiHeart3Fill,
  RiShuffleFill,
} from "react-icons/ri";

const ProductModal = ({
  product,
  currency,
  discountedprice,
  finalproductprice,
  finaldiscountedprice,
  wishlistItem,
  compareItem,
  addtocart: addToCart,
  addtowishlist: addToWishlist,
  addtocompare: addToCompare,
  cartitems: cartItems,
  show,
  onHide,
  strings
}) => {
  const { addToast } = useToasts();
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [wish, setWish] = useState(wishlistItem === undefined ? false : true);
  const [comp, setComp] = useState(compareItem === undefined ? false : true);
  const [selectedProductColor, setSelectedProductColor] = useState(
    isDefinedAndNotVoid(product.variations) ? product.variations[0] : undefined
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    isDefinedAndNotVoid(product.variations) &&
      isDefinedAndNotVoid(product.variations[0].sizes)
      ? product.variations[0].sizes[0]
      : undefined
  );
  const [productStock, setProductStock] = useState(
    getAvailableStock(product, selectedProductColor, selectedProductSize)
  );
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );
  const [quantityCount, setQuantityCount] = useState(1);

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

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
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
      prevEl: ".swiper-button-prev",
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
    ),
  };
  
// console.log(product.name + " : " + isDefined(product.stockManaged));
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={onHide}
        className="product-quickview-modal-wrapper"
        style={{ maxWidth: "auto" }}
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div
                className="product-large-image-wrapper "
                // style={{ maxWidth: "200px" }}
              >
                {/* <Swiper {...gallerySwiperParams}> */}
                {!isDefined(product.image) ? (
                  <></>
                ) : (
                  <div>
                    <div className="single-image mx-auto">
                      {isDefined(product.image.imgPath) ? (
                        <Imgix
                          src={product.image.imgPath}
                          className="lazyload rounded"
                          alt={product.image.filePath}
                          width="600"
                          disableSrcSet={true}
                          disableLibraryParam={true}
                          attributeConfig={{
                            srcSet: "data-srcset",
                            sizes: "data-sizes",
                          }}
                          htmlAttributes={{ className: "img-fluid" }}
                        />
                      ) : (
                        <img
                          src={
                            api.API_DOMAIN +
                            "/uploads/pictures/" +
                            product.image.filePath
                          }
                          className="img-fluid"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                )}
                {!isDefinedAndNotVoid(product.variations) ? (
                  <></>
                ) : (
                  <></>
                  // product.variations.map((single, key) => {
                  //   return !isDefined(single.image) ? (
                  //     <></>
                  //   ) : (
                  //     <div key={key}>
                  //       <div className="single-image">
                  //         {isDefined(product.image.imgPath) ? (
                  //           <Imgix
                  //             src={product.image.imgPath}
                  //             className="lazyload"
                  //             alt={product.image.filePath}
                  //             width="600"
                  //             disableSrcSet={true}
                  //             disableLibraryParam={true}
                  //             attributeConfig={{
                  //               srcSet: "data-srcset",
                  //               sizes: "data-sizes",
                  //             }}
                  //             htmlAttributes={{ className: "img-fluid" }}
                  //           />
                  //         ) : (
                  //           <img
                  //             src={
                  //               api.API_DOMAIN +
                  //               "/uploads/pictures/" +
                  //               single.image.filePath
                  //             }
                  //             className="img-fluid"
                  //             alt=""
                  //           />
                  //         )}
                  //       </div>
                  //     </div>
                  //   );
                  // })
                )}
                {/* </Swiper> */}
              </div>
              <div className="product-small-image-wrapper mt-15">
                {isDefinedAndNotVoid(product.variations) && (
                  <>
                    {/* <Swiper {...thumbnailSwiperParams}> */}
                    {isDefined(product.image) && (
                      <></>
                      // <div>
                      //   <div className="single-image">
                      //     {isDefined(product.image.imgPath) ? (
                      //       <Imgix
                      //         src={product.image.imgPath}
                      //         className="lazyload"
                      //         alt={product.image.filePath}
                      //         width="600"
                      //         disableSrcSet={true}
                      //         disableLibraryParam={true}
                      //         attributeConfig={{
                      //           srcSet: "data-srcset",
                      //           sizes: "data-sizes",
                      //         }}
                      //         htmlAttributes={{ className: "img-fluid" }}
                      //       />
                      //     ) : (
                      //       <img
                      //         src={
                      //           api.API_DOMAIN +
                      //           "/uploads/pictures/" +
                      //           product.image.filePath
                      //         }
                      //         className="img-fluid"
                      //         alt=""
                      //       />
                      //     )}
                      //   </div>
                      // </div>
                    )}
                    {/* { product.variations.map((single, key) => {
                      return !isDefined(single.image) ? <></> : 
                          <div key={key}>
                              <div className="single-image">
                                  { isDefined(product.image.imgPath) ?
                                    <Imgix  src={ product.image.imgPath } className="lazyload" alt={ product.image.filePath } width="600" disableSrcSet={ true } disableLibraryParam={ true }
                                            attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}} htmlAttributes={{className: "img-fluid" }}
                                    />
                                    :
                                    <img src={api.API_DOMAIN + '/uploads/pictures/' + single.image.filePath} className="img-fluid" alt=""/>
                                  }
                              </div>
                          </div>
                      })
                    } */}
                    {/* </Swiper> */}
                  </>
                )}
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  {discountedprice !== null ? (
                    <Fragment>
                      <span>
                        {finaldiscountedprice.toFixed(2) +
                          " " +
                          currency.currencySymbol}
                      </span>{" "}
                      <span className="old">
                        {finalproductprice.toFixed(2) +
                          " " +
                          currency.currencySymbol}
                      </span>
                    </Fragment>
                  ) : (
                    <span>
                      {finalproductprice.toFixed(2) +
                        " " +
                        currency.currencySymbol}{" "}
                    </span>
                  )}
                </div>
                <div className="pro-details-list">
                  <p>
                    {product.shortDescription
                      ? product.shortDescription
                      : product.fullDescription
                      ? product.fullDescription
                      : ""}
                  </p>
                  <div className="d-flex flex-row mt-3">
                    <div className="pro-details-wishlist mx-1 my-auto">
                      <span
                        className={wish ? "text-danger" : ""}
                        disabled={wish !== undefined}
                        title={
                          wishlistItem !== undefined
                            ? strings["added_to_wishlist"]
                            : strings["add_to_wishlist"]
                        }
                        onClick={() => {
                          addToWishlist(product, addToast);
                          setWish(true);
                        }}
                      >
                        {wish ? (
                          <RiHeart3Fill size={30} className="text-danger" />
                        ) : (
                          <RiHeart3Line size={30} className="text-dark" />
                        )}
                      </span>
                    </div>
                    <div className="pro-details-compare mx-1 my-auto">
                      <span
                        className={compareItem !== undefined ? "active" : ""}
                        disabled={compareItem !== undefined}
                        title={
                          compareItem !== undefined
                            ? strings["added_to_compare"]
                            : strings["add_to_compare"]
                        }
                        onClick={() => {
                          setComp(true);
                          addToCompare(product, addToast)
                        }}
                      >
                        
                        <RiShuffleFill size={30} className={`${comp ? 'text-orange' : ' ' }`} />
                      </span>
                    </div>
                  </div>
                </div>

                {isDefinedAndNotVoid(product.variations) ? (
                  <div className="pro-details-size-color">
                    <div className="pro-details-size">
                      <span>
                        {hasVariationScope(product.variations)
                          ? strings["variant"]
                          : ""}
                      </span>
                      <div className="pro-details-size-content">
                        {product.variations.map((single, key) => {
                          return (
                            <label
                              hidden={single.color.trim() === ""}
                              className={`pro-details-size-content--single ${single.color}`}
                              key={key}
                            >
                              <input
                                type="radio"
                                value={single.color}
                                checked={
                                  single.color === selectedProductColor.color
                                    ? "checked"
                                    : ""
                                }
                                onChange={() => {
                                  setSelectedProductColor(single);
                                  setSelectedProductSize(single.sizes[0]);
                                  setProductStock(
                                    single.sizes[0].stocks[0].quantity
                                  );
                                  setQuantityCount(1);
                                }}
                              />
                              <span className="size-name">{single.color} </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className="pro-details-size">
                      <span>{ isDefinedAndNotVoid(product.variations) && selectedProductColor.sizes.map(s => s.id).includes(selectedProductSize.id) && hasSizeScope(selectedProductColor.sizes) ? strings["declination"]: ""}</span>
                      <div className="pro-details-size-content">
                        {isDefinedAndNotVoid(product.variations) &&
                          product.variations.map((single) => {
                            return single.color !== selectedProductColor.color
                              ? ""
                              : single.sizes.map((singleSize, key) => {
                                  return singleSize.name.trim().length <= 0 ? <></> : (
                                    <label
                                      className={`pro-details-size-content--single rounded-pill`}
                                      key={key}
                                    >
                                      <input
                                        type="radio"
                                        value={singleSize.name}
                                        checked={
                                          singleSize.name ===
                                          selectedProductSize.name
                                            ? "checked"
                                            : ""
                                        }
                                        onChange={() => {
                                          setSelectedProductColor(single);
                                          setSelectedProductSize(singleSize);
                                          setProductStock(
                                            singleSize.stocks[0].quantity
                                          );
                                          setQuantityCount(1);
                                        }}
                                      />
                                      <span className="size-name rounded-pill">
                                        {singleSize.name}
                                      </span>
                                    </label>
                                  );
                                });
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="d-inline-flex flex-column mt-4">
                  {/* { console.log(product.name + " : " + getAvailableStock(product,selectedProductColor, selectedProductSize))} */}
                  {( (getAvailableStock(product,selectedProductColor, selectedProductSize) === 0 && isDefined(product.stockManaged) && product.stockManaged === false) || getAvailableStock(product,selectedProductColor, selectedProductSize) > 0 ) && (
                      <div className="input-group p-0 rounded border border-dark mb-2">
                        <button
                          onClick={() =>
                            setQuantityCount(
                              quantityCount > 1 ? quantityCount - 1 : 1
                            )
                          }
                          className="btn btn-dark rounded-0 py-2 px-3"
                        >
                          -
                        </button>
                        {/* <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly /> */}
                        <input
                          min="0"
                          max="999"
                          className="form-control bg-white p-2 text-center border border-dark border-right-0"
                          type="number"
                          value={quantityCount}
                          onChange={({ currentTarget }) => {
                            const newQty = currentTarget.value;
                            setQuantityCount(parseFloat(newQty));
                          }}
                        />
                        <span className="input-group-text border border-dark  border-left-0 rounded-0 bg-light">
                          {product.unit && product.unit}{" "}
                        </span>
                        <button
                          onClick={() =>
                            setQuantityCount(quantityCount + 1)
                          }
                          className="btn btn-dark rounded-0 py-2 px-3"
                        >
                          +
                        </button>
                      </div>
                    )}
                  <div className="d-inline-flex flex-row">
                    {(
                    //   getAvailableStock(
                    //   product,
                    //   selectedProductColor,
                    //   selectedProductSize
                    // ) <= 0 && isDefined(product.stockManaged) && product.stockManaged === false 
                    (getAvailableStock(product,selectedProductColor, selectedProductSize) <= 0 && (product.stockManaged === true || product.stockManaged == undefined)) ) ? (
                      <button className="btn btn-dark text-white">
                        <RiEmotionUnhappyLine
                          size={20}
                          className="mr-1 text-danger"
                        />
                        {strings["out_of_stock"]}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addToCart(
                            product,
                            addToast,
                            quantityCount,
                            selectedProductColor,
                            selectedProductSize
                          );
                          onHide();
                        }}
                        className="btn btn-success"
                        style={{
                          width: "100%",
                        }}
                      >
                        <RiShoppingCartLine size={20} className="mb-1 mr-1" />{" "}
                        {strings["add_to_cart"]}{" "}
                      </button>
                    )}
                  </div>
                </div>
                <div className="pro-details-social">
                  <ul>
                    <li className="d-inline mx-2">
                      <FacebookShareButton
                        url={api.CLIENT_DOMAIN + "/products/" + product.id}
                        quote={"Frais Pei"}
                        hashtag="#fraispei"
                        className="facebook"
                      >
                        <FacebookIcon size={36} round={true} />
                      </FacebookShareButton>
                    </li>
                    <li className="d-inline mx-2">
                      <FacebookMessengerShareButton
                        url={api.CLIENT_DOMAIN + "/products/" + product.id}
                        appId="630008714635405"
                        redirectUri={api.CLIENT_DOMAIN + "/products"}
                        className="facebook"
                      >
                        <FacebookMessengerIcon size={36} round={true} />
                      </FacebookMessengerShareButton>
                    </li>
                    <li className="d-inline mx-2">
                      <TwitterShareButton
                        url={api.CLIENT_DOMAIN + "/products/" + product.id}
                        title={"Frais Pei"}
                      >
                        <TwitterIcon size={36} round={true} />
                      </TwitterShareButton>
                    </li>
                    <li className="d-inline mx-2">
                      <LinkedinShareButton
                        url={api.CLIENT_DOMAIN + "/products/" + product.id}
                        title={"Frais Pei"}
                        summary="#fraispei"
                        source={api.CLIENT_DOMAIN}
                      >
                        <LinkedinIcon size={36} round={true} />
                      </LinkedinShareButton>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  addtocompare: PropTypes.func,
  addtowishlist: PropTypes.func,
  cartitems: PropTypes.array,
  compareitem: PropTypes.object,
  currency: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartitems: state.cartData,
  };
};

export default connect(mapStateToProps)(multilanguage(ProductModal));
