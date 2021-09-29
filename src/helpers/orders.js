import { isDefined } from "./utils";

export const getContainerTotalHT = (packages, catalog) => {
    if (isDefined(packages)) {
        return packages.reduce((sum, current) => {
            const { quantity, container } = current;
            const price = getContainerPrice(container, catalog);
            return sum += (quantity * price);
        }, 0);
    }
    return 0;
};

export const getContainerTotalTTC = (packages, catalog) => {
    if (isDefined(packages)) {
        return packages.reduce((sum, current) => {
            const { quantity, container } = current;
            const price = getContainerPrice(container, catalog);
            const tax = getContainerTax(container, catalog);
            return sum += (quantity * price * (1 + tax));
        }, 0);
    }
    return 0;
};

export const getContainerTotalTax = (packages, catalog) => {
    if (isDefined(packages)) {
        const ht = getContainerTotalHT(packages, catalog);
        const ttc = getContainerTotalTTC(packages, catalog);

        return Math.round((ttc - ht) * 100) / 100;
    }
    return 0;
};

export const getContainerPrice = (container, catalog) => {
    const catalogPrice = container.catalogPrices.find(c => c.catalog.id === catalog.id);
    return isDefined(catalogPrice) ? catalogPrice.amount : 0;
};

export const getContainerTax = (container, catalog) => {
    const catalogTax = container.tax.catalogTaxes.find(c => c.catalog.id === catalog.id);
    return isDefined(catalogTax) ? catalogTax.percent : 0;
};

export const getProductsTotalTax = (order, catalog) => {
    const { user, paymentId } = order;
    return order.items.reduce((sum, current) => {
        const { product, price, orderedQty, preparedQty } = current;
        const quantity = !isDefined(user) || isDefined(paymentId) ? orderedQty : preparedQty;
        const tax = getProductTax(product, catalog);
        return sum += (quantity * price * tax);
    }, 0);
    
};

export const getTotalHT = order => {
    const { packages, catalog, totalHT } = order
    const containersTotal = getContainerTotalHT(packages, catalog);
    return Math.round((totalHT + containersTotal) * 100) / 100;
};

export const getTotalTTC = order => {
    const { packages, catalog, totalHT } = order
    const containersTotal = getContainerTotalTTC(packages, catalog);
    const productsTax = getProductsTotalTax(order, catalog);
    return Math.round((totalHT + productsTax + containersTotal) * 100) / 100;
};

export const getTotalTax = order => {
    const { packages, catalog } = order;
    const productsTotal = getProductsTotalTax(order, catalog);
    const containersTotal = getContainerTotalTax(packages, catalog);
    return Math.round((productsTotal + containersTotal) * 100) / 100;
};

const getProductTax = (product, catalog) => {
    const catalogTax = product.tax.catalogTaxes.find(c => c.catalog.id === catalog.id);
    return isDefined(catalogTax) ? catalogTax.percent : 0;
};