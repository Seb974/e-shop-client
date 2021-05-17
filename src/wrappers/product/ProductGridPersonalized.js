import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridPersonalizedSingle from "../../components/product/ProductGridPersonalizedSingle";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import ProductsContext from "../../contexts/ProductsContext";

const ProductGridPersonalized = ({ products, currency, addToCart, addToWishlist, addToCompare, cartItems, wishlistItems, compareItems, sliderClassName, spaceBottomClass}) => {
  
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const { navSearch, selectedCategory } = useContext(ProductsContext);

  useEffect(() => setProductsToDisplay(), []);
  useEffect(() => setProductsToDisplay(), [products, navSearch, selectedCategory]);

  const setProductsToDisplay = () => {
      if (isDefinedAndNotVoid(products)) {
          let productsToDisplay = products;
          if (isDefined(navSearch) && navSearch.length > 0)
              productsToDisplay = products.filter(product => product.name.toUpperCase().includes(navSearch.toUpperCase()));
          else if (parseInt(selectedCategory) !== -1)
              productsToDisplay = products.filter(product => product.categories.find(category => category.id === parseInt(selectedCategory)) !== undefined);
          setDisplayedProducts(productsToDisplay);
      }
  };

  return (
    <Fragment>
      { displayedProducts.length > 0 ? displayedProducts.map(product => {
        return (
          <ProductGridPersonalizedSingle
              sliderClassName={sliderClassName}
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              addToCompare={addToCompare}
              cartItem={
                cartItems.filter(cartItem => cartItem.id === product.id)[0]
              }
              wishlistItem={
                wishlistItems.filter(
                  wishlistItem => wishlistItem.id === product.id
                )[0]
              }
              compareItem={
                compareItems.filter(
                  compareItem => compareItem.id === product.id
                )[0]
              }
              key={product.id}
          />
        );
      }) : 
      <div className="row">
          <div className="col-md-12 ml-3">
              <p>Aucun produit à afficher</p>
          </div>
      </div>
      }
    </Fragment>
  );
};

ProductGridPersonalized.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridPersonalized);
