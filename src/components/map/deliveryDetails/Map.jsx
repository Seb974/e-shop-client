import '../../../assets/css/map.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { isDefined, isDefinedAndNotVoid } from '../../../helpers/utils';
import ReactMapGL, { AttributionControl, NavigationControl, FlyToInterpolator } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import RelaypointTools from './relaypoint/RelaypointTools';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = ({ displayedRelaypoints }) => {

    const map = useRef(null);
    const { selectedCatalog } = useContext(AuthContext);
    const apiToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const [viewport, setViewport] = useState(defaultView);
    const [relayPointTooltip, setRelaypointTooltip] = useState(undefined);
    const [relayPointPopup, setRelaypointPopup] = useState(undefined);
    const mapStyle = { top: 0, left: 0, height: '520px', width: '100', mapStyle: 'mapbox://styles/mapbox/light-v8' };
    const [defaultView, setDefaultView] = useState({ 
        latitude: isDefined(selectedCatalog) && isDefinedAndNotVoid(selectedCatalog.center) ? selectedCatalog.center[0] : 0, 
        longitude: isDefined(selectedCatalog) && isDefinedAndNotVoid(selectedCatalog.center) ? selectedCatalog.center[1] : 0, 
        zoom: isDefined(selectedCatalog) && isDefinedAndNotVoid(selectedCatalog.center) ? selectedCatalog.zoom : 9
    });

    useEffect(() => {
        if (isDefined(selectedCatalog) && Object.keys(selectedCatalog).length > 0 && isDefinedAndNotVoid(selectedCatalog.center)) {
            setDefaultView({ latitude: selectedCatalog.center[0], longitude: selectedCatalog.center[1], zoom: selectedCatalog.zoom});
            setViewport({
                ...viewport, 
                latitude: selectedCatalog.center[0], 
                longitude: selectedCatalog.center[1], 
                zoom: selectedCatalog.zoom
            });
        }
    }, [selectedCatalog]);

    return (
        <ReactMapGL ref={ map } {...viewport} {...mapStyle} onViewportChange={view => setViewport(view)} mapboxApiAccessToken={ apiToken } attributionControl={false} scrollZoom={ false }>
            <NavigationControl style={ {left: 10, top: 10} } />
            <RelaypointTools
                displayedRelaypoints={ displayedRelaypoints }
                relayPointTooltip={ relayPointTooltip }
                relayPointPopup={ relayPointPopup }
                setRelaypointTooltip={ setRelaypointTooltip }
                setRelaypointPopup={ setRelaypointPopup }
            />
            <AttributionControl compact={ true } style={ {right: 0, bottom: 0} } />
        </ReactMapGL>
    );
}

export default Map;