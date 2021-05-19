import React from 'react';

export default React.createContext({
    products: [],
    setProducts: (value) => {},
    navSearch: '',
    setNavSearch: (value) => {},
    categories: [],
    setCategories: (value) => {},
    selectedCategory: -1,
    setSelectedCategory: (value) => {}
});