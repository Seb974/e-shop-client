import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { isDefined, isDefinedAndNotVoid } from "../../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../../contexts/AuthContext";
import ReactCountryFlag from "react-country-flag";

const MenuCatalog = ({ active = "", setActive, strings }) => {

  const { addToast } = useToasts();
  const { catalogs, selectedCatalog, setSelectedCatalog } = useContext(AuthContext);

  const handleChangeCatalog = (e, id) => {
    const newCatalog = catalogs.find(c => c.id === parseInt(id));
    if (isDefined(newCatalog) && newCatalog.id !== selectedCatalog.id) {
        setSelectedCatalog(newCatalog);
        addToast(<>{"Vous avez sélectionné une livraison sur la "} <strong>{ newCatalog.name }</strong><ReactCountryFlag countryCode={ newCatalog.code } style={{ verticalAlign: 'middle', marginLeft: '5px' }}/> </> , { appearance: "info", autoDismiss: true, autoDismissTimeout: 6000 });
    }
    setActive("");
  }

  return (
    <div className={"shopping-cart-content " + active} style={{ width: '240px', paddingLeft: '12px', paddingRight: '5px' }}>  
      { isDefinedAndNotVoid(catalogs) && catalogs.filter(c => c.isActive).length > 0 &&
        <Fragment>
          <ul style={{ marginLeft: '0px' }}>
            { catalogs.filter(c => c.isActive).map((single, key) => {
                return (
                  <li className="single-shopping-cart" key={ key } style={{ borderBottom: 'none', marginBottom: '0', paddingBottom: '5px' }}>   
                    <div className="shopping-cart-img" style={{ flex: 'none' }}>
                      <Link to="#" onClick={ e => handleChangeCatalog(e, single.id) }>
                        <ReactCountryFlag countryCode={ single.code } style={{fontSize: '2em', lineHeight: '2em', verticalAlign: 'top', marginTop: '-17px' }}/>
                      </Link>
                    </div>
                    <div className="shopping-cart-title" style={{ width: '180px'}}>
                      <h4 style={{ marginRight: '0px', marginLeft: '8px'}}>
                        <Link to="#" onClick={ e => handleChangeCatalog(e, single.id) }>
                          {" "}{strings["destination"] + " " + single.name }{" "}
                        </Link>
                      </h4>
                    </div>
                  </li>
                );
            })}
          </ul>
        </Fragment>
      }
    </div>
  );
};

export default multilanguage(MenuCatalog);