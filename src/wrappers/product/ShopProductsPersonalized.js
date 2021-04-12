import PropTypes from "prop-types";
import React from "react";
import ProductGridPersonalized from "./ProductGridPersonalized";

const ShopProductsPersonalized = ({ products, layout }) => {
  return (
      <div className="shop-bottom-area mt-35">
          <div className={`row ${layout ? layout : ""}`}>
              <ProductGridPersonalized products={products} spaceBottomClass="mb-25" />
          </div>
      </div>
  );
};

ShopProductsPersonalized.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProductsPersonalized;
