import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ProductsContext from "../../../contexts/ProductsContext";
import { getDiscountPrice } from "../../../helpers/product";
import { isDefined, isDefinedAndNotVoid } from "../../../helpers/utils";
import { getProductsFromIds } from '../../../helpers/product';
import api from "../../../config/api";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../../contexts/AuthContext";
import { definePackages, getAvailableWeight, getOrderWeight, formatPackages } from "../../../helpers/containers";
import ContainerContext from "../../../contexts/ContainerContext";
import DeliveryContext from "../../../contexts/DeliveryContext";
import Imgix from "react-imgix";
import { checkForRestrictions } from "../../../helpers/checkout";

const MenuCart = ({ cartData, currency, deleteFromCart, active = "", strings }) => {

  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const [productCart, setProductCart] = useState([]);
  const { products, categories } = useContext(ProductsContext);
  const { country, selectedCatalog, settings, catalogs } = useContext(AuthContext);
  const { packages, setPackages, totalWeight, setTotalWeight, availableWeight, setAvailableWeight, condition } = useContext(DeliveryContext);
  const { containers } = useContext(ContainerContext);
  const [packageUpdate, setPackageUpdate] = useState(false);

  useEffect(() => {
      setPackageUpdate(false);
      const productSet = getProductsFromIds(cartData, products);
      setProductCart(productSet);
  }, [cartData, products]);

  useEffect(() => {
    if (isDefined(selectedCatalog) && isDefinedAndNotVoid(categories))
        checkForRestrictions(selectedCatalog, getProductsFromIds(cartData, products), categories, addToast);
  }, [cartData, selectedCatalog]);

  useEffect(() => {
    if (!packageUpdate)
      updatePackages();
  }, [productCart]);

  useEffect(() => updatePackages(), [containers, selectedCatalog]);

  useEffect(() => {
      if (isDefinedAndNotVoid(productCart) && isDefinedAndNotVoid(products) && isDefined(selectedCatalog) && selectedCatalog.needsParcel) {     // && selectedCatalog.needsParcel
          if (isDefinedAndNotVoid(packages) && selectedCatalog.needsParcel) {
              setPackageUpdate(true);
              const packageProducts = formatPackages(packages, country);
              setProductCart([
                  ...productCart.filter(product => !isDefined(product.isPackage)), 
                  ...packageProducts
              ]);
              setTotalWeight(getOrderWeight(productCart.filter(product => !isDefined(product.isPackage))));
              setAvailableWeight(getAvailableWeight(getOrderWeight(productCart.filter(product => !isDefined(product.isPackage))), packages));
          } else if (packages.length === 0) {
                  setPackageUpdate(false);
                  const productSet = getProductsFromIds(cartData, products);
                  setProductCart(productSet);
                  setTotalWeight(0);
                  setAvailableWeight(0);
          }
      } else if (isDefinedAndNotVoid(productCart) && isDefinedAndNotVoid(products) && isDefined(selectedCatalog) && !selectedCatalog.needsParcel && productCart.filter(product => isDefined(product.isPackage)).length > 0) {
          const productSet = getProductsFromIds(cartData, products);
          setProductCart(productSet);
          setTotalWeight(0);
          setAvailableWeight(0);
      }
  }, [packages]);

  const updatePackages = () => {
      if (isDefinedAndNotVoid(productCart) && isDefinedAndNotVoid(containers) && isDefined(selectedCatalog)) {
          setPackages(selectedCatalog.needsParcel ? definePackages(productCart.filter(product => !isDefined(product.isPackage)), containers) : []);
          setPackageUpdate(false);
      }
  };

  const getVariantName = (variantName, sizeName) => {
    const isVariantEmpty = !isDefined(variantName) || variantName.length === 0 || variantName.replace(" ","").length === 0;
    const isSizeEmpty = !isDefined(sizeName) || sizeName.length === 0 || sizeName.replace(" ","").length === 0;
    return (!isVariantEmpty ? variantName + " " : "") + (!isSizeEmpty ? sizeName : "");
};

  return (
    <div className={"shopping-cart-content " + active}>
      { isDefinedAndNotVoid(productCart) ?
        <Fragment>
          <ul>
            { productCart.map((single, key) => {
              const taxToApply = !isDefined(single) || !isDefined(single.product) || !settings.subjectToTaxes ? 0 : 
                single.product.tax.catalogTaxes.find(catalogTax => catalogTax.catalog.code === (isDefined(selectedCatalog) ? selectedCatalog.code : country)).percent;
              const discountedPrice = isDefined(single.product) ? getDiscountPrice(single.product.price, single.product.discount, single.product.offerEnd) : 0;
              const finalProductPrice = isDefined(single.product) ? (Math.round(single.product.price * currency.currencyRate * (1 + taxToApply) * 100) / 100).toFixed(2) : 0;
              const finalDiscountedPrice = isDefined(single.product) ? (Math.round(discountedPrice * currency.currencyRate * (1 + taxToApply) * 100) / 100).toFixed(2) : 0;

              discountedPrice != null ? 
                  cartTotalPrice += Math.round(finalDiscountedPrice * single.quantity * 100) / 100 :
                  cartTotalPrice += Math.round(finalProductPrice * single.quantity * 100) / 100;

              return !isDefined(single.product) ? <div key={ key }></div> : (
                <li className="single-shopping-cart" key={ key }>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + single.product.id}>
                      { isDefined(single.isPackage) && single.isPackage ?
                            isDefined(single.product.image.imgPath) ?
                                <Imgix  src={ single.product.image.imgPath } className="lazyload img-fluid" alt={ single.product.image.filePath } width={ 600 } disableSrcSet={ true } disableLibraryParam={ true }
                                        attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                                />
                                :
                                <img alt="" src={ single.product.image.filePath } className="img-fluid"/>
                        :
                            isDefined(single.product.image.imgPath) ?
                                <Imgix  src={ single.product.image.imgPath } className="lazyload img-fluid" alt={ single.product.image.filePath } width={ 600 } disableSrcSet={ true } disableLibraryParam={ true }
                                        attributeConfig={{ srcSet: 'data-srcset', sizes: 'data-sizes'}}
                                />
                                :
                                <img alt="" src={ api.API_DOMAIN + '/uploads/pictures/' + single.product.image.filePath } className="img-fluid"/>
                      }
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                    { isDefined(single.isPackage) && single.isPackage ? " " + single.product.name + " " :
                      <Link to={process.env.PUBLIC_URL + "/product/" + single.product.id}>
                        {" "}
                          { single.product.name }
                          { !(single.selectedProductColor && single.selectedProductSize) ? "" : <><br/><small>{ getVariantName(single.selectedProductColor.color, single.selectedProductSize.name) }</small></> }
                        {" "}
                      </Link>
                    }
                    </h4>
                    <h6>{strings["qty"]} : {single.quantity} { isDefined(single.product) && isDefined(single.product.unit) ? single.product.unit : "U" }</h6>
                    <span>
                      { discountedPrice !== null ? 
                          finalDiscountedPrice + " " + currency.currencySymbol : 
                          finalProductPrice + " " + currency.currencySymbol 
                      }
                    </span>
                    { !isDefined(single.isPackage) || !single.isPackage ? <></> :
                        <div className="cart-item-variation">
                          { single.product.key === 0 && availableWeight >= 0.1 ? 
                              <span className="text-warning"><i className="fas fa-info-circle mr-1"></i>{ (Math.floor(availableWeight * 10) / 10).toFixed(2) } {strings["kg_available"]}</span> :
                              <span className="text-success"><i className="fas fa-check-circle mr-1"> {strings["package_full"]}</i></span>
                          }
                        </div>
                    }
                  </div>
                  { isDefined(single.isPackage) && single.isPackage ? <></> :
                      <div className="shopping-cart-delete">
                          <button onClick={() => deleteFromCart(single, addToast)}>
                              <i className="fa fa-times-circle" />
                          </button>
                      </div>
                  }
                </li>
              );

            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              {strings["total"]} :{" "}
              <span className="shop-total">{ cartTotalPrice.toFixed(2) + " " + currency.currencySymbol }</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>{strings["view_cart"]}</Link>
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/checkout"}>{strings["checkout"]}</Link>
          </div>
        </Fragment>
      :
        <p className="text-center">{strings["no_items_cart"]}</p>
      }
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func
};

export default multilanguage(MenuCart);