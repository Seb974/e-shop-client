import '../../../assets/css/map.css';
import React, { useContext, useEffect, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import DeckGL, { IconLayer } from "deck.gl";
// import { shop } from '../../../helpers/checkout';
import TouringActions from '../../../services/TouringActions';
import DeliveryContext from '../../../contexts/DeliveryContext';
import AuthContext from '../../../contexts/AuthContext';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const TouringLocation = ({ tourings }) => {

    const apiToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const Truck = "/assets/img/icon-img/package.png";
    // const initialLocation = shop.coordinates;
    const { selectedCatalog } = useContext(AuthContext);
    // const { tourings, setTourings } = useContext(DeliveryContext);
    const [defaultView, setDefaultView] = useState({ latitude: selectedCatalog.center[0], longitude: selectedCatalog.center[1], zoom: 9.4});
    const [viewport, setViewport] = useState(defaultView);

    // useEffect(() => fetchTourings(), []);

    // const fetchTourings = () => {
    //     TouringActions
    //         .getProcessingTourings()
    //         // .then(response => setTourings(response));
    // };

    const layers = [
        new IconLayer({
            id: "truck",
            data: tourings,
            pickable: false,
            iconAtlas: Truck,
            iconMapping: { truck: { x: 0, y: 0, width: 512, height: 512 } },
            sizeScale: 30,
            getPosition: d => [d.position[1], d.position[0]],
            getIcon: d => "truck",
        })
    ];

    return (
        <DeckGL initialViewState={ viewport } controller={ true } layers={ layers }>
            <StaticMap mapboxApiAccessToken={ apiToken } width="100vw" height="100vh"/>
        </DeckGL>
    );
}
 
export default TouringLocation;