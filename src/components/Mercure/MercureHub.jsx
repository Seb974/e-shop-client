import React, { useEffect, useContext } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import AuthContext from '../../contexts/AuthContext';
import api from '../../config/api';
import eventHandler from '../../data/dataProvider/eventHandlers/eventHandler';
import MercureContext from '../../contexts/MercureContext';
import DeliveryContext from '../../contexts/DeliveryContext';
import touringEvents from '../../data/dataProvider/eventHandlers/touringEvents';
import { isDefined } from '../../helpers/utils';

const MercureHub = ({ children }) => {
    
    const url = new URL(api.MERCURE_DOMAIN + "/.well-known/mercure");
    const { currentUser, eventSource, setEventSource } = useContext(AuthContext);
    const { packages, setPackages, tourings, setTourings, relaypoints, setRelaypoints } = useContext(DeliveryContext);
    const { updatedOrders, setUpdatedOrders, updatedProducts, setUpdatedProducts, updatedCategories, setUpdatedCategories } = useContext(MercureContext);
    const { updatedUsers, setUpdatedUsers, updatedContainers, setUpdatedContainers, updatedHomepages, setUpdatedHomepages } = useContext(MercureContext);
    const { updatedRelaypoints, setUpdatedRelaypoints, updatedCities, setUpdatedCities, updatedArticles, setUpdatedArticles } = useContext(MercureContext);
    const { updatedCatalogs, setUpdatedCatalogs } = useContext(MercureContext);

    useEffect(() => {
        closeIfExists();
        url.searchParams.append('topic', api.API_DOMAIN + '/api/homepages/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/products/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/catalogs/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/stocks/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/categories/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/containers/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/catalog_prices/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/tourings/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/users/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/users/{id}/metas');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/users/{id}/shipments');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/relaypoints/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/relaypoints/metas/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/conditions/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/cities/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/heroes/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/banners/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/countdowns/{id}');
        url.searchParams.append('topic', api.API_DOMAIN + '/api/articles/{id}');
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

        if (data['@id'].includes('users') || (data['@id'].includes('metas') && (!isDefined(data.isRelaypoint) || !data.isRelaypoint)))
            setUpdatedUsers([...updatedUsers, data]);

        if (data['@id'].includes('order_entities'))     // && updatedOrders.findIndex(o => o.id === data.id) === -1
            setUpdatedOrders([...updatedOrders, data]);

        if (data['@id'].includes('products') || (data['@id'].includes('prices') && !data['@id'].includes('catalog_prices')) || data['@id'].includes('stocks'))
            setUpdatedProducts([...updatedProducts, data]);

        if (data['@id'].includes('homepages') || data['@id'].includes('banners') || data['@id'].includes('heroes') || data['@id'].includes('countdowns'))
            setUpdatedHomepages([...updatedHomepages, data]);

        if (data['@id'].includes('relaypoints') || (data['@id'].includes('metas') && isDefined(data.isRelaypoint) && data.isRelaypoint) || (data['@id'].includes('conditions') && isDefined(data.isRelaypoint) && data.isRelaypoint))
            setUpdatedRelaypoints([...updatedRelaypoints, data]);

        if (data['@id'].includes('cities') || (data['@id'].includes('conditions') && isDefined(data.isRelaypoint) && !data.isRelaypoint))
            setUpdatedCities([...updatedCities, data]);
        
        if (data['@id'].includes('articles'))
            setUpdatedArticles([...updatedArticles, data]);
        
        if (data['@id'].includes('catalogs'))
            setUpdatedCatalogs([...updatedCatalogs, data]);
    };

    return <>{ children }</>
}

export default MercureHub;