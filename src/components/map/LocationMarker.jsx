import React, { useContext, useEffect, useRef, useState } from 'react';
import { Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import DeliveryContext from '../../contexts/DeliveryContext';
import { isSameAddress } from '../../helpers/days';
import { isDefined } from '../../helpers/utils';
import AddressPanel from '../forms/address/AddressPanel';

const LocationMarker = ({ position, informations = undefined, updatePosition, isRelaypoint, onClear }) => {

    const map = useMap();
    const selfMarker = useRef(null);
    const initialPosition = AddressPanel.getInitialPosition();
    const { condition } = useContext(DeliveryContext);
    const [ownPosition, setOwnPosition] = useState([]);
    const [ownCondition, setOwnCondition] = useState(undefined);
    const [ownInformations, setOwnInformations] = useState(undefined);

    useEffect(() => console.log(ownPosition), [ownPosition]);
    useEffect(() => console.log(ownCondition), [ownCondition]);

    useEffect(() => {
        const reset = JSON.stringify(position) === JSON.stringify(initialPosition);
        map.flyTo(position, 10 + (reset ? 0 : 6));
        if (!isRelaypoint || ownPosition.length === 0 || reset) {
            setOwnPosition(reset ? [] : position);
            setOwnInformations(reset ? undefined : informations);
            if (reset)
                setOwnCondition(undefined);
        }
    }, [position]); 

    useEffect(() => {
        if (ownPosition.length > 0 && !isRelaypoint) {     // ownPosition.length > 0 && isSameAddress(ownInformations, informations)
            setOwnCondition(condition);
        }
    }, [condition]);

    const handleClick = () => {
        updatePosition({
            latlng: {lat: ownPosition[0], lng: ownPosition[1]}, 
            postcodes: [ownInformations.zipcode],
            value: ownInformations.address,
            city: ownInformations.city 
        });
        selfMarker.current.closePopup();
    };

    const onDeleteSelection = () => {
        setOwnCondition(undefined);
        setOwnInformations(undefined);
        setOwnPosition([]);
        map.flyTo(initialPosition, 10);
        selfMarker.current.closePopup();
        onClear();
    };

    //  eventHandlers={{ click: () => handleClick() }}
    return position === null || JSON.stringify(position) === JSON.stringify(initialPosition) ? null : (
        <Marker ref={ selfMarker } position={ position }>  
            <Tooltip className="text-center">
                <h5>Votre adresse</h5>
                { !isDefined(ownInformations) || !isDefined(ownInformations.address) ? <></> :
                    ownInformations.address.indexOf(",") <= 0 ? ownInformations.address : 
                    ownInformations.address.slice(0, ownInformations.address.indexOf(","))
                }<br/>
                { isDefined(ownInformations) && isDefined(ownInformations.city) ? ownInformations.city : ""}<br/>
                { !isSameAddress(ownInformations, informations) ? <small>(cliquez pour sélectionner)</small> : <></>}
            </Tooltip>
            <Popup>
                <div className="d-flex flex-column align-items-center">
                    <h5>Votre adresse</h5>
                    { isDefined(ownCondition) && 
                        <>
                            <p className="mb-0 mt-1 text-center"> Livrable selon vos disponibilités { " " }
                                { ownCondition.days.map((day, i) => {
                                    return day.label + ( i < (ownCondition.days.length - 2) ? ", " : (i === (ownCondition.days.length - 2) ? " ou " : ""))
                                })}
                            </p>
                            <p className="mt-1">
                                <small>
                                    { ownCondition.price > 0 ? 
                                    "Livraison à domicile pour " + ownCondition.price.toFixed(2) + "€ seulement !" : 
                                    "Livraison à domicile offerte"
                                    }
                                </small>
                            </p>
                        </>
                    }
                    { !isSameAddress(ownInformations, informations) ?
                        <button className="btn btn-primary" onClick={ handleClick }>Choisir</button> : 
                        <button className="btn btn-warning" onClick={ onDeleteSelection }>Effacer ma sélection</button>
                    }
                </div>
            </Popup>
        </Marker>
    );
}

export default LocationMarker;