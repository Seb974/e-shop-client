import React, { useEffect, useState } from 'react';
import { isDefinedAndNotVoid } from '../../../../../helpers/utils';
import AddressPanel from '../../../../forms/address/AddressPanel';
import { Marker } from 'react-map-gl';

const LocationMarker = ({ position, informations, isRelaypoint, setTooltip, setPopup }) => {

    const initialPosition = AddressPanel.getInitialPosition();
    const [ownPosition, setOwnPosition] = useState([]);
    const [ownInformations, setOwnInformations] = useState(undefined);

    useEffect(() => {
        if (ownPosition.length > 0 && !isRelaypoint)
            setOwnPosition(informations.position);
    }, []);

    useEffect(() => {
        const reset = JSON.stringify(informations.position) === JSON.stringify(initialPosition);
        if (!isRelaypoint || ownPosition.length === 0 || reset) {
            setOwnPosition(reset ? [] : informations.position);
            setOwnInformations(reset ? undefined : informations);
        }
    }, [informations.position]);

    const handleClick = e => {
        e.preventDefault();
        setTooltip(undefined);
        setPopup(ownInformations);
    };

    return !isDefinedAndNotVoid(position) || JSON.stringify(position) === JSON.stringify(initialPosition) ? <></> : (
        <Marker latitude={ position[0] } longitude={ position[1] } offsetLeft={0} offsetTop={-30}>
            <a href="#" onClick={ handleClick }>
                <img 
                    alt="self-address" 
                    src="/assets/img/icon-img/self-marker.png" 
                    onMouseEnter={ () => setTooltip(informations)} 
                    onMouseLeave={ () => setTooltip(undefined) }
                />
            </a>
        </Marker>
    );
}

export default LocationMarker;