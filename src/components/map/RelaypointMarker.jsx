import React, { useContext, useEffect, useRef } from 'react';
import { Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import AuthContext from '../../contexts/AuthContext';
import DeliveryContext from '../../contexts/DeliveryContext';

const RelaypointMarker = ({ position, relaypoint, informations, setInformations }) => {

    const map = useMap();
    const marker = useRef(null);
    const { settings } = useContext(AuthContext);
    const { setCondition } = useContext(DeliveryContext);

    const onSelect = e => {
        const  { address, address2, zipcode, city } = relaypoint.metas;
        const newCondition = relaypoint.conditions.find(condition => {
            return  condition.userGroups.find(group => group.value === settings.value) !== undefined;
        });
        const newInformations = {...informations, address, address2, zipcode, city};
        setInformations(newInformations);
        setCondition(newCondition);
        map.flyTo(position, 16);
        marker.current.closePopup();
    };

    const getDeliveryDetails = relaypoint => {
        const selectedCondition = relaypoint.conditions.find(condition => {
            return condition.userGroups.find(group => group.value === settings.value) !== undefined;
        });
        return (
            <div className="d-flex flex-column align-items-center">
                <h5 className="mb-0 mt-1">{ relaypoint.name }</h5>
                <p className="mb-0 mt-1"> Livré les { " " }
                    { selectedCondition.days.map((day, i) => {
                        return day.label + ( i < (selectedCondition.days.length - 2) ? ", " : (i === (selectedCondition.days.length - 2) ? " et " : ""))
                    })}
                </p>
                <p className="mt-1">{ relaypoint.informations }</p>
                <button className="btn btn-primary" onClick={ onSelect }>Choisir</button>
            </div>
        );
    };

    return position === null ? null : (
        <Marker ref={marker} position={ position }>
             {/* eventHandlers={{ click: ({ latlng }) => console.log(latlng), mouseover: ({target}) => target.openPopup(), mouseout: ({target}) => target.closePopup() }} */}
            <Tooltip className="text-center">
                { relaypoint.name }<br/>
                { relaypoint.metas.city }<br/>
                <small>(cliquez pour sélectionner)</small>
            </Tooltip>
            <Popup className="text-center">{ getDeliveryDetails(relaypoint) }
                {/* <div className="d-flex flex-column align-items-center">
                    <p className="mb-0">{ relaypoint.name }</p>
                    <p className="mt-0"><small>{ relaypoint.metas.city }</small></p>
                    <button className="btn btn-primary" onClick={ onSelect }>Choisir</button>
                </div> */}
            </Popup>
        </Marker>
    );
}
 
export default RelaypointMarker;