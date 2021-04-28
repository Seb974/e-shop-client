import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";

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

const IconGroup = ({ currency, cartData, wishlistData, compareData, deleteFromCart, iconWhiteClass }) => {

  const iconGroupContainer = useRef(null);
  const [active, setActive] = useState("");
  const clearActive = () => setActive("");
  UseOutsideAlerter(iconGroupContainer, clearActive);

  const handleClick = ({ currentTarget }) => {
      const newActive = currentTarget.name !== active ? currentTarget.name : "";
      setActive(newActive);
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div ref={ iconGroupContainer } className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}>
      <div className="same-style header-search d-none d-lg-block">
        <button name="search" className="search-active" onClick={ handleClick }>
          {/* <i className="pe-7s-search" /> */}
          <i className= "fas fa-search"></i>
        </button>
        <div className={"search-content " + (active === "search" ? "active" : "")}>
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              {/* <i className="pe-7s-search" /> */}
              <i className= "fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button name="account" className="account-setting-active" onClick={ handleClick }>
          {/* <i className="pe-7s-user-female" /> */}
          <i className= "fas fa-user-circle"></i>
        </button>
        <div className={"account-dropdown " + (active === "account" ? "active" : "")}>
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>Register</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>my account</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          {/* <i className="pe-7s-shuffle" /> */}
          <i className= "fas fa-random"></i>
          <span className="count-style">{compareData && compareData.length ? compareData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          {/* <i className="pe-7s-like" /> */}
          <i className="fas fa-heart text-danger"/>   
          <span className="count-style">{wishlistData && wishlistData.length ? wishlistData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button name="cart" className="icon-cart" onClick={ handleClick }>
          {/* <i className="pe-7s-shopbag" /> */}
          <i className= "fas fa-shopping-basket"/>
          <span className="count-style">{cartData && cartData.length ? cartData.length : 0}</span>
        </button>
        {/* menu cart */}
        <MenuCart cartData={cartData} currency={currency} deleteFromCart={deleteFromCart} active={ active === "cart" ? "active" : "" } />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartData && cartData.length ? cartData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button className="mobile-aside-button" onClick={ triggerMobileMenu }>
          <i className="pe-7s-menu" />
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

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
