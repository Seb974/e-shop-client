import React, { useContext, useEffect, useRef } from 'react';
import { Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import { useToasts } from 'react-toast-notifications';
import AuthContext from '../../../contexts/AuthContext';
import DeliveryContext from '../../../contexts/DeliveryContext';
import { isSameAddress } from '../../../helpers/days';
import AddressPanel from '../../forms/address/AddressPanel';

const RelaypointMarker = ({ position, relaypoint, informations, setInformations, setIsRelaypoint, onClear }) => {

    const map = useMap();
    const marker = useRef(null);
    const { addToast } = useToasts();
    const { settings } = useContext(AuthContext);
    const { setCondition } = useContext(DeliveryContext);
    const initialPosition = AddressPanel.getInitialPosition();

    const onSelect = e => {
        const  { address, address2, zipcode, city } = relaypoint.metas;
        const newCondition = relaypoint.conditions.find(condition => {
            return  condition.userGroups.find(group => group.value === settings.value) !== undefined;
        });
        const newInformations = {...informations, address, address2, zipcode, city};
        setInformations(newInformations);
        setCondition(newCondition);
        setIsRelaypoint(true);
        map.flyTo(position, 16, {easeLinearity: 1});
        marker.current.closePopup();
        addToast("Point de livraison sélectionné", { appearance: "success", autoDismiss: true });
        // placementType : 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right'
        // appearance: success, error, warning, info
    };

    const onDeleteSelection = () => {
        map.flyTo(initialPosition, 10, {easeLinearity: 1});
        marker.current.closePopup();
        onClear();
        addToast("Point de livraison effacé", { appearance: "error", autoDismiss: true });
    };

    const getDeliveryDetails = relaypoint => {
        const selectedCondition = relaypoint.conditions.find(condition => {
            return condition.userGroups.find(group => group.value === settings.value) !== undefined;
        });
        return (
            <div className="d-flex flex-column align-items-center">
                <h5 className="mb-0 mt-1">{ relaypoint.name }</h5>
                <p className="mb-0 mt-1 text-center"> Livré les { " " }
                    { selectedCondition.days.map((day, i) => {
                        return day.label + ( i < (selectedCondition.days.length - 2) ? ", " : (i === (selectedCondition.days.length - 2) ? " et " : ""))
                    })}
                </p>
                <p className="mt-1">{ relaypoint.informations }</p>
                { !isSameAddress(relaypoint.metas, informations) ?
                    <button className="btn btn-primary" onClick={ onSelect }>Choisir</button> :
                    <button className="btn btn-warning" onClick={ onDeleteSelection }>Effacer ma sélection</button>
                }
            </div>
        );
    };

    return position === null ? null : (
        <Marker ref={marker} position={ position } eventHandlers={{ click: ({target}) => target.openPopup() }}>
            <Tooltip className="text-center">
                { relaypoint.name }<br/>
                { relaypoint.metas.city }<br/>
                { !isSameAddress(relaypoint.metas, informations) ? <small>(cliquez pour sélectionner)</small> : <></> }
            </Tooltip>
            <Popup className="text-center">{ getDeliveryDetails(relaypoint) }</Popup>
        </Marker>
    );
}
 
export default RelaypointMarker;