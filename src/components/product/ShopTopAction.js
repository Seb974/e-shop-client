import PropTypes from "prop-types";
import '../../assets/css/search-input.css';
import React, { useContext } from "react";
import { setActiveLayout } from "../../helpers/product";
import ProductsContext from "../../contexts/ProductsContext";
import { isDefined } from "../../helpers/utils";

const ShopTopAction = ({getLayout, getFilterSortParams, productCount, sortedProductCount}) => {

  const { categories, navSearch, setNavSearch, selectedCategory, setSelectedCategory } = useContext(ProductsContext);

  const handleSearchChange = ({ currentTarget }) => setNavSearch(currentTarget.value);

  const handleClear = e => {
      e.preventDefault();
      setNavSearch("");
  };

  const handleCategoryChange = ({ currentTarget }) => {
    setSelectedCategory(currentTarget.value);
  };
  
  return (
    // shop-top-bar
    <div className="row shop-top-bar mb-35"> 
      <div className="col-md-9">
          <div className="row select-shoing-wrap d-flex align-items-center">
            <div className="col-md-6 shop-select pb-2">
              {/* <select className="form-control" onChange={e => getFilterSortParams("filterSort", e.target.value)}>
                <option value="default">Default</option>
                <option value="priceHighToLow">Price - High to Low</option>
                <option value="priceLowToHigh">Price - Low to High</option>
              </select> */}
              <select className="form-control" value={ selectedCategory } onChange={ handleCategoryChange }>
                <option value={-1}>Toutes</option>
                { categories.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>) }
              </select>
            </div>
            {/* <p>
              Showing {sortedProductCount} of {productCount} result
            </p> */}
            <div className="col-md-6 mb-3 d-flex flex-row">
                <i className="fas fa-search mt-3 mr-2" style={{ color: "#333"}}></i>
                <input id="search-input" className="mb-1" value={ navSearch } placeholder={" rechercher..."} onChange={ handleSearchChange }/>
                { isDefined(navSearch) && navSearch.length > 0 &&
                  <a href="#" onClick={ handleClear }><i className="fas fa-times-circle mt-3" style={{ color: "#333"}}></i></a>
                }
            </div>
          </div>
      </div>

      <div className="col-md-2 shop-tab text-right mr-1">
        <button onClick={e => {
            getLayout("grid two-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button onClick={e => {
            getLayout("grid three-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button onClick={e => {
            getLayout("list");
            setActiveLayout(e);
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
