import React, { useEffect, useState } from 'react';
import MercureHub from '../../components/Mercure/MercureHub';
import AuthContext from '../../contexts/AuthContext';
import ContainerContext from '../../contexts/ContainerContext';
import DeliveryContext from '../../contexts/DeliveryContext';
import ProductsContext from '../../contexts/ProductsContext';
import { isDefined, isDefinedAndNotVoid } from '../../helpers/utils';
import AuthActions from '../../services/AuthActions';
import CatalogActions from '../../services/CatalogActions';
import ContainerActions from '../../services/ContainerActions';
import ProductActions from '../../services/ProductActions';
import dbProducts from "../products.json";

const DataProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthActions.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(AuthActions.getCurrentUser());
    const [settings, setSettings] = useState({});
    const [country, setCountry] = useState("RE");
    const [cities, setCities] = useState([]);
    const [catalogs, setCatalogs] = useState([]);
    const [selectedCatalog, setSelectedCatalog] = useState({});
    const [relaypoints, setRelaypoints] = useState([]);
    const [condition, setCondition] = useState(undefined);
    const [eventSource, setEventSource] = useState({});
    const [products, setProducts] = useState([]);
    const [containers, setContainers] = useState([]);
    const [packages, setPackages] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [availableWeight, setAvailableWeight] = useState(0);

    useEffect(() => {
        AuthActions.setErrorHandler(setCurrentUser, setIsAuthenticated);
        AuthActions.getGeolocation()
                   .then(response => setCountry(response));
        AuthActions.getUserSettings()
                   .then(response => setSettings(response));
        ProductActions.findAll()
                      .then(response => setProducts(response));
        ContainerActions.findAll()
                        .then(response => setContainers(response));
        CatalogActions.findAll()
                      .then(response => setCatalogs(response));
    }, []);

    useEffect(() => {
        setCurrentUser(AuthActions.getCurrentUser());
        AuthActions
            .getUserSettings()
            .then(response => setSettings(response));
    }, [isAuthenticated]);

    useEffect(() => {
        if (isDefinedAndNotVoid(catalogs) && isDefined(country)) {
            const catalog = catalogs.find(catalogOption => catalogOption.code === country);
            const selection = isDefined(catalog) ? catalog : catalogs.filter(country => country.isDefault);
            setSelectedCatalog(selection);
        }
    }, [catalogs, country]);

    return (
        <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser, eventSource, setEventSource, country, setCountry, settings, setSettings, selectedCatalog, setSelectedCatalog} }>
        <DeliveryContext.Provider value={ {cities, setCities, relaypoints, setRelaypoints, condition, setCondition, packages, setPackages, totalWeight, setTotalWeight, availableWeight, setAvailableWeight} }>
        <ContainerContext.Provider value={{ containers, setContainers }}>
        <ProductsContext.Provider value={ {products, setProducts} }>
            {/* <MercureHub> */}
                { children }
            {/* </MercureHub> */}
        </ProductsContext.Provider>
        </ContainerContext.Provider>
        </DeliveryContext.Provider>
        </AuthContext.Provider>
    );
}
 
export default DataProvider;