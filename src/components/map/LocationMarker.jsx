import React, { useEffect } from 'react';
import { Marker, Popup, Tooltip, useMap } from 'react-leaflet';

const LocationMarker = ({ position, initialPosition }) => {
    const map = useMap();

    useEffect(() => {
        if (JSON.stringify(position) !== JSON.stringify([-21.2738, 55.4447])) {
            map.flyTo(position, 10 + (JSON.stringify(position) === JSON.stringify(initialPosition) ? 0 : 6));
        }
    }, [position])

    return position === null || JSON.stringify(position) === JSON.stringify(initialPosition) ? null : (
        <Marker position={ position } eventHandlers={{ click: (e) => console.log(e) }}>
             {/* eventHandlers={{ click: ({ latlng }) => console.log(latlng), mouseover: ({target}) => target.openPopup(), mouseout: ({target}) => target.closePopup() }} */}
            <Tooltip className="text-center">
                Au bon Fromage<br/>
                Etang-Salé<br/>
                <small>(cliquez pour sélectionner)</small>
            </Tooltip>
            <Popup className="text-center">
                <p className="d-flex flex-column align-items-center">
                    <p className="mb-0">Au bon Fromage</p>
                    <p className="mt-0"><small>Etang-Salé</small></p>
                    <button className="btn btn-primary" onClick={ () => console.log("relayPoint selected") }>Choisir</button>
                </p>
            </Popup>
        </Marker>
    );
}
 
export default LocationMarker;