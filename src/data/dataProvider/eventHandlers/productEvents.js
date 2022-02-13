import Roles from "../../../config/Roles";
import { isDefined } from "../../../helpers/utils";

export const updateContext = (products, setProducts, data, setData, currentUser, selectedCategory) => {
    let updatedProducts = products;
    const newData = data.map(entity => {
        updatedProducts = entity['@id'].includes('products') ? treatProduct(entity, updatedProducts, currentUser, selectedCategory) : 
                          entity['@id'].includes('prices') ? treatPrice(entity, updatedProducts, currentUser) :
                          treatStock(entity, updatedProducts);
        return {...entity, treated: true};
    });
    setProducts(updatedProducts);
    setData(newData.filter(d => !isDefined(d.treated)));
    return new Promise((resolve, reject) => resolve(false));
};

const treatProduct = (product, updatedProducts, currentUser, selectedCategory) => {
    return !isDefined(product.id) || !hasAccessToProduct(product, currentUser) ? [...updatedProducts].filter(p => p['@id'] !== product['@id']) : getUpdatedProducts(product, updatedProducts, currentUser, selectedCategory);
};

const hasAccessToProduct = (product, currentUser) => !Roles.isBasicUser(currentUser) || product.available;

const treatPrice = (price, updatedProducts, currentUser) => {
    const linkedProduct = updatedProducts.find(pdt => pdt['@id'] === price.product);
    const userGroup = linkedProduct.userGroups.find(g => g.value === currentUser.roles);
    const isPriceUpdated = isDefined(userGroup) && price.priceGroup.userGroup.find(ug => ug.id === userGroup.id) !== undefined;
    return  !isDefined(linkedProduct) || !isPriceUpdated ? updatedProducts :
            updatedProducts.map(p => p.id !== linkedProduct.id ? p : getProductWithNewPrice(linkedProduct, price));
};

const treatStock = (stock, updatedProducts) => {
    const { product, variation, size } = getProductLinkedToStock(stock, updatedProducts);
    return  !isDefined(product) ? updatedProducts :
            updatedProducts.map(p => p.id !== product.id ? p : getProductWithNewStock(product, variation, size, stock));
};

const getUpdatedProducts = (newProduct, updatedProducts, currentUser, selectedCategory) => {
    const userGroup = newProduct.userGroups.find(g => g.value === currentUser.roles);
    if (isDefined(userGroup)) {
        const {prices, ...publicVariables } = newProduct;
        const suitedProduct = {...publicVariables, price: (newProduct.prices.find(p => p.priceGroup.userGroup.find(ug => ug.id === userGroup.id) !== undefined)).amount};
        const catIds = suitedProduct.categories.map(c => c.id);
        const index = updatedProducts.findIndex(o => o.id === suitedProduct.id);
        return  index !== -1 ? updatedProducts.map(o => o.id !== suitedProduct.id ? o : suitedProduct) : 
                catIds.includes(parseInt(selectedCategory)) ? [...updatedProducts, suitedProduct] : updatedProducts;
    }
    return updatedProducts;
};

const getProductWithNewPrice = (product, price) => {
    if (!isDefined(price.id)) {
        return {...product, prices: product.prices.filter(p => p['@id'] === price['@id'])};
    } else {
        return {...product, price: price.amount};
    }
};

const getProductWithNewStock = (product, variation, size, stock) => {
    if (isDefined(size))
        return {
            ...product, 
            variations: product.variations.map(v => {
                return v['@id'] !== variation['@id'] ? v : 
                        {...variation, sizes: variation.sizes.map(s => s['@id'] !== size['@id'] ? s : {...size, stocks: s.stocks.map(st => st['@id'] === stock['@id'] ? stock : st)})}
            })
        };
    else
        return {...product, stocks: product.stocks.map(st => st['@id'] === stock['@id'] ? stock : st)};
};

const getProductLinkedToStock = (stock, products) => {
    const entities = products.map(pdt => isStockMatching(stock, pdt)).filter(obj => isDefined(obj));
    return entities.length > 0 ? entities[0] : {product: null, variation: null, size: null};

};

const isStockMatching = (stock, product) => {
    // if (isDefined(product.stock) && product.stock['@id'] === stock['@id'])
    if (isDefined(product.stocks) && product.stocks.find(s => s['@id'] === stock['@id']) !== undefined)
        return { product, variation: null, size: null }
    else if (isDefined(product.variations)) {
        const variation = product.variations.find(v => v.sizes.find(s => s.stocks.find(st => st['@id'] === stock['@id']) !== undefined));
        if (isDefined(variation)) {
            const size = variation.sizes.find(s => s.stocks.find(st => st['@id'] === stock['@id']) !== undefined);
            return {product, variation, size};
        }
    }
    return null;
};