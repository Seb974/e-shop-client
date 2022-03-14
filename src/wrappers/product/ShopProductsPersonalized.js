import PropTypes from "prop-types";
import React from "react";
import ProductGridPersonalized from "./ProductGridPersonalized";

const ShopProductsPersonalized = ({ products, layout, loading }) => {
  return (
      <div className="shop-bottom-area mt-35">
          <div className={`row ${layout ? layout : ""}`}>
              <ProductGridPersonalized products={products} loading={loading} spaceBottomClass="mb-25" />
          </div>
      </div>
  );
};

ShopProductsPersonalized.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProductsPersonalized;
