import ProductActions from "../services/ProductActions";
import { isDefined, isDefinedAndNotVoid } from "./utils";

// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = products;
  limit = 4;
  if (type && type === "new") {
    const newProducts = finalProducts.filter(single => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
      single => isDefined(single.discount) && single.discount > 0 && isDefined(single.offerEnd) && new Date(single.offerEnd) >= new Date()
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount, offerEnd = new Date()) => {
  return isDefined(discount) && discount > 0 && isDefined(offerEnd) && (new Date(offerEnd)).getTime() >= (new Date()).getTime() ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, selectedProduct, color, size) => {
  if (isDefinedAndNotVoid(cartItems)) {
    if (isDefined(color) && isDefined(size)) {
      let productInCart = cartItems.find( ({ selectedProductColor, selectedProductSize, product }) => {
          return product.id === selectedProduct.id &&
          (isDefined(selectedProductColor) ? selectedProductColor.id === color.id : true) &&
          (isDefined(selectedProductSize) ? selectedProductSize.id === size.id : true)
      });
      return isDefined(productInCart) ? productInCart.quantity : 0;
    } else {
        let productInCart = cartItems.find(single => selectedProduct.id === single.product.id);
        return isDefined(productInCart) ? productInCart.quantity : 0;
    }
  } else {
      return 0;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        product => product.category.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "tag") {
      return products.filter(
        product => product.tag.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(single => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(
            single => single.size.filter(single => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = array => {
  let individualItemArray = array.filter(function(v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = products => {
  let productCategories = [];
  products &&
    products.map(product => {
      return (
        product.category &&
        product.category.map(single => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = products => {
  let productTags = [];
  products &&
    products.map(product => {
      return (
        product.tag &&
        product.tag.map(single => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = products => {
  let productColors = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return productColors.push(single.color);
        })
      );
    });
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = products => {
  let productSizes = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return single.size.map(single => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = product => {
  let productSizes = [];
  product.variation &&
    product.variation.map(singleVariation => {
      return (
        singleVariation.size &&
        singleVariation.size.map(singleSize => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = e => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayoutById = id => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(item => {
    item.classList.remove("active");
  });
  const selection = document.getElementById(id);
  if (isDefined(selection))
    selection.classList.add("active");
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};

export const getProductsFromIds = async (cart, products) => {
  if (cart.length > 0) {
    const ids = cart.map(item => item.product.id);
    const dbProducts = await ProductActions.findProductWithIds(ids);
    const newCart = cart.map(item => {
        const dbProduct = dbProducts.find(p => p.id == item.product.id);
        return {...item, product: dbProduct}
    });
    return newCart.filter(item => isDefined(item.product) && isDefined(item.product.name));
  }
  return [];
};

// export const getProductsFromIds = (ids, products) => {
//   return ids.length <= 0 ? [] : ids.map(element => {
//       let i = products.find(product => product.id == element.product.id);
//       return {...element, product: i};
//   });
// };

export const setSecuredProducts = products => {
    return products.map(product => {
        const productObject = Object.keys(product).includes('product') ? product.product : product;
        const { saleCount, needsTraceability, department, storeAvailable, costs, suppliers, accountingId,
                lastCost, isSold, isFabricated, updatedAt, stock, ...publicVariables } = productObject;
        return Object.keys(product).includes('product') ? {...product, product: publicVariables} : publicVariables;
    });
};

export const setSecuredProduct = product => {
    // const securedProduct = Object.keys(product).includes('product') ? {id: product.product.id} : { id: product.id };
    const productObject = Object.keys(product).includes('product') ? product.product : product;
    const { saleCount, needsTraceability, department, storeAvailable, costs, suppliers, accountingId,
            lastCost, isSold, isFabricated, updatedAt, stock, ...publicVariables } = productObject;
    return publicVariables;
    // return  Object.keys(product).includes('product') ? ;
};

export const getElementsFromIds = (ids, products) => {
    return ids.map(element => {
        return products.find(product => product.id == element.id);
    });
};

export const hasEnoughStock = (product) => {
    let stockStatus = false;
    if (isDefinedAndNotVoid(product.components)) {
      stockStatus = !product.components.map(component => {
        return isDefined(component.size) && component.size.stocks[0].quantity > 0 ? true :
              isDefined(component.product.stocks[0]) && component.product.stocks[0].quantity > 0 ? true :
              false;
      }).includes(false);
    } else if ( !isDefinedAndNotVoid(product.variations) && isDefinedAndNotVoid(product.stocks) ) {
      stockStatus = product.stocks[0].quantity > 0 || product.stocks[0] > 0;
    }
    return stockStatus;
};

export const getAvailableStock = (product, variation = undefined, size = undefined) => {
    let productStock = 0;
    let smallestStock = 100;
    if (isDefined(variation) && isDefined(size)) {
        return isDefinedAndNotVoid(size.stocks) && size.stocks[0].quantity > size.stocks[0].security ? size.stocks[0].quantity - size.stocks[0].security : 0;
    } else if (isDefined(product)) {
      if (isDefinedAndNotVoid(product.components)) {
        product.components.map(component => {
            const stock = isDefined(component.size) && isDefinedAndNotVoid(component.size.stocks) ? component.size.stocks[0] : (isDefinedAndNotVoid(component.product.stocks) ? component.product.stocks[0] : 0);
            productStock = stock !== 0 && stock.security > stock.quantity ? stock.security - stock.quantity : 0;
            smallestStock = productStock < smallestStock ? productStock : smallestStock;
          });
        return smallestStock;
      } else {
          return isDefinedAndNotVoid(product.stocks) && product.stocks[0].quantity > product.stocks[0].security ? product.stocks[0].quantity - product.stocks[0].security : 0;
      }
    } else {
      return 0;
    }
};

export const hasVariationScope = variations => {
  let hasVariations = false;
  variations.map(variation => {
      if (variation.color.trim() !== "") {
          hasVariations = true; 
      }
  });
  return hasVariations;
};

export const hasSizeScope = sizes => {
  let hasSizes = false;
  sizes.map(size => {
      if (size.name.trim().length > 0) {
        hasSizes = true; 
      }
  });
  return hasSizes;
}