import React, { useContext, useEffect, useState } from 'react';
import { isDefinedAndNotVoid } from '../../../../../helpers/utils';
import AddressPanel from '../../../../forms/address/AddressPanel';
import { Marker } from 'react-map-gl';
import AuthContext from '../../../../../contexts/AuthContext';

const LocationMarker = ({ position, informations, setTooltip, setPopup }) => {

    const { selectedCatalog } = useContext(AuthContext);

    const handleClick = e => {
        e.preventDefault();
        setTooltip(undefined);
        setPopup(informations);
    };

    return !isDefinedAndNotVoid(position) || JSON.stringify(position) === JSON.stringify(selectedCatalog.center) ? <></> : (
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