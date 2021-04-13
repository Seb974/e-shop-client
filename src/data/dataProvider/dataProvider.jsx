import React, { useEffect, useState } from 'react';
import MercureHub from '../../components/Mercure/MercureHub';
import AuthContext from '../../contexts/AuthContext';
import ProductsContext from '../../contexts/ProductsContext';
import AuthActions from '../../services/AuthActions';
import dbProducts from "../products.json";

const DataProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthActions.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(AuthActions.getCurrentUser());
    const [eventSource, setEventSource] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        AuthActions.setErrorHandler(setCurrentUser, setIsAuthenticated);
        setProducts(dbProducts);
    }, []);

    useEffect(() => setCurrentUser(AuthActions.getCurrentUser()), [isAuthenticated]);

    return (
        <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser, eventSource, setEventSource} }>
        <ProductsContext.Provider value={ {products, setProducts} }>
            {/* <MercureHub> */}
                { children }
            {/* </MercureHub> */}
        </ProductsContext.Provider>
        </AuthContext.Provider>
    );
}
 
export default DataProvider;