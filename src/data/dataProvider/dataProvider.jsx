import React, { useEffect, useState } from 'react';
import MercureHub from '../../components/Mercure/MercureHub';
import AuthContext from '../../contexts/AuthContext';
import ContainerContext from '../../contexts/ContainerContext';
import DeliveryContext from '../../contexts/DeliveryContext';
import ProductsContext from '../../contexts/ProductsContext';
import HomeContext from '../../contexts/HomeContext';
import { isDefined, isDefinedAndNotVoid } from '../../helpers/utils';
import AuthActions from '../../services/AuthActions';
import CatalogActions from '../../services/CatalogActions';
import ContainerActions from '../../services/ContainerActions';
import CategoryActions from '../../services/CategoryActions';
import ProductActions from '../../services/ProductActions';
import HomepageActions from '../../services/HomepageActions';
import dbProducts from "../products.json";
import Mercure from '../../mercure/Mercure';
import Roles from '../../config/Roles';

const DataProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthActions.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(AuthActions.getCurrentUser());
    const [settings, setSettings] = useState({});
    const [country, setCountry] = useState("FR");
    const [cities, setCities] = useState([]);
    const [catalogs, setCatalogs] = useState([]);
    const [selectedCatalog, setSelectedCatalog] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [relaypoints, setRelaypoints] = useState([]);
    const [condition, setCondition] = useState(undefined);
    const [eventSource, setEventSource] = useState({});
    const [products, setProducts] = useState([]);
    const [navSearch, setNavSearch] = useState("");
    const [containers, setContainers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [packages, setPackages] = useState([]);
    const [totalWeight, setTotalWeight] = useState(null);
    const [availableWeight, setAvailableWeight] = useState(null);
    const [homepage, setHomepage] = useState(null);

    useEffect(() => {
        AuthActions.setErrorHandler(setCurrentUser, setIsAuthenticated);
        // AuthActions.getGeolocation()
        //            .then(response => setCountry(response));
        AuthActions.getUserSettings()
                   .then(response => setSettings(response));
        ProductActions.findAll()
                      .then(response => setProducts(response));
        ContainerActions.findAll()
                        .then(response => setContainers(response));
        CatalogActions.findAll()
                      .then(response => setCatalogs(response));
        CategoryActions.findAll()
                       .then(response => setCategories(response));
        HomepageActions.findAll()
                        .then(response => setHomepage(response.find(h => h.selected)));
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
        <ProductsContext.Provider value={ {products, setProducts, categories, setCategories, selectedCategory, setSelectedCategory, navSearch, setNavSearch} }>
        <HomeContext.Provider value={{ homepage, setHomepage }}>
            <Mercure>
                { children }
            </Mercure>
        </HomeContext.Provider>
        </ProductsContext.Provider>
        </ContainerContext.Provider>
        </DeliveryContext.Provider>
        </AuthContext.Provider>
    );
}
 
export default DataProvider;