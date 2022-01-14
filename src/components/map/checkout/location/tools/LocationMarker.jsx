import React, { useContext, useEffect, useState } from 'react';
import { isDefined, isDefinedAndNotVoid } from '../../../../../helpers/utils';
import AddressPanel from '../../../../forms/address/AddressPanel';
import { Marker } from 'react-map-gl';
import AuthContext from '../../../../../contexts/AuthContext';

const LocationMarker = ({ position, informations, isRelaypoint, setTooltip, setPopup }) => {

    const { selectedCatalog } = useContext(AuthContext);
    const [ownPosition, setOwnPosition] = useState([]);
    const [ownInformations, setOwnInformations] = useState(undefined);

    useEffect(() => {
        if (ownPosition.length > 0 && !isRelaypoint)
            setOwnPosition(informations.position);
    }, []);

    useEffect(() => {
        const reset = JSON.stringify(informations.position) === JSON.stringify(isDefined(selectedCatalog) ? selectedCatalog.center : [0, 0]);
        if (!isRelaypoint || ownPosition.length === 0 || reset) {
            setOwnPosition(reset ? [] : informations.position);
            setOwnInformations(reset ? undefined : informations);
        }
    }, [informations.position]);

    // const handleClick = e => {
    //     e.preventDefault();
    //     setTooltip(undefined);
    //     setPopup(ownInformations);
    // };

    return (isDefined(informations) && informations.isRelaypoint) || !isDefinedAndNotVoid(position) || JSON.stringify(position) === JSON.stringify(isDefined(selectedCatalog) ? selectedCatalog.center : [0, 0]) ? <></> : (
        <Marker latitude={ position[0] } longitude={ position[1] } offsetLeft={0} offsetTop={-30}>
            {/* <a href="#" onClick={ handleClick }> */}
                <img 
                    alt="self-address" 
                    src="/assets/img/icon-img/self-marker.png" 
                    onMouseEnter={ () => setTooltip(informations)} 
                    onMouseLeave={ () => setTooltip(undefined) }
                />
            {/* </a> */}
        </Marker>
    );
}

export default LocationMarker;