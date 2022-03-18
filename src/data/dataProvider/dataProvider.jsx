import React, { useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import ContainerContext from '../../contexts/ContainerContext';
import DeliveryContext from '../../contexts/DeliveryContext';
import ProductsContext from '../../contexts/ProductsContext';
import HomeContext from '../../contexts/HomeContext';
import { isDefined, isDefinedAndNotVoid } from '../../helpers/utils';
import { ToastProvider } from "react-toast-notifications";
import AuthActions from '../../services/AuthActions';
import CatalogActions from '../../services/CatalogActions';
import ContainerActions from '../../services/ContainerActions';
import CategoryActions from '../../services/CategoryActions';
import HomepageActions from '../../services/HomepageActions';
import Mercure from '../../mercure/Mercure';
import PlatformActions from '../../services/PlatformActions';
import PlatformContext from '../../contexts/PlatformContext';

const DataProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthActions.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(AuthActions.getCurrentUser());
    const [settings, setSettings] = useState({});
    const [country, setCountry] = useState("FR");
    const [cities, setCities] = useState([]);
    const [catalogs, setCatalogs] = useState([]);
    const [selectedCatalog, setSelectedCatalog] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [relaypoints, setRelaypoints] = useState([]);
    const [condition, setCondition] = useState(undefined);
    const [eventSource, setEventSource] = useState({});
    const [products, setProducts] = useState([]);
    const [navSearch, setNavSearch] = useState("");
    const [containers, setContainers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [packages, setPackages] = useState([]);
    const [tourings, setTourings] = useState([]);
    const [totalWeight, setTotalWeight] = useState(null);
    const [availableWeight, setAvailableWeight] = useState(null);
    const [homepage, setHomepage] = useState(null);
    const [platform, setPlatform] = useState(null);

    useEffect(() => {
        AuthActions.setErrorHandler(setCurrentUser, setIsAuthenticated);
        PlatformActions.find()
                       .then(response => setPlatform(response));
        AuthActions.getUserSettings()
                   .then(response => setSettings(response));
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
            const catalog = catalogs.find(catalogOption => catalogOption.code === country && catalogOption.isActive);
            const selection = isDefined(catalog) ? catalog : catalogs.find(country => country.isDefault);
            setSelectedCatalog(selection);
        }
    }, [catalogs, country]);

    useEffect(() => {
        if (isDefined(selectedCatalog))
            setCountry(selectedCatalog.code);
    }, [selectedCatalog]);

    return (
        <ToastProvider placement="top-right">
            <PlatformContext.Provider value={ {platform, setPlatform} }>
            <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser, eventSource, setEventSource, country, setCountry, settings, setSettings, selectedCatalog, setSelectedCatalog, catalogs, setCatalogs, platform, setPlatform} }>
            <DeliveryContext.Provider value={ {cities, setCities, relaypoints, setRelaypoints, condition, setCondition, packages, setPackages, totalWeight, setTotalWeight, availableWeight, setAvailableWeight, tourings, setTourings} }>
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
            </PlatformContext.Provider>
        </ToastProvider>
    );
}
 
export default DataProvider;