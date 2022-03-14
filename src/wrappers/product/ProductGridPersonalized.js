import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import { multilanguage } from "redux-multilanguage";
import ProductGridPersonalizedSingle from "../../components/product/ProductGridPersonalizedSingle";
import { Col, Container, Row } from "react-bootstrap";

const ProductGridPersonalized = ({ products, currency, addToCart, addToWishlist, addToCompare, cartItems, wishlistItems, compareItems, sliderClassName, spaceBottomClass, strings, loading}) => {

  return (
    <Fragment>

      { loading ?
        <Container>
          <Row>
            <Col className="text-center mx-5 my-4">
                <Spinner animation="border" variant="danger"/>
            </Col>
          </Row>
        </Container>
        : products.length > 0 ? products.map(product => {
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
              <p>{ strings["no_products"] }</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(ProductGridPersonalized));
