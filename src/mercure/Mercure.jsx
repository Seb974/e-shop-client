import React, { useContext, useEffect, useState } from 'react';
import MercureContext from '../contexts/MercureContext';
import MercureHub from '../components/Mercure/MercureHub';
import AuthContext from '../contexts/AuthContext';
import ProductsContext from '../contexts/ProductsContext';
import ContainerContext from '../contexts/ContainerContext';
import { isDefinedAndNotVoid } from '../helpers/utils';
import { updateContext } from '../data/dataProvider/eventHandlers/productEvents';
import { updateCurrentUser } from '../data/dataProvider/eventHandlers/userEvents';
import { updateCategories } from '../data/dataProvider/eventHandlers/categoryEvents';
import { updateContainers } from '../data/dataProvider/eventHandlers/containerEvents';
import { updateHomepage } from '../data/dataProvider/eventHandlers/homepageEvents';
import HomeContext from '../contexts/HomeContext';

const Mercure = ({ children }) => {

    const { homepage, setHomepage } = useContext(HomeContext);
    const { containers, setContainers } = useContext(ContainerContext);
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { products, setProducts, categories, setCategories } = useContext(ProductsContext);

    const [updatedUsers, setUpdatedUsers] = useState([]);
    const [updatedOrders, setUpdatedOrders] = useState([]);
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [updatedCategories, setUpdatedCategories] = useState([]);
    const [updatedContainers, setUpdatedContainers] = useState([]);
    const [updatedHomepages, setUpdatedHomepages] = useState([]);

    const [productOpering, setProductOpering] = useState(false);
    const [categoryOpering, setCategoryOpering] = useState(false);
    const [containerOpering, setContainerOpering] = useState(false);
    const [currentUserOpering, setCurrentUserOpering] = useState(false);
    const [homeOpering, setHomeOpering] = useState(false);

    useEffect(() => {
        if (isDefinedAndNotVoid(updatedProducts) && !productOpering) {
            setProductOpering(true);
            updateContext(products, setProducts, updatedProducts, setUpdatedProducts, currentUser)
                .then(response => setProductOpering(response));
        }
    }, [updatedProducts]);

    useEffect(() => {
        if (isDefinedAndNotVoid(updatedCategories) && !categoryOpering) {
            setCategoryOpering(true);
            updateCategories(categories, setCategories, products, setProducts, updatedCategories, setUpdatedCategories)
                .then(response => setCategoryOpering(response));
        }
    }, [updatedCategories]);

    useEffect(() => {
        if (isDefinedAndNotVoid(updatedContainers) && !containerOpering) {
            setContainerOpering(true);
            updateContainers(containers, setContainers, updatedContainers, setUpdatedContainers)
                .then(response => setContainerOpering(response));
        }
    }, [updatedContainers]);

    useEffect(() => {
        if (isDefinedAndNotVoid(updatedUsers) && !currentUserOpering) {
            setCurrentUserOpering(true);
            updateCurrentUser(currentUser, setCurrentUser, updatedUsers, setUpdatedUsers)
                .then(response => setCurrentUserOpering(response));
        }
    }, [updatedUsers]);

    useEffect(() => {
        if (isDefinedAndNotVoid(updatedHomepages) && !homeOpering) {
            setHomeOpering(true);
            updateHomepage(homepage, setHomepage, updatedHomepages, setUpdatedHomepages)
                .then(response => setHomeOpering(response));
        }
    }, [updatedHomepages])

    return (
        <MercureContext.Provider value={{ 
                updatedOrders, setUpdatedOrders, 
                updatedProducts, setUpdatedProducts, 
                updatedUsers, setUpdatedUsers, 
                updatedCategories, setUpdatedCategories,
                updatedContainers, setUpdatedContainers,
                updatedHomepages, setUpdatedHomepages
            }}
        >
            <MercureHub>
                { children }
            </MercureHub>
        </MercureContext.Provider>
    );
}

export default Mercure;