import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useContext } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import LayoutSeven from "../../layouts/LayoutSeven";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProductsPersonalized from "../../wrappers/product/ShopProductsPersonalized";
import ProductsContext from "../../contexts/ProductsContext";
import api from "../../config/api";
import { multilanguage } from "redux-multilanguage";
import { setActiveLayoutById } from "../../helpers/product";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import AuthContext from "../../contexts/AuthContext";
import Paginator from "../../components/paginator/paginator";
import ProductActions from "../../services/ProductActions";

const ShopGridNoSidebar = ({ location, strings }) => {

  const [layout, setLayout] = useState("grid three-column");
  const sortType = "";
  const sortValue = "";
  const [loading, setLoading] = useState(false);
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [loadedCategory, setLoadedCategory] = useState(null);
  const { platform, selectedCatalog } = useContext(AuthContext);
  const { products, navSearch, selectedCategory, categories, setProducts, setSelectedCategory } = useContext(ProductsContext);
  const [totalItems, setTotalItems] = useState(0);

  const pageLimit = 12;

  const getLayout = layout => setLayout(layout);

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    if (location.search.length > 0) {
      const urlSearchParams = new URLSearchParams(location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      if (isDefinedAndNotVoid(params['category'])) {
          const newSelection = categories.find(c => c.id === parseInt(params['category']));
          if (isDefined(newSelection))
              setSelectedCategory(newSelection.id);
      }
      window.history.replaceState({}, document.title, "#" + location.pathname);
    } else {
      setSelectedCategory(-1);
    }
  }, []);

  useEffect(() => setActiveLayoutById(layout), [platform]);

  useEffect(() => setProductsToDisplay(), [products]);

  useEffect(() => updateSearchedProducts(), [navSearch]);

  useEffect(() => updateProducts(), [selectedCategory, selectedCatalog]);

  const setProductsToDisplay = () => {
    if (isDefined(products) && isDefined(selectedCatalog) && loadedCategory === selectedCategory)
        setCurrentData(products);
  };

  const searchWord = async () => {
      if (isDefined(navSearch) && navSearch.length > 0) {
          setLoading(true);
          return await ProductActions
              .findSearchedProducts(selectedCatalog.id, navSearch)
              .catch(error => setLoading(false));
      } 
      else {
        updateProducts();
        setLoading(false);
      }
  };

  const getProducts = async (page = 1) => {
    if (page >= 1 && isDefined(selectedCatalog) && isDefined(selectedCategory)) {
        setLoading(true);
        return await ProductActions
            .findPerCategory(selectedCatalog.id, selectedCategory, page, pageLimit)
            .catch(error => setLoading(false));
    }
    return null;
  };

  const onPageChange = (newPage) => updateProducts(newPage);

  const uploadDatas = newData => {
    if (isDefined(newData)) {
      setLoadedCategory(selectedCategory);
      setProducts(newData['hydra:member']);
      setTotalItems(newData['hydra:totalItems']);
      setLoading(false);
    }
  };

  const updateProducts = async (page = 1) => {
    setCurrentPage(page);
    const newData = await getProducts(page);
    uploadDatas(newData);
  };

  const updateSearchedProducts = async () => {
      setCurrentPage(1);
      const newData = isDefined(navSearch) && navSearch.length > 0 ? await searchWord() : await getProducts();
      uploadDatas(newData);
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
                  layout={layout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={totalItems}
                  sortedProductCount={currentData.length}
                  location={ location }
                />

                {/* shop page content */}
                <ShopProductsPersonalized layout={ layout } products={ currentData } loading={ loading }/>

                { !loading && currentData.find(p => isDefined(p.requireLegalAge) && p.requireLegalAge === true) !== undefined &&
                    <p className="text-center my-4"><i className="fas fa-ban mr-2 text-danger"></i>{ strings["require_legal_age"] }</p>
                }

                {/* shop product pagination */}
                { !loading && totalItems > pageLimit && 
                  <div className="pro-pagination-style text-center mt-30">
                    <Paginator
                      totalRecords={ totalItems }
                      pageLimit={ pageLimit }
                      pageNeighbours={ 3 }
                      currentPage={ currentPage }
                      setCurrentPage={ onPageChange }
                    />
                    <Paginator />
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
  return {};
};

export default connect(mapStateToProps)(multilanguage(ShopGridNoSidebar));
