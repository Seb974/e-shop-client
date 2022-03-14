import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useContext } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { connect } from "react-redux";
import LayoutSeven from "../../layouts/LayoutSeven";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProductsPersonalized from "../../wrappers/product/ShopProductsPersonalized";
import ProductsContext from "../../contexts/ProductsContext";
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import { isDefined } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

import ProductActions from "../../services/ProductActions";

const ShopGridNoSidebar = ({ location, strings }) => {

  const [layout, setLayout] = useState("grid three-column");
  const sortType = "";
  const sortValue = "";
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const { platform, selectedCatalog } = useContext(AuthContext);
  const { products, navSearch, selectedCategory, setProducts } = useContext(ProductsContext);
  const [totalItems, setTotalItems] = useState(0);

  const pageLimit = 12;
  const { pathname } = location;

  const getLayout = layout => {
    setLayout(layout);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => getProducts(), []);
  useEffect(() => getProducts(currentPage), [currentPage]);

  useEffect(() => setProductsToDisplay(), [products, offset, sortType, sortValue, filterSortType, filterSortValue]);

  useEffect(() => {
      setOffset(0);
      setCurrentPage(1);
      searchWord();
  }, [navSearch]);

  useEffect(() => {
      setOffset(0);
      setCurrentPage(1);
      getProducts();
  }, [selectedCategory, selectedCatalog]);

  const setProductsToDisplay = () => {
    if (isDefined(products) && isDefined(selectedCatalog)) {
        setCurrentData(products);
    }
  };

  const searchWord = () => {
      if (isDefined(navSearch) && navSearch.length > 0) {
          ProductActions
              .findSearchedProducts(selectedCatalog.id, navSearch)
              .then(response => {
                setProducts(response['hydra:member']);
                setTotalItems(response['hydra:totalItems']);
              });
      } else {
          setOffset(0);
          setCurrentPage(1);
          getProducts();
      }
  };

  const getProducts = (page = 1) => {
    if (isDefined(selectedCatalog)) {
        ProductActions
            .findPerCategory(selectedCatalog.id, selectedCategory, page, pageLimit)
            .then(response => {
              setProducts(response['hydra:member']);
              setTotalItems(response['hydra:totalItems']);
            })
    }
  };

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
          <title>{ platform.name + " - La boutique" }</title>
          <meta property="title" content={ platform.name + " - La boutique" } />
          <meta property="og:title" content={ platform.name + " - La boutique" } />
          <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
          <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
      </MetaTags>

      <LayoutSeven stick="stick">

        <div className="shop-area pt-95 pb-100 mt-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={totalItems}
                  sortedProductCount={currentData.length}
                  location={ location }
                />

                {/* shop page content */}
                <ShopProductsPersonalized layout={ layout } products={ currentData } />

                { currentData.find(p => isDefined(p.requireLegalAge) && p.requireLegalAge === true) !== undefined &&
                    <p className="text-center my-4"><i className="fas fa-ban mr-2 text-danger"></i>{ strings["require_legal_age"] }</p>
                }

                {/* shop product pagination */}
                { totalItems > pageLimit && 
                  <div className="pro-pagination-style text-center mt-30">
                    <Paginator
                      totalRecords={ totalItems }
                      pageLimit={ pageLimit }
                      pageNeighbours={ 3 }
                      setOffset={ setOffset }
                      currentPage={ currentPage }
                      setCurrentPage={ setCurrentPage }
                      pageContainerClass="mb-0 mt-0"
                      pagePrevText="«"
                      pageNextText="»"
                    />
                  </div>
                 }
              </div>
            </div>
          </div>
        </div>
      </LayoutSeven>
    </Fragment>
  );
};

ShopGridNoSidebar.propTypes = { location: PropTypes.object };

const mapStateToProps = state => {
  return {
    // products: state.productData.products
  };
};

export default connect(mapStateToProps)(multilanguage(ShopGridNoSidebar));
