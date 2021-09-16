import React from 'react';

export default React.createContext({
    updatedOrders: [],
    setUpdatedOrders: (value) => {},
    updatedProducts: [],
    setUpdatedProducts: (value) => {},
    updatedUsers: [], 
    setUpdatedUsers: (value) => {},
    updatedCategories: [],
    setUpdatedCategories: (value) => {},
    updatedProvisions: [],
    setUpdatedProvisions: (value) => {},
    updatedContainers: [],
    setUpdatedContainers: (value) => {},
    updatedHomepages: [],
    setUpdatedHomepages: (value) => {},
    updatedRelaypoints: [],
    setUpdatedRelaypoints: (value) => {},
    updatedCities: [],
    setUpdatedCities: (value) => {},
    updatedArticles: [],
    setUpdatedArticles: (value) => {},
    updatedCatalogs: [],
    setUpdatedCatalogs: (value) => {}
});