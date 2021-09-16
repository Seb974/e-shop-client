import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import AuthContext from "../../contexts/AuthContext";
import Identification from "../identification/Identification";
import AuthActions from "../../services/AuthActions";
import { multilanguage } from "redux-multilanguage";
import * as icons from "react-bootstrap-icons";
import ReactCountryFlag from "react-country-flag";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import MenuCatalog from "./sub-components/MenuCatalog";

const UseOutsideAlerter = (ref, handler) => {
  useEffect(() => {
      const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target))
              handler();
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);
};

const IconGroup = ({ currency, cartData, wishlistData, compareData, deleteFromCart, iconWhiteClass, strings }) => {

  const { isAuthenticated, setIsAuthenticated, setCurrentUser, selectedCatalog, catalogs } = useContext(AuthContext);
  const iconGroupContainer = useRef(null);
  const [active, setActive] = useState("");
  const clearActive = () => setActive("");
  UseOutsideAlerter(iconGroupContainer, clearActive);

  const handleClick = ({ currentTarget }) => {
      const newActive = currentTarget.name !== active ? currentTarget.name : "";
      setActive(newActive);
  };

  const handleLogout = () => {
    AuthActions.logout()
               .then(response => {
                   setIsAuthenticated(false);
                   setCurrentUser(AuthActions.getCurrentUser());
               });
  }

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div ref={ iconGroupContainer } className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}>
      { isDefinedAndNotVoid(catalogs) && catalogs.filter(c => c.isActive).length > 1 && 
          <div className="same-style cart-wrap d-none d-lg-block">
            <button name="catalog" className="icon-cart" onClick={ handleClick }>
            <ReactCountryFlag countryCode={isDefined(selectedCatalog) ? selectedCatalog.code : "RE"} style={{fontSize: '1.5em', lineHeight: '1.5em', marginLeft: '1em', verticalAlign: 'top', marginTop: '-12px' }}/>
            </button>
            <MenuCatalog active={ active === "catalog" ? "active" : "" } setActive={ setActive } />
          </div>
      }
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <icons.Shuffle />
          <span className="count-style">{compareData && compareData.length ? compareData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <icons.SuitHeart />
          <span className="count-style">{wishlistData && wishlistData.length ? wishlistData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button name="cart" className="icon-cart" onClick={ handleClick }>
          <icons.Bag/>
          <span className="count-style">{cartData && cartData.length ? cartData.length : 0}</span>
        </button>
        <MenuCart cartData={cartData} currency={currency} deleteFromCart={deleteFromCart} active={ active === "cart" ? "active" : "" } />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag fa-sm" />
          <span className="count-style">{cartData && cartData.length ? cartData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button className="mobile-aside-button" onClick={ triggerMobileMenu }>
          <i className="pe-7s-menu fa-sm" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(IconGroup));
