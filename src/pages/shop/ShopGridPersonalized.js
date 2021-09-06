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

const ShopGridNoSidebar = ({ location }) => {

  const [layout, setLayout] = useState("grid three-column");
  const sortType = "";
  const sortValue = "";
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const { products } = useContext(ProductsContext);

  const pageLimit = 15;
  const { pathname } = location;

  const getLayout = layout => {
    setLayout(layout);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  return (
    <Fragment>
      <MetaTags>
          <title>{ "Frais Péi, votre maraîcher en ligne - La boutique" }</title>
          <meta property="title" content={ "Frais Péi, votre maraîcher en ligne - La boutique" } />
          <meta property="og:title" content={ "Frais Péi, votre maraîcher en ligne - La boutique" } />
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
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content */}
                <ShopProductsPersonalized layout={layout} products={currentData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
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

export default connect(mapStateToProps)(ShopGridNoSidebar);
