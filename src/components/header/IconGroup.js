import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
<<<<<<< HEAD
import AuthContext from "../../contexts/AuthContext";
import Identification from "../identification/Identification";
import AuthActions from "../../services/AuthActions";
import { multilanguage } from "redux-multilanguage";
=======
import * as icons from "react-bootstrap-icons";
>>>>>>> feature/custom-layout

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

  const { isAuthenticated, setIsAuthenticated, setCurrentUser } = useContext(AuthContext);
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
<<<<<<< HEAD
      {/* <div className="same-style header-search d-none d-lg-block">
        <button name="search" className="search-active" onClick={ handleClick }>
          <i className= "fas fa-search"></i>
        </button>
        <div className={"search-content " + (active === "search" ? "active" : "")}>
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className= "fas fa-search"></i>
            </button>
          </form>
        </div>
      </div> */}
          <div className="same-style account-setting d-none d-lg-block">
            <button name="account" className="account-setting-active" onClick={ handleClick }>
              <i className= "fas fa-user-circle pb-2" style={{fontSize: '1.1em'}}></i>
            </button>
            <div className={"account-dropdown " + (active === "account" ? "active" : "")}>
              <ul>
                { isAuthenticated &&
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/my-account"}>{ strings["my_account"] }</Link>
                  </li>
                }
                <li>
                    { !isAuthenticated ? <Identification name={ strings["login"] }/> : 
                      <a className="nav-link" href="#" onClick={ handleLogout }>{strings["logout"]}</a>
                    }
                </li>
              </ul>
            </div>
          </div>


=======
>>>>>>> feature/custom-layout
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          {/* <i className="pe-7s-shuffle" /> */}
          <icons.Shuffle />
          {/* <i className= "fas fa-random fa-sm"></i> */}
          <span className="count-style">{compareData && compareData.length ? compareData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          {/* <i className="pe-7s-like" /> */}
          {/* <i className="fas fa-heart text-danger fa-sm"/>   */}
          <icons.SuitHeart />
          <span className="count-style">{wishlistData && wishlistData.length ? wishlistData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button name="cart" className="icon-cart" onClick={ handleClick }>
          {/* <i className="pe-7s-shopbag" /> */}
          {/* <i className= "fas fa-shopping-basket fa-sm"/> */}
          <icons.Bag/>
          <span className="count-style">{cartData && cartData.length ? cartData.length : 0}</span>
        </button>
        {/* menu cart */}
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
