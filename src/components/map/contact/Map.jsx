import '../../../assets/css/map.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { isDefined, isDefinedAndNotVoid } from '../../../helpers/utils';
import ReactMapGL, { AttributionControl, NavigationControl, FlyToInterpolator } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import LocationTools from './location/LocationTools';
import SearchBar from './search/searchBar';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = ({ informations, setInformations }) => {

    const map = useRef(null);
    const searchInput = useRef(null);
    const { currentUser, selectedCatalog } = useContext(AuthContext);
    const apiToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const [defaultView, setDefaultView] = useState({ latitude: 0, longitude: 0, zoom: 17 });
    const [viewport, setViewport] = useState(defaultView);
    const [locationTooltip, setLocationTooltip] = useState(undefined);
    const [locationPopup, setLocationPopup] = useState(undefined);
    const mapStyle = { top: 0, left: 0, height: '520px', width: '100', mapStyle: 'mapbox://styles/mapbox/light-v8' };

    useEffect(() => {
        if (isDefined(informations)) {
            setViewport({
                ...viewport, 
                latitude: informations.position[0] , 
                longitude: informations.position[1], 
                zoom: 15
            });
        }
    }, [informations]);

    useEffect(() => {
        if ( informations.address.length === 0)
            onClear()
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
        setViewport({
            latitude: isDefined(selectedCatalog) ? selectedCatalog.center[0] : defaultView.latitude,
            longitude: isDefined(selectedCatalog) ? selectedCatalog.center[1] : defaultView.longitude,
            zoom: isDefined(selectedCatalog) ? selectedCatalog.zoom : defaultView.zoom,
            transitionDuration: 1800, 
            transitionInterpolator: new FlyToInterpolator() 
        });
    };

    const isInitialState = (position) => {
        return !isDefinedAndNotVoid(position) || (JSON.stringify(position) === JSON.stringify(selectedCatalog.center) || 
               JSON.stringify(position) === JSON.stringify([0, 0]));
   }

    return (
        <>
            <ReactMapGL ref={ map } {...viewport} {...mapStyle} onViewportChange={view => setViewport(view)} mapboxApiAccessToken={ apiToken } attributionControl={false} scrollZoom={ false }>
                <NavigationControl style={ {left: 10, top: 10} } />
                <LocationTools
                    informations={ informations }
                    locationTooltip={ locationTooltip }
                    locationPopup={ locationPopup }
                    setLocationTooltip={ setLocationTooltip }
                    setLocationPopup={ setLocationPopup }
                    updatePosition={ updatePosition }
                    setViewport={ setViewport }
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