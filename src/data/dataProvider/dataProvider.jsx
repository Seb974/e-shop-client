import React, { useEffect, useState } from 'react';
import MercureHub from '../../components/Mercure/MercureHub';
import AuthContext from '../../contexts/AuthContext';
import DeliveryContext from '../../contexts/DeliveryContext';
import ProductsContext from '../../contexts/ProductsContext';
import AuthActions from '../../services/AuthActions';
import ProductActions from '../../services/ProductActions';
import dbProducts from "../products.json";

const DataProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthActions.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(AuthActions.getCurrentUser());
    const [settings, setSettings] = useState({});
    const [country, setCountry] = useState("RE");
    const [cities, setCities] = useState([]);
    const [relaypoints, setRelaypoints] = useState([]);
    const [condition, setCondition] = useState(undefined);
    const [eventSource, setEventSource] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        AuthActions.setErrorHandler(setCurrentUser, setIsAuthenticated);
        AuthActions.getGeolocation()
                   .then(response => {
                       setCountry("FR");
                       console.log(response);
                    });
        AuthActions.getUserSettings()
                   .then(response => setSettings(response));
        ProductActions.findAll()
                      .then(response => setProducts(response));
    }, []);

    useEffect(() => {
        setCurrentUser(AuthActions.getCurrentUser());
        AuthActions
            .getUserSettings()
            .then(response => setSettings(response));
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser, eventSource, setEventSource, country, setCountry, settings, setSettings} }>
        <DeliveryContext.Provider value={ {cities, setCities, relaypoints, setRelaypoints, condition, setCondition} }>
        <ProductsContext.Provider value={ {products, setProducts} }>
            {/* <MercureHub> */}
                { children }
            {/* </MercureHub> */}
        </ProductsContext.Provider>
        </DeliveryContext.Provider>
        </AuthContext.Provider>
    );
}
 
export default DataProvider;