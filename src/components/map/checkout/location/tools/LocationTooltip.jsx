import React, { useEffect, useState } from 'react';
import { Popup } from 'react-map-gl';
import { isSameAddress } from '../../../../../helpers/days';
import { isDefined } from '../../../../../helpers/utils';
import AddressPanel from '../../../../forms/address/AddressPanel';

const LocationTooltip = ({ location, informations, isRelaypoint }) => {

    const initialPosition = AddressPanel.getInitialPosition();
    const [ownPosition, setOwnPosition] = useState([]);
    const [ownInformations, setOwnInformations] = useState(undefined);

    useEffect(() => {
        if (ownPosition.length > 0 && !isRelaypoint) {
            setOwnPosition(informations.position);
        }
    }, []);

    useEffect(() => {
        const reset = JSON.stringify(informations.position) === JSON.stringify(initialPosition);
        if (!isRelaypoint || ownPosition.length === 0 || reset) {
            setOwnPosition(reset ? [] : informations.position);
            setOwnInformations(reset ? undefined : informations);
        }
    }, [informations.position]);

    return !isDefined(location) || !isDefined(ownPosition) ? <></> : (
        <Popup latitude={ownPosition[0]} longitude={ownPosition[1]} offsetLeft={10} offsetTop={-35}>
            <div className="text-center">
                <h4 className="mb-0">Votre adresse</h4>
                <p className="mb-0 mt-0">{ ownInformations.address }</p>
                { !isSameAddress(ownInformations, informations) ? <small className="mt-0">(cliquez pour sélectionner)</small> : <></> }
            </div>
        </Popup>
    );
}

export default LocationTooltip;