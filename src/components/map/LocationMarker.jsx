import React, { useEffect, useState } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import { isDefined } from '../../helpers/utils';

const LocationMarker = ({ position, initialPosition, informations = undefined, updatePosition }) => {

    const map = useMap();
    const [ownPosition, setOwnPosition] = useState(position);
    const [ownInformations, setOwnInformations] = useState(informations);

    useEffect(() => {
        map.flyTo(position, 10 + (JSON.stringify(position) === JSON.stringify(initialPosition) ? 0 : 6));
        setOwnPosition(position);
        setOwnInformations(informations);
    }, [position]);

    const handleClick = () => {
        updatePosition({
            latlng: {lat: ownPosition[0], lng: ownPosition[1]}, 
            postcodes: [ownInformations.zipcode],
            value: ownInformations.address,
            city: ownInformations.city 
        })
    };

    return position === null || JSON.stringify(position) === JSON.stringify(initialPosition) ? null : (
        <Marker position={ position } eventHandlers={{ click: () => handleClick() }}>
            <Tooltip className="text-center">
                <h5>Votre adresse</h5>
                { isDefined(informations) && isDefined(informations.city) ? informations.city : ""}<br/>
                { JSON.stringify(position) !== JSON.stringify(ownPosition) ? <small>(cliquez pour sélectionner)</small> : <></>}
            </Tooltip>
        </Marker>
    );
}

export default LocationMarker;