import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutSeven from "../../layouts/LayoutSeven";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import ProductsContext from "../../contexts/ProductsContext";
import { isDefined } from "../../helpers/utils";

const Product = ({ location, match }) => {      // product: storedProduct,

  const { id = "new" } = match.params;
  const { pathname } = location;
  const { products } = useContext(ProductsContext);
  const product = products.find(product => product.id === parseInt(id));

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Product Page</title>
        <meta
          name="description"
          content="Product page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop Product</BreadcrumbsItem> */}

      <LayoutSeven stick="stick">
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-150"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={ isDefined(product) ? product.fullDescription : ""}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={isDefined(product) ? product.categories[0].name : ""}
        />
      </LayoutSeven>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  // const itemId = ownProps.match.params.id;
  // return {
  //   product: state.productData.products.filter(
  //     single => single.product.id === itemId
  //   )[0]
  // };
  return {};
};

export default connect(mapStateToProps)(Product);
