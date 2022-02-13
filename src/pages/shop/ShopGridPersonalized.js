import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useContext } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
import LayoutSeven from "../../layouts/LayoutSeven";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProductsPersonalized from "../../wrappers/product/ShopProductsPersonalized";
import ProductsContext from "../../contexts/ProductsContext";
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";

import ProductActions from "../../services/ProductActions";

const ShopGridNoSidebar = ({ location, match, strings }) => {

  const [layout, setLayout] = useState("grid three-column");
  const sortType = "";
  const sortValue = "";
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  // const [sortedProducts, setSortedProducts] = useState([]);
  const { platform, selectedCatalog } = useContext(AuthContext);
  const { products, navSearch, selectedCategory, setProducts } = useContext(ProductsContext);
  // const [displayedProducts, setDisplayedProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const pageLimit = 3;
  const { pathname } = location;

  const getLayout = layout => {
    setLayout(layout);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  // useEffect(() => setProductsToDisplay(), []);
  useEffect(() => getProducts(), []);
  useEffect(() => getProducts(currentPage), [currentPage]);

  // useEffect(() => console.log(selectedCategory), [selectedCategory]);
  // useEffect(() => console.log(totalItems), [totalItems]);
  
  useEffect(() => setProductsToDisplay(), [products, offset, sortType, sortValue, filterSortType, filterSortValue]);    // navSearch, selectedCategory, selectedCatalog,

  useEffect(() => {
      setOffset(0);
      setCurrentPage(1);
      searchWord();
  }, [navSearch]);

  useEffect(() => {
      setOffset(0);
      setCurrentPage(1);
      getProducts();
  }, [selectedCategory, selectedCatalog]);    // navSearch, 

  const setProductsToDisplay = () => {
    if (isDefined(products) && isDefined(selectedCatalog)) {
        // setDisplayedProducts(products);
        setCurrentData(products);
        // setCurrentData(products.slice(offset, offset + pageLimit));
    }

      // if (isDefinedAndNotVoid(products) && isDefined(selectedCatalog)) {
      //     let sortedProducts = getSortedProducts(products, sortType, sortValue);
      //     const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
      //     sortedProducts = filterSortedProducts;
      //     setSortedProducts(sortedProducts);

      //     let productsToDisplay = sortedProducts.filter(p => p.catalogs.find(c => c.id === selectedCatalog.id));
      //     if (isDefined(navSearch) && navSearch.length > 0)
      //         productsToDisplay = products.filter(p => p.catalogs.find(c => c.id === selectedCatalog.id))
      //                                     .filter(product => product.name.toUpperCase().includes(navSearch.toUpperCase()));
      //     else if (parseInt(selectedCategory) !== -1)
      //         productsToDisplay = products.filter(p => p.catalogs.find(c => c.id === selectedCatalog.id))
      //                                     .filter(product => product.categories.find(category => category.id === parseInt(selectedCategory)) !== undefined);
      //     setDisplayedProducts(productsToDisplay);
      //     setCurrentData(productsToDisplay.slice(offset, offset + pageLimit));
      // }
  };

  const searchWord = () => {
      if (isDefined(navSearch) && navSearch.length > 0) {
          ProductActions
              .findSearchedProducts(selectedCatalog.id, navSearch)
              .then(response => setProducts(response));
      } else {
          setOffset(0);
          setCurrentPage(1);
          getProducts();    //-1
      }
  };

  const getProducts = (page = 1) => {
    if (isDefined(selectedCatalog)) {
        ProductActions
            .findPerCategory(selectedCatalog.id, selectedCategory, page, pageLimit)
            .then(response => {
              const sortedProducts = parseInt(selectedCategory) !== -1 ? 
                  response['hydra:member'].sort((a, b) => (a.name > b.name) ? 1 : -1) : 
                  response['hydra:member'].sort(() => Math.random() - 0.5);
              setProducts(sortedProducts);
              console.log(sortedProducts);
              setTotalItems(response['hydra:totalItems']);
            })
    }
  };

  // const onPageChange = (page) => {
  //     setCurrentPage(page);
  // }

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
                  // productCount={products.length}
                  productCount={totalItems}
                  sortedProductCount={currentData.length}
                  location={ location }
                />

                {/* shop page content */}
                <ShopProductsPersonalized layout={layout} products={currentData} />

                { currentData.find(p => isDefined(p.requireLegalAge) && p.requireLegalAge === true) !== undefined &&
                    <p className="text-center my-4"><i className="fas fa-ban mr-2 text-danger"></i>{ strings["require_legal_age"] }</p>
                }

                {/* shop product pagination */}
                { 
                // displayedProducts.length > 
                totalItems > pageLimit && 
                  <div className="pro-pagination-style text-center mt-30">
                    <Paginator
                      // totalRecords={sortedProducts.length}
                      totalRecords={ totalItems }
                      pageLimit={ pageLimit }
                      pageNeighbours={ 3 }
                      setOffset={ setOffset }
                      currentPage={ currentPage }
                      setCurrentPage={ setCurrentPage }
                      // setCurrentPage={ page => onPageChange(page, selectedCategory) }
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

ShopGridNoSidebar.propTypes = {
  location: PropTypes.object,
  // products: PropTypes.array
};

const mapStateToProps = state => {
  return {
    // products: state.productData.products
  };
};

export default connect(mapStateToProps)(multilanguage(ShopGridNoSidebar));
