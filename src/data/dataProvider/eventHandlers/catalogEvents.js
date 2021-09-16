import { isDefined } from "../../../helpers/utils";

export const updateCatalogs = (catalogs, setCatalogs, data, setData) => {

    let updatedCatalogs = catalogs;
    const newData = data.map(entity => {
        updatedCatalogs = !isDefined(entity.id) ? 
                            [...updatedCatalogs].filter(m => m['@id'] !== entity['@id']) :
                            getUpdatedCatalogs(entity, updatedCatalogs);
        return {...entity, treated: true};
    });
    setCatalogs(updatedCatalogs);
    setData(newData.filter(d => !isDefined(d.treated)));

    return new Promise((resolve, reject) => resolve(false));
};

const getUpdatedCatalogs = (newCatalog, updatedCatalogs) => {
    const index = updatedCatalogs.findIndex(c => c.id === newCatalog.id);
    return index !== -1 ? updatedCatalogs.map(c => c.id !== newCatalog.id ? c : newCatalog) : [...updatedCatalogs, newCatalog];
};