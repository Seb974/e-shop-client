import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect } from "react";
import { connect } from "react-redux";
import ProductGridHomePersonalizedSingle from "../../components/product/ProductGridHomePersonalizedSingle";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductsContext from "../../contexts/ProductsContext";
import AuthContext from "../../contexts/AuthContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import ProductActions from "../../services/ProductActions";

const ProductGridHomePersonalized = ({currency, addToCart, addToWishlist, addToCompare, cartItems, wishlistItems, compareItems, sliderClassName, spaceBottomClass, category, type, limit, section }) => {

  const pageLimit = 4;
  const { products, setProducts, setSelectedCategory } = useContext(ProductsContext);
  const { selectedCatalog } = useContext(AuthContext);

  useEffect(() => getHomeProducts(), []);
  useEffect(() => getHomeProducts(), [selectedCatalog, section]);

  const getHomeProducts = () => {
    if (isDefined(selectedCatalog) && type === section) {
        ProductActions
            .findTopProducts(selectedCatalog.id, section, pageLimit)
            .then(response => {
                setSelectedCategory(-1);
                setProducts(response);
            })
            .catch(error => console.log(error));
    }
  };

  return (
    <Fragment>
      { 
        isDefinedAndNotVoid(products) && products.map(product => {
            return (
                <ProductGridHomePersonalizedSingle
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
      })}
    </Fragment>
  );
};

ProductGridHomePersonalized.propTypes = {
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

const mapStateToProps = (state, ownProps) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridHomePersonalized);
