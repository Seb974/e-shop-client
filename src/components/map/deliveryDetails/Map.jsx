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
    const { catalogs } = useContext(AuthContext);
    const apiToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const [viewport, setViewport] = useState(defaultView);
    const [defaultCatalog, setDefaultCatalog] = useState(catalogs.find(c => c.isDefault));
    const [relayPointTooltip, setRelaypointTooltip] = useState(undefined);
    const [relayPointPopup, setRelaypointPopup] = useState(undefined);
    const mapStyle = { top: 0, left: 0, height: '520px', width: '100', mapStyle: 'mapbox://styles/mapbox/light-v8' };
    const [defaultView, setDefaultView] = useState({ 
        latitude: isDefined(defaultCatalog) && isDefinedAndNotVoid(defaultCatalog.center) ? defaultCatalog.center[0] : 0, 
        longitude: isDefined(defaultCatalog) && isDefinedAndNotVoid(defaultCatalog.center) ? defaultCatalog.center[1] : 0, 
        zoom: 9
    });

    useEffect(() => {
        setDefaultCatalog(catalogs.find(c => c.isDefault));
        if (isDefined(defaultCatalog)) {
            setDefaultView({ latitude: defaultCatalog.center[0], longitude: defaultCatalog.center[1]});
            setViewport({
                ...viewport, 
                latitude: defaultCatalog.center[0], 
                longitude: defaultCatalog.center[1],
                zoom: 9
            });
        }

    }, [catalogs]);

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