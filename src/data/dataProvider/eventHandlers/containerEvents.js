import { isDefined } from "../../../helpers/utils";

export const updateContainers = (containers, setContainers, data, setData) => {

    let updatedContainers = containers;
    const newData = data.map(entity => {
        updatedContainers = entity['@id'].includes('catalog_prices') ? treatPrices(entity, updatedContainers) : 
                            !isDefined(entity.id) ? [...updatedContainers].filter(c => c['@id'] !== entity['@id']) :
                            getUpdatedContainers(entity, updatedContainers);
        return {...entity, treated: true};
    });
    setContainers(updatedContainers);
    setData(newData.filter(d => !isDefined(d.treated)));

    return new Promise((resolve, reject) => resolve(false));
};

const treatPrices = (catalogPrice, updatedContainers) => {
    const linkedContainer = updatedContainers.find(container => container['@id'] === catalogPrice.container);
    return  !isDefined(linkedContainer) ? updatedContainers :
            updatedContainers.map(p => p.id !== linkedContainer.id ? p : getContainerWithNewPrice(linkedContainer, catalogPrice));
};

const getContainerWithNewPrice = (container, catalogPrice) => {
    if (!isDefined(catalogPrice.id)) {
        return {...container, catalogPrices: container.catalogPrices.filter(p => p['@id'] === catalogPrice['@id'])};
    } else {
        const priceIndex = container.catalogPrices.findIndex(p => p.id === catalogPrice.id);
        const newCatalogPrices = priceIndex !== -1 ? container.catalogPrices.map(p => p.id !== catalogPrice.id ? p : catalogPrice) : [...container.catalogPrices, catalogPrice];
        return {...container, catalogPrices: newCatalogPrices};
    }
};

const getUpdatedContainers = (newContainer, updatedContainers) => {
    const index = updatedContainers.findIndex(c => c.id === newContainer.id);
    return index !== -1 ? updatedContainers.map(c => c.id !== newContainer.id ? c : newContainer) : [...updatedContainers, newContainer];
};