import React, { useEffect, useContext } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import AuthContext from '../../contexts/AuthContext';
import api from '../../config/api';
import eventHandler from '../../data/dataProvider/eventHandlers/eventHandler';
import MercureContext from '../../contexts/MercureContext';
import DeliveryContext from '../../contexts/DeliveryContext';
import touringEvents from '../../data/dataProvider/eventHandlers/touringEvents';

const MercureHub = ({ children }) => {
    
    const url = new URL(api.MERCURE_DOMAIN + "/.well-known/mercure");
    const { currentUser, eventSource, setEventSource } = useContext(AuthContext);
    const { packages, setPackages, tourings, setTourings } = useContext(DeliveryContext);
    const { updatedOrders, setUpdatedOrders, updatedProducts, setUpdatedProducts, updatedCategories, setUpdatedCategories } = useContext(MercureContext);
    const { updatedUsers, setUpdatedUsers, updatedContainers, setUpdatedContainers, updatedHomepages, setUpdatedHomepages } = useContext(MercureContext);

    useEffect(() => {
        closeIfExists();
        url.searchParams.append('topic', api.API_DOMAIN + '/api/homepages/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/products/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/stocks/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/categories/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/containers/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/catalog_prices/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/tourings/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/users/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/users/{id}/metas');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/users/{id}/shipments');
        setEventSource(new EventSourcePolyfill(url, { withCredentials: true }));
    }, [currentUser]);

    const closeIfExists = () => {
        if (eventSource !== undefined && Object.keys(eventSource).find(key => key === 'readyState') !== undefined)
            eventSource.close();
    };

    // eventSource.onopen = event => console.log(event);
    // eventSource.onmessage = event => eventHandler.dispatch(event);

    eventSource.onerror = event => console.log(event);

    eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data['@id'].includes('tourings'))
            touringEvents.update(data, tourings, setTourings);

        if (data['@id'].includes('containers') || data['@id'].includes('catalog_prices'))
            setUpdatedContainers([...updatedContainers, data]);

        if (data['@id'].includes('categories'))
            setUpdatedCategories([...updatedCategories, data]);

        if (data['@id'].includes('users') || data['@id'].includes('metas'))
            setUpdatedUsers([...updatedUsers, data]);

        if (data['@id'].includes('order_entities') && updatedOrders.findIndex(o => o.id === data.id) === -1)
            setUpdatedOrders([...updatedOrders, data]);

        if (data['@id'].includes('products') || (data['@id'].includes('prices') && !data['@id'].includes('catalog_prices')) || data['@id'].includes('stocks'))
            setUpdatedProducts([...updatedProducts, data]);

        if (data['@id'].includes('homepages'))
            setUpdatedHomepages([...updatedHomepages, data]);
    };

    return <>{ children }</>
}

export default MercureHub;