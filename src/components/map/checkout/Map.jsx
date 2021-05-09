import '../../../assets/css/map.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import DeliveryContext from '../../../contexts/DeliveryContext';
import AuthContext from '../../../contexts/AuthContext';
import { isDefined, isDefinedAndNotVoid } from '../../../helpers/utils';
import { useToasts } from 'react-toast-notifications';
import ReactMapGL, { AttributionControl, NavigationControl, FlyToInterpolator } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import { checkForAlternatives, getCityCondition } from '../../../helpers/map';
import RelaypointTools from './relaypoint/RelaypointTools';
import LocationTools from './location/LocationTools';
import SearchBar from './search/searchBar';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = ({ informations, setInformations }) => {

    const map = useRef(null);
    const searchInput = useRef(null);
    const { addToast } = useToasts();
    const { settings, selectedCatalog } = useContext(AuthContext);
    const apiToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const [defaultView, setDefaultView] = useState({ latitude: 0, longitude: 0, zoom: 9});
    const [viewport, setViewport] = useState(defaultView);
    const { cities, relaypoints, setCondition, condition } = useContext(DeliveryContext);
    const [isRelaypoint, setIsRelaypoint] = useState(false);
    const [relayPointTooltip, setRelaypointTooltip] = useState(undefined);
    const [relayPointPopup, setRelaypointPopup] = useState(undefined);
    const [locationTooltip, setLocationTooltip] = useState(undefined);
    const [locationPopup, setLocationPopup] = useState(undefined);
    const mapStyle = { top: 0, left: 0, height: '520px', width: '100', mapStyle: 'mapbox://styles/mapbox/light-v8' };

    useEffect(() => {
        if (isDefined(selectedCatalog) && Object.keys(selectedCatalog).length > 0 && isDefinedAndNotVoid(selectedCatalog.center))
            setDefaultView({ latitude: selectedCatalog.center[0], longitude: selectedCatalog.center[1], zoom: selectedCatalog.zoom});
            setViewport({...viewport, latitude: selectedCatalog.center[0], longitude: selectedCatalog.center[1], zoom: selectedCatalog.zoom})
    }, [selectedCatalog]);

    useEffect(() => {
        if (informations.address.length > 0 && !isRelaypoint) {
            const newCondition = setCityCondition(informations.zipcode);
            const alternatives = checkForAlternatives(informations.zipcode, newCondition, relaypoints, settings, informations.position, selectedCatalog);
            if (isDefined(alternatives))    // !selectedCatalog.needsParcel &&
                addToast(alternatives.message, alternatives.params);
            if (isDefined(newCondition) && !isDefined(alternatives))
                addToast("Livraison à domicile sélectionné", { appearance: "success", autoDismiss: true });
            else if (selectedCatalog.needsParcel && !isDefined(alternatives))
                addToast("Adresse de livraison sélectionnée", { appearance: "success", autoDismiss: true });
        }
    }, [informations.address]);

    const updatePosition = suggestion => {
        const { lat, lng } = suggestion.latlng;
        setInformations({
            ...informations, 
            position: [lat, lng], 
            address: suggestion.value, 
            address2: "",
            zipcode : suggestion.postcodes[0], 
            city: suggestion.city
        });
        setIsRelaypoint(false);
        if (isDefined(suggestion.force)) {
            const newCondition = setCityCondition(suggestion.postcodes[0]);
            if (isDefined(newCondition))
                addToast("Livraison à domicile sélectionné", { appearance: "success", autoDismiss: true });
        }
    };

    const onClear = () => {
        setInformations(informations => ({
            ...informations, 
            position: selectedCatalog.center,
            address: '', 
            address2: '', 
            zipcode: '', 
            city: ''
        }));
        setIsRelaypoint(false);
        setCondition(undefined);
        setViewport({
            ...defaultView,
            transitionDuration: 1800, 
            transitionInterpolator: new FlyToInterpolator() 
        });
    };

    const setCityCondition = zipcode => {
        const cityCondition = getCityCondition(zipcode, cities, settings);
        setCondition( cityCondition);
        return cityCondition;
    };

    return (
        <>
            <ReactMapGL ref={ map } {...viewport} {...mapStyle} onViewportChange={view => setViewport(view)} mapboxApiAccessToken={ apiToken } attributionControl={false} scrollZoom={ false }>
                <NavigationControl style={ {left: 10, top: 10} } />
                <SearchBar
                    mapRef={ map }
                    containerRef={ searchInput }
                    informations={ informations }
                    updatePosition={ updatePosition }
                    setIsRelaypoint={ setIsRelaypoint }
                    setLocationPopup={ setLocationPopup }
                    setRelaypointPopup={ setRelaypointPopup }
                    setViewport={ setViewport }
                />
                <RelaypointTools
                    informations={ informations }
                    relayPointTooltip={ relayPointTooltip }
                    relayPointPopup={ relayPointPopup }
                    setInformations={ setInformations }
                    setRelaypointTooltip={ setRelaypointTooltip }
                    setRelaypointPopup={ setRelaypointPopup }
                    setViewport={ setViewport }
                    setIsRelaypoint={ setIsRelaypoint }
                    onClear={ onClear }
                />
                <LocationTools
                    informations={ informations }
                    locationTooltip={ locationTooltip }
                    locationPopup={ locationPopup }
                    isRelaypoint={ isRelaypoint }
                    setLocationTooltip={ setLocationTooltip }
                    setLocationPopup={ setLocationPopup }
                    updatePosition={ updatePosition }
                    setViewport={ setViewport }
                    setIsRelaypoint={ setIsRelaypoint }
                    onClear={ onClear }
                />
                <AttributionControl compact={ true } style={ {right: 0, bottom: 0} } />
            </ReactMapGL>
            <div className="row mt-3 mb-5">
                <div className="col-md-12 mt-4" ref={ searchInput }></div>
            </div>
        </>
    );
}

export default Map;