// import { getTax } from './taxDefiner';
import { isDefined, isDefinedAndNotVoid } from './utils';

const getOrderWeight = (items) => {
    let totalWeight = 0.0;
    items.forEach(({ product, quantity }) => {
        if (isDefined(product) && !product.isMixed) {
            const { unit, weight } = product;
            let itemWeight = unit === "Kg" || !isDefined(weight) ? 1 : weight;
            totalWeight += (quantity * itemWeight);
        }
    });
    return totalWeight;
}

const getPackages = (items, containers) => definePackages(items, containers);

// async function getInitialPackages(items) {
//     api.get('/api/containers', { headers: {'Content-type': 'application/json'} })
//          .then(res => definePackages(items, res.data['hydra:member'].filter(container => container.isEnabled)));
// }

const definePackages = (items, containers) => {
    let packages = [];
    if (isDefinedAndNotVoid(containers)) {
        let rest = getOrderWeight(items);
        let minContainer = getSmallestContainer(containers);
        while (rest >= Math.round((minContainer.max - minContainer.tare) * 100) / 100) {
            let container = getBiggestContainer(rest, containers);
            const { id, max, tare } = container;
            let quantity = Math.floor(rest / (max - tare)) > 0 ? Math.floor(rest / (max - tare)) : 1;
            let index = packages.findIndex(_package => _package.container.id === id);
            if (index !== -1)
                packages[index].quantity += quantity;
            else
                packages = [...packages, { container, quantity }];
            rest = rest - quantity * (max - tare) > 0 ? rest - quantity * (max - tare) : 0;
        };
        packages = rest > 0 ? [...packages, { container: minContainer, quantity: 1}] : packages;
    }
    return packages;
}

const getAvailableWeight = (totalWeight, packages) => {
    if (isDefinedAndNotVoid(packages)) {
        let totalCapacity = packages.reduce((accumulator, _package) => {
            const { quantity, container } = _package;
            return accumulator + (quantity * (container.max - container.tare))
        }, 0);
        return Math.round( (totalCapacity - totalWeight) * 100, 2) / 100;
    }
    return 0;
}

const getTotalCost = (packages, country) => {
    if (isDefinedAndNotVoid(packages)) {
        return packages.reduce((accumulator, _package) => {
            const { quantity, container } = _package;
            const catalogPrice = container.catalogPrices.find(catalogPrice => catalogPrice.catalog.code === country);
            return accumulator + (quantity * catalogPrice.amount)
        }, 0)
    }
    return 0;
}

const getBiggestContainer = (weight, containers) => {
    containers.sort((a, b) => (a.max > b.max) ? 1 : -1);
    let container = containers[containers.length - 1];
    for (let i = 0; i < containers.length - 1; i++) {
        if ( (weight <= containers[i].max - containers[i].tare) || ( i > 0 && containers[i].id !== container.id &&
             (containers[i].max - containers[i].tare + containers[i - 1].max - containers[i - 1].tare) < (containers[i + 1].max - containers[i + 1].tare) &&
             weight > (containers[i].max - containers[i].tare) && weight < (containers[i].max - containers[i].tare + containers[i - 1].max - containers[i - 1].tare) ) )
        {
            container = containers[i];
            break
        }
    }
    return container;
}

const getSmallestContainer = packs => packs.reduce((previous, current) => previous.max < current.max ? previous : current);

const getTotalPackage = (totalWeight, containers) => {
    const { max, tare } = getSmallestContainer(containers);
    return Math.ceil(totalWeight / (max - tare)) * (max - tare);
}

const getPackageCostTTC = (packages, taxCountryCode) => {
    let totalTTC = 0.0;
    // packages.forEach(({container, quantity}) => {
    //     const { tax, price } = container;
    //     let taxToApply = getTax(tax, taxCountryCode);
    //     totalTTC += Math.round(price * (1 + taxToApply) * quantity * 1000) / 1000;
    // });
    return totalTTC;
}

// getInitialPackages
export { getOrderWeight, getPackages, getAvailableWeight, getTotalCost, definePackages, getPackageCostTTC };