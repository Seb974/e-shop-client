import React from 'react';

export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => {},
    currentUser: {},
    setCurrentUser: (value) => {},
    eventSource: {},
    setEventSource: (value) => {},
    country: "RE",
    setCountry: (value) => {},
    settings: {},
    setSettings: (value) => {},
    selectedCatalog: [],
    setSelectedCatalog: (value) => {},
    catalogs: [],
    setCatalogs: (value) => {},
    platform: {},
    setPlatform: (value) => {}
});