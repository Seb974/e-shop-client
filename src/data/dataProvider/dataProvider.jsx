import React, { useEffect, useState } from 'react';
import MercureHub from '../../components/Mercure/MercureHub';
import AuthContext from '../../contexts/AuthContext';
import ProductsContext from '../../contexts/ProductsContext';
import AuthActions from '../../services/AuthActions';
import ProductActions from '../../services/ProductActions';
import dbProducts from "../products.json";

const DataProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthActions.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(AuthActions.getCurrentUser());
    const [country, setCountry] = useState("RE");
    const [eventSource, setEventSource] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        AuthActions.setErrorHandler(setCurrentUser, setIsAuthenticated);
        AuthActions.getGeolocation()
                   .then(response => setCountry(response));
        ProductActions.findAll()
                      .then(response => {
                          console.log(response);
                          setProducts(response);
                        });
    }, []);

    useEffect(() => setCurrentUser(AuthActions.getCurrentUser()), [isAuthenticated]);

    return (
        <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser, eventSource, setEventSource, country, setCountry} }>
        <ProductsContext.Provider value={ {products, setProducts} }>
            <MercureHub>
                { children }
            </MercureHub>
        </ProductsContext.Provider>
        </AuthContext.Provider>
    );
}
 
export default DataProvider;