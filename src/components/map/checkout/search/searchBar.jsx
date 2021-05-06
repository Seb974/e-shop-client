import React, { useContext } from 'react';
import { FlyToInterpolator } from 'react-map-gl';
import AuthContext from '../../../../contexts/AuthContext';
import Geocoder from 'react-map-gl-geocoder';
import { multilanguage } from "redux-multilanguage";

const SearchBar = ({ mapRef, containerRef, informations, setIsRelaypoint, setLocationPopup, setRelaypointPopup, setViewport, updatePosition, strings }) => {

    const { country } = useContext(AuthContext);

    const searchParams = { 
        mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN, 
        countries: country, 
        language: "fr", 
        minLength: 6, 
        marker: false 
    };

    const onResult = ({ result }) => {
        setIsRelaypoint(false);
        setLocationPopup(undefined);
        setRelaypointPopup(undefined);
        const { center, place_name, context } = result;
        const suggestion = {
            latlng: {lat: center[1], lng: center[0]}, 
            value: place_name, 
            postcodes: [ context.find(data => data.id.includes("postcode")).text ], 
            city: context.find(data => data.id.includes("place")).text
        };
        const view = {
            latitude: center[1], 
            longitude: center[0], 
            zoom: 17, 
            transitionDuration: 1800, 
            transitionInterpolator: new FlyToInterpolator() 
        };
        setViewport(view);
        updatePosition(suggestion);
    }

    return (
        <Geocoder 
            mapRef={ mapRef } 
            containerRef={ containerRef } 
            onResult={ onResult } 
            inputValue={ "" } 
            placeholder={ informations.address.length > 0 ? informations.address : strings['address'] } 
            {...searchParams}
        />
    );
}
 
export default multilanguage(SearchBar);