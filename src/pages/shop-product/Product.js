import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import LayoutSeven from "../../layouts/LayoutSeven";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import ProductsContext from "../../contexts/ProductsContext";
import { isDefined } from "../../helpers/utils";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";

const Product = ({ location, match }) => {

  const { id = "new" } = match.params;
  const { pathname } = location;
  const { platform } = useContext(AuthContext);
  const { products } = useContext(ProductsContext);
  const product = products.find(product => product.id === parseInt(id));

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
        <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
        { isDefined(product) && 
            <>
              <title>{ platform.name + " - " + product.name }</title>
              <meta property="title" content={ platform.name + " - " + product.name } />
              <meta property="og:title" content={ platform.name + " - " + product.name } />
              <meta name="description" content={ product.description } />
              <meta property="og:description" content={ product.description } />
              <meta property="image" content={ product.image.imgPath } />
              <meta property="og:image" content={ product.image.imgPath } />
              <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
            </>
        }
      </MetaTags>

      <LayoutSeven stick="stick">

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-150"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        {/* <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={ isDefined(product) ? product.fullDescription : ""}
        /> */}

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
