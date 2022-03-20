import PropTypes from "prop-types";
import '../../assets/css/search-input.css';
import React, { useContext, useEffect, useState } from "react";
import { setActiveLayoutById } from "../../helpers/product";
import ProductsContext from "../../contexts/ProductsContext";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

const ShopTopAction = ({getLayout, getFilterSortParams, productCount, sortedProductCount, location}) => {

  const [search, setSearch] = useState("");
  const { selectedCatalog } = useContext(AuthContext);
  const { categories, navSearch, setNavSearch, selectedCategory, setSelectedCategory } = useContext(ProductsContext);

  // useEffect(() => {
  //   if (location.search.length > 0) {
  //     const urlSearchParams = new URLSearchParams(location.search);
  //     const params = Object.fromEntries(urlSearchParams.entries());
  //     if (isDefinedAndNotVoid(params['category'])) {
  //         const newSelection = categories.find(c => c.id === parseInt(params['category']));
  //         if (isDefined(newSelection))
  //             setSelectedCategory(newSelection.id);
  //     }
  //     window.history.replaceState({}, document.title, "#" + location.pathname);
  //   }
  // }, []);

  const handleSearchChange = ({ currentTarget }) => setSearch(currentTarget.value);
  const handleCategoryChange = ({ currentTarget }) => setSelectedCategory(currentTarget.value);
  
  const handleSearch = e => {
      e.preventDefault();
      setNavSearch(search);
  };
  
  const handleClear = e => {
      e.preventDefault();
      setSearch("");
      setNavSearch("");
  };

  return (
    <div className="row shop-top-bar mb-35"> 
      <div className="col-md-9">
          <div className="row select-shoing-wrap d-flex align-items-center">
            <div className="col-md-6 shop-select pb-2">
              <select className="form-control" value={ selectedCategory } onChange={ handleCategoryChange }>
                <option value={-1}>Toutes</option>
                { categories.filter(c => isDefinedAndNotVoid(c.catalogs) ? c.catalogs.find(cat => cat.id === (isDefined(selectedCatalog) ? selectedCatalog.id : cat.id)) !== undefined : false).map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>) }
              </select>
            </div>
            <div className="col-md-6 mb-3 d-flex flex-row">
                <input id="search-input" className="mb-1" value={ search } placeholder={" rechercher..."} onChange={ handleSearchChange }/>
                { isDefined(navSearch) && navSearch.length > 0 ?
                  <a href="#" onClick={ handleClear }><i className="fas fa-times-circle mt-3" style={{ color: search.length <= 0 ? "#333" : "#ff5722" }}></i></a>  :
                  <a href="#" onClick={ handleSearch }><i className="fas fa-search mt-3 mr-2" style={{ color: search.length <= 0 ? "#333" : "#ff5722" }}></i></a>
                }
            </div>
          </div>
      </div>

      <div className="col-md-2 shop-tab text-right mr-1">
        <button id="grid three-column" onClick={({currentTarget}) => {
            getLayout(currentTarget.id);
            setActiveLayoutById(currentTarget.id);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button id="grid two-column" onClick={({currentTarget}) => {
            getLayout(currentTarget.id);
            setActiveLayoutById(currentTarget.id);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button id="grid column-list" onClick={({currentTarget}) => {
            getLayout("list");
            setActiveLayoutById(currentTarget.id);
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopAction;
