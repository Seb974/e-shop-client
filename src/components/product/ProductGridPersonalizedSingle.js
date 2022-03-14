import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice, hasEnoughStock, getAvailableStock } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import { isDefined } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";
import * as icons from "react-bootstrap-icons";
import { RiShoppingCartLine, RiCloseLine, RiHeart3Line, RiHeart3Fill, RiShuffleFill, RiEmotionUnhappyLine } from "react-icons/ri";
import Imgix from "react-imgix";

const ProductGridPersonalizedSingle = ({ product, currency, addToCart, addToWishlist, addToCompare, cartItem, wishlistItem, compareItem, sliderClassName, spaceBottomClass, strings }) => {

  const { addToast } = useToasts();
  const [modalShow, setModalShow] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [hasStock, setHasStock] = useState(false);
  const { country, settings, selectedCatalog } = useContext(AuthContext);
  const quantityInput = useRef();

  const [wish, setWish] = useState(wishlistItem === undefined ? false : true);
  const [comp, setComp] = useState(compareItem === undefined ? false : true);

  const handleChange = (number) => {
    if (number != undefined) {
      const quant =
        quantityInput.current.value === ""
          ? 0
          : parseFloat(quantityInput.current.value);

      setQuantity(quant + number < 0 ? 0 : quant + number);
    } else {
      setQuantity(quantityInput.current.value);
    }
  };

  useEffect(() => {
    const stockStatus = hasEnoughStock(product);
    setHasStock(stockStatus);
  }, [product]);

  const taxToApply = !settings.subjectToTaxes ? 0 : 
      product.tax.catalogTaxes.find(
        (catalogTax) =>
          catalogTax.catalog.code ===
          (isDefined(selectedCatalog) ? selectedCatalog.code : country)
      ).percent; 

  const discountedPrice = getDiscountPrice(
    product.price,
    product.discount,
    product.offerEnd
  );

  const finalProductPrice = +(
    product.price *
    currency.currencyRate *
    (1 + taxToApply)
  ).toFixed(2);

  const finalDiscountedPrice = +(
    discountedPrice *
    currency.currencyRate *
    (1 + taxToApply)
  ).toFixed(2);

  const handleShowDetails = e => {
    e.preventDefault();
    setModalShow(true);
  };

  const handleAddToCart = (event) => {
    addToCart(product, addToast, parseFloat(quantity));
    setQuantity("");
  };

  return (
    <Fragment>
      {/* Card */}
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img rounded">
            <a href="#" onClick={handleShowDetails}>
              {isDefined(product.image) && (isDefined(product.image.imgPath) ? (
                <Imgix
                  src={product.image.imgPath}
                  className="lazyload default-img"
                  alt={product.image.filePath}
                  width={600}
                  disableSrcSet={true}
                  disableLibraryParam={true}
                  attributeConfig={{
                    srcSet: "data-srcset",
                    sizes: "data-sizes",
                  }}
                />
              ) : (
                <img
                  className="default-img"
                  src={process.env.PUBLIC_URL + product.image[0]}
                  alt=""
                />
              ))}
              { isDefined(product.image) && (
                isDefined(product.image.imgPath) ? (
                  <Imgix
                    src={product.image.imgPath}
                    className="lazyload hover-img"
                    alt={product.image.filePath}
                    width={600}
                    disableSrcSet={true}
                    disableLibraryParam={true}
                    attributeConfig={{
                      srcSet: "data-srcset",
                      sizes: "data-sizes",
                    }}
                  />
                ) : (
                  <img
                    className="hover-img"
                    src={
                      api.API_DOMAIN +
                      "/uploads/pictures/" +
                      product.image.filePath
                    }
                    alt=""
                  />
                ))
              }
            </a>
            <div className="product-img-action input-group">
              {wishlistItem !== undefined ? (
                <a className="btn py-0 px-1" title="Produit déjà ajouté">
                  <RiHeart3Fill className="text-danger" size={25} />
                </a>
              ) : (
                <a
                  className="btn py-0 px-1"
                  title="Ajouter produit à la WishList"
                  onClick={() => {
                    setWish(true);
                    addToWishlist(product, addToast);
                  }}
                >
                  <RiHeart3Line className="text-white" size={25} />
                </a>
              )}
              {compareItem !== undefined ? (
                <a
                  className="btn py-0 px-1"
                  title="Produit ajouté en comparaison"
                >
                  <RiShuffleFill className="text-orange" size={25} />
                </a>
              ) : (
                <a
                  className="btn py-0 px-1"
                  title="Ajouter le produit en comparaison"
                  onClick={() => {
                    setComp(true);
                    addToCompare(product, addToast);
                  }}
                >
                  <RiShuffleFill className="text-white" size={25} />
                </a>
              )}
            </div>
            {!(product.discount || product.new) ? (
              ""
            ) : (
              <div className="product-img-badges">
                {isDefined(product.discount) &&
                product.discount > 0 &&
                isDefined(product.offerEnd) &&
                new Date(product.offerEnd) >= new Date() ? (
                  <span className="bg-danger  py-2 rounded-pill text-center">
                    -{product.discount} %
                  </span>
                ) : (
                  ""
                )}
                {product.new ? (
                  <span className="bg-success  py-2 rounded-pill text-center">
                    Nouveauté
                  </span>
                ) : (
                  ""
                )}
              </div>
            )}
            <div className="product-action">
              {(product.variations && product.variations.length >= 1 ) ? (
                <div className="input-group  p-0 border-0 ">
                  <a
                    href="#"
                    onClick={handleShowDetails}
                    className="btn btn-dark h-100 w-100 rounded-0 py-2 px-3"
                  >
                    Selectionnez option{" "}
                  </a>
                </div>
              ) 
            : ( (getAvailableStock(product) === 0 && isDefined(product.stockManaged) && product.stockManaged === false) || getAvailableStock(product) > 0) ? (
                <>
                  <div className="input-group  p-0 border-0 ">
                    <button
                      className="btn btn-dark  h-100 rounded-0 py-2 px-3"
                      onClick={() => handleChange(-1)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <input
                      ref={quantityInput}
                      type="number"
                      className="form-control h-100 p-2 text-center bg-white border border-white"
                      value={quantity}
                      onChange={({ currentTarget }) => {
                        const newQty = currentTarget.value;
                        setQuantity(parseFloat(newQty));
                      }}
                      min="0"
                      step="1"
                    />
                    <span className="input-group-text h-100 border border-white rounded-0 bg-white">
                      {product.unit && product.unit}{" "}
                    </span>
                    <button
                      className="btn btn-dark h-100 rounded-0 py-2 px-3"
                      onClick={() => handleChange(1)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </>
              ) : (
                <div className="input-group  p-0 border-0 ">
                  <button className="btn btn-dark pro-quickview rounded-0 w-100 h-100 p-2">
                    <RiEmotionUnhappyLine
                      size={20}
                      className="mr-1 text-danger"
                    />
                    {strings["out_of_stock"]}
                  </button>
                </div>
              )}
              {(getAvailableStock(product) ||
                (isDefined(product.stockManaged) &&
                  product.stockManaged === false &&
                  getAvailableStock(product) === 0)) &&
              !(product.variations && product.variations.length >= 1) ? (
                <>
                  <div className="input-group bg-dark">
                    <button
                      className="btn btn-success pro-quickview rounded-0 w-100 h-100 p-2"
                      onClick={handleAddToCart}
                      title="Quick View"
                      disabled={quantity <= 0}
                    >
                      <RiShoppingCartLine
                        className="mb-1"
                        color={"white"}
                        size={20}
                      />{" "}
                      <span className="fs-2 text">Ajouter au panier</span>
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="product-content text-center mt-2">
            <a href="#" onClick={handleShowDetails}>
              <h3>{product.name}</h3>
            </a>
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>
                    {finalDiscountedPrice.toFixed(2) +
                      " " +
                      currency.currencySymbol}
                  </span>{" "}
                  <span className="old">
                    {finalProductPrice.toFixed(2) +
                      " " +
                      currency.currencySymbol}
                  </span>
                </Fragment>
              ) : (
                <span>
                  {finalProductPrice.toFixed(2) + " " + currency.currencySymbol}{" "}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <a href="#" onClick={handleShowDetails}>
                    {isDefined(product.image) && (isDefined(product.image.imgPath) ? (
                      <Imgix
                        src={product.image.imgPath}
                        className="lazyload default-img img-fluid"
                        alt={product.image.filePath}
                        width={600}
                        disableSrcSet={true}
                        disableLibraryParam={true}
                        attributeConfig={{
                          srcSet: "data-srcset",
                          sizes: "data-sizes",
                        }}
                      />
                    ) : (
                      <img
                        className="default-img img-fluid"
                        src={
                          api.API_DOMAIN +
                          "/uploads/pictures/" +
                          product.image.filePath
                        }
                        alt=""
                        height="800"
                        width="600"
                      />
                    ))}
                    {isDefined(product.image) && (isDefined(product.image.imgPath) ? (
                      <Imgix
                        src={product.image.imgPath}
                        className="lazyload hover-img img-fluid"
                        alt={product.image.filePath}
                        width={600}
                        disableSrcSet={true}
                        disableLibraryParam={true}
                        attributeConfig={{
                          srcSet: "data-srcset",
                          sizes: "data-sizes",
                        }}
                      />
                    ) : (
                      <img
                        className="hover-img img-fluid"
                        src={
                          api.API_DOMAIN +
                          "/uploads/pictures/" +
                          product.image.filePath
                        }
                        alt=""
                        height="800"
                        width="600"
                      />
                    ))}{" "}
                    :
                  </a>
                  <div className="product-img-action input-group top-0">
                    {wishlistItem !== undefined ? (
                      <a className="btn py-0 px-1" title="Produit déjà ajouté">
                        <RiHeart3Fill className="text-danger" size={25} />
                      </a>
                    ) : (
                      <a
                        className="btn py-0 px-1"
                        title="Ajouter produit à la WishList"
                        onClick={() => {
                          setWish(true);
                          addToWishlist(product, addToast);
                        }}
                      >
                        <RiHeart3Line className="text-white" size={25} />
                      </a>
                    )}
                    {compareItem !== undefined ? (
                      <a
                        className="btn py-0 px-1"
                        title="Produit ajouté en comparaison"
                      >
                        <RiShuffleFill className="text-orange" size={25} />
                      </a>
                    ) : (
                      <a
                        className="btn py-0 px-1"
                        title="Ajouter le produit en comparaison"
                        onClick={() => {
                          setComp(true);
                          addToCompare(product, addToast);
                        }}
                      >
                        <RiShuffleFill className="text-white" size={25} />
                      </a>
                    )}
                  </div>
                  {!(product.discount || product.new) ? (
                    ""
                  ) : (
                    <div className="product-img-badges">
                      {isDefined(product.discount) &&
                      product.discount > 0 &&
                      isDefined(product.offerEnd) &&
                      new Date(product.offerEnd) >= new Date() ? (
                        <span className="bg-danger  py-2 rounded-pill text-center">
                          -{product.discount} %
                        </span>
                      ) : (
                        ""
                      )}
                      {product.new ? (
                        <span className="bg-success  py-2 rounded-pill text-center">
                          Nouveau
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <a href="#" onClick={handleShowDetails}>
                  <h3>{product.name}</h3>
                </a>
                <div className="product-list-price">
                  {discountedPrice === null ? (
                    <span>
                      {finalProductPrice.toFixed(2) +
                        " " +
                        currency.currencySymbol}{" "}
                    </span>
                  ) : (
                    <Fragment>
                      <span>
                        {finalDiscountedPrice.toFixed(2) +
                          " " +
                          currency.currencySymbol}
                      </span>{" "}
                      <span className="old">
                        {finalProductPrice.toFixed(2) +
                          " " +
                          currency.currencySymbol}
                      </span>
                    </Fragment>
                  )}
                </div>
                {isDefined(product.shortDescription) ? (
                  <p>{product.shortDescription}</p>
                ) : isDefined(product.fullDescription) ? (
                  <p>{product.fullDescription}</p>
                ) : (
                  ""
                )}
                <div className="shop-list-actions d-inline-flex flex-row">

                  {product.variations && product.variations.length >= 1 ? (
                    <a href="#" onClick={handleShowDetails}>
                      {strings["select_option"]}
                    </a>
                  ) : getAvailableStock(product) > 0 ? (
                    <div className="input-group p-0 rounded border border-dark ">
                      <button
                        className="btn btn-dark rounded-0 py-2 px-3"
                        onClick={() => handleChange(-1)}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <input
                        ref={quantityInput}
                        type="number"
                        className="form-control bg-white p-2 text-center border border-dark border-right-0"
                        value={quantity}
                        onChange={() => handleChange()}
                        min="0"
                        step="1"
                        style={{
                          maxWidth: "70px",
                        }}
                      />
                      <span className="input-group-text border border-dark  border-left-0 rounded-0 bg-light">
                        {product.unit && product.unit}{" "}
                      </span>
                      <button
                        className="btn btn-dark rounded-0 py-2 px-3"
                        onClick={() => handleChange(1)}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  ) : (
                    <button className=" btn btn-dark d-inline-flex">
                      <RiCloseLine
                        className=" mr-1 text-danger my-auto"
                        size={20}
                      />
                      <p className="m-0">{strings.out_of_stock}</p>
                    </button>
                  )}
                  {getAvailableStock(product) > 0 ? (
                    <>
                      <div className="input-group bg-dark ml-3 rounded">
                        <button
                          className="btn btn-success pro-quickview rounded w-100 h-100 p-2"
                          onClick={handleAddToCart}
                          title="Quick View"
                          disabled={quantity <= 0}
                        >
                          <RiShoppingCartLine
                            className="mb-1"
                            color={"white"}
                            size={20}
                          />{" "}
                          <span className="fs-2 text">Ajouter au panier</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
      />
    </Fragment>
  );
};

ProductGridPersonalizedSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default multilanguage(ProductGridPersonalizedSingle);
