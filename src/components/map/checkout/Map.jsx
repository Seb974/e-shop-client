import '../../../assets/css/map.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import DeliveryContext from '../../../contexts/DeliveryContext';
import AuthContext from '../../../contexts/AuthContext';
import { isDefined, isDefinedAndNotVoid } from '../../../helpers/utils';
import { useToasts } from 'react-toast-notifications';
import ReactMapGL, { AttributionControl, NavigationControl, FlyToInterpolator } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import { checkForAlternatives, getCityCondition, isInSelectedCountry } from '../../../helpers/map';
import RelaypointTools from './relaypoint/RelaypointTools';
import LocationTools from './location/LocationTools';
import SearchBar from './search/searchBar';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = ({ informations, setInformations, displayedRelaypoints, setDiscount, objectDiscount, setObjectDiscount, errors, setErrors }) => {

    const map = useRef(null);
    const searchInput = useRef(null);
    const { addToast } = useToasts();
    const { currentUser, settings, selectedCatalog } = useContext(AuthContext);
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
    const [messageSent, setMessageSent] = useState(false);

    useEffect(() => {
        if (isDefined(selectedCatalog) && Object.keys(selectedCatalog).length > 0 && isDefinedAndNotVoid(selectedCatalog.center)) {
            setDefaultView({ latitude: selectedCatalog.center[0], longitude: selectedCatalog.center[1], zoom: selectedCatalog.zoom});
            setViewport({
                ...viewport, 
                latitude: !isInitialState(informations.position) ? informations.position[0] : selectedCatalog.center[0], 
                longitude: !isInitialState(informations.position) ? informations.position[1] : selectedCatalog.center[1], 
                zoom: !isInitialState(informations.position) ? 17 : selectedCatalog.zoom
            });
            if (isInitialState(informations.position))
                setInformations({...informations, position: selectedCatalog.center});
        }
    }, [selectedCatalog]);

    useEffect(() => {
        if (currentUser.id !== -1 && isDefined(currentUser.metas) && isDefined(currentUser.metas.position) && !isInitialState(currentUser.metas.position)) {
            setViewport({
                ...viewport,
                latitude: currentUser.metas.position[0],
                longitude: currentUser.metas.position[1],
                zoom: 17,
                transitionDuration: 1800, 
                transitionInterpolator: new FlyToInterpolator() 
            });
        }
    },[currentUser]);

    useEffect(() => {
        if (informations.address.length > 0 && !isRelaypoint && relaypoints.length > 0 && isDefinedAndNotVoid(cities) && isDefined(selectedCatalog)) {
            const newCondition = setCityCondition(informations.zipcode);
            const alternatives = checkForAlternatives(informations.zipcode, newCondition, relaypoints, settings, informations.position, selectedCatalog, cities);
            if (isDefined(alternatives))
                addToast(alternatives.message, alternatives.params);
            if (isDefined(newCondition) && !isDefined(alternatives))
                addToast("Livraison à domicile sélectionné", { appearance: "success", autoDismiss: true });
            else {
                if (selectedCatalog.needsParcel && !isDefined(alternatives) && isInSelectedCountry(informations.position[0], informations.position[1], selectedCatalog)) 
                    addToast("Adresse de livraison sélectionnée", { appearance: "success", autoDismiss: true });
                else if (cities.find(c => c.zipCode === informations.zipcode && c.catalog.code === selectedCatalog.code) === undefined)
                    addToast("L'adresse indiquée n'est pas accessible depuis le catalogue sélectionné. Veuillez s'il vous plaît changer de catalogue ou entrer une autre addresse.", { appearance: "error", autoDismiss: true, autoDismissTimeout: 8000 })
            }
            setMessageSent(true);
            setTimeout(() => setMessageSent(false), 1000);
        } 
        else if (informations.address.length === 0) {
            onClear()
        }
    }, [informations.address, relaypoints, cities, selectedCatalog]);

    const updatePosition = suggestion => {
        const newSelection = getNewSelectedPosition(suggestion, informations);
        setInformations(newSelection);
        setIsRelaypoint(false);
        if (isDefined(suggestion.force)) {
            const newCondition = setCityCondition(suggestion.postcodes[0]);
            if (isDefined(newCondition))
                addToast("Livraison à domicile sélectionné", { appearance: "success", autoDismiss: true });
        }
        if (isDefined(errors.address) && errors.address.length > 0)
            setErrors({...errors, address: ""});
    };

    const onClear = () => {
        const newInformations = getNeutralInformations(informations);
        setInformations(newInformations);
        setIsRelaypoint(false);
        setCondition(undefined);
        setViewport({
            latitude: isDefined(selectedCatalog) && isDefinedAndNotVoid(selectedCatalog.center) ? selectedCatalog.center[0] : defaultView.latitude,
            longitude: isDefined(selectedCatalog)&& isDefinedAndNotVoid(selectedCatalog.center) ? selectedCatalog.center[1] : defaultView.longitude,
            zoom: isDefined(selectedCatalog) && isDefined(selectedCatalog.zoom) ? selectedCatalog.zoom : defaultView.zoom,
            transitionDuration: 1800, 
            transitionInterpolator: new FlyToInterpolator() 
        });
    };

    const getNeutralInformations = ({ phone }) => {
        return {
            position: isDefined(selectedCatalog) ? selectedCatalog.center : [0, 0],
            address: '', 
            address2: '', 
            zipcode: '', 
            city: '',
            phone: phone,
            isRelaypoint: false
        }
    };

    const getNewSelectedPosition = ({latlng, value, city, postcodes}, { phone }) => {
        const { lat, lng } = latlng;
        return {
            position: [lat, lng], 
            address: value, 
            address2: "",
            zipcode : postcodes[0], 
            city: city,
            phone: phone,
            isRelaypoint: false
        }
    };

    const setCityCondition = zipcode => {
        const cityCondition = getCityCondition(zipcode, cities, settings, selectedCatalog);
        setCondition(cityCondition);
        return cityCondition;
    };

    const isInitialState = (position) => {
        const isInitial = !isDefinedAndNotVoid(position) || JSON.stringify(position) === JSON.stringify([0, 0]) || 
                          informations.address.length === 0;
        return isInitial;
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
                    errors={ errors }
                />
                <RelaypointTools
                    informations={ informations }
                    displayedRelaypoints={ displayedRelaypoints }
                    relayPointTooltip={ relayPointTooltip }
                    relayPointPopup={ relayPointPopup }
                    objectDiscount={ objectDiscount }
                    setInformations={ setInformations }
                    setRelaypointTooltip={ setRelaypointTooltip }
                    setRelaypointPopup={ setRelaypointPopup }
                    setDiscount={ setDiscount }
                    setObjectDiscount={ setObjectDiscount }
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
                { errors.address && <p className="mapbox-validation-error">{ errors.address }</p> }
            </div>
        </>
    );
}

export default Map;