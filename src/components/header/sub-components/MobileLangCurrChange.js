import PropTypes from "prop-types";
import React from "react";
import { multilanguage, changeLanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { setCurrency } from "../../../redux/actions/currencyActions";

const MobileLangCurrChange = ({ currency, setCurrency, currentLanguageCode, dispatch, strings }) => {
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    setCurrency(currencyName);
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.remove("active");
  };

  return (
    <div className="mobile-menu-middle">
      <div className="lang-curr-style">
        <span className="title mb-2">{strings["choose_language"]}</span>
        <select
          value={currentLanguageCode}
          onChange={e => {
            changeLanguageTrigger(e);
            closeMobileMenu();
          }}
        >
          <option value="fn">{strings["french"]}</option>
          <option value="en">{strings["english"]}</option>
          <option value="de">{strings["germany"]}</option>
        </select>
      </div>
      {/* <div className="lang-curr-style">
        <span className="title mb-2">Choose Currency</span>
        <select
          value={currency.currencyName}
          onChange={e => {
            setCurrencyTrigger(e);
            closeMobileMenu();
          }}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </div> */}
    </div>
  );
};

MobileLangCurrChange.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrency: currencyName => {
      dispatch(setCurrency(currencyName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(MobileLangCurrChange));
