import '../../assets/css/map.css';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import AlgoliaPlaces from 'algolia-places-react';
import LocationMarker from './LocationMarker';
import { multilanguage } from "redux-multilanguage";
import { Icon } from 'leaflet';

const Map = ({ informations, initialPosition, updatePosition, strings }) => {

    const apInput = useRef(null);
    useEffect(() => apInput.current.autocompleteElem.value = informations.address, [informations.address]);

    return (
        <>
            <div id="map" className="row mt-3">
                    <MapContainer center={ informations.position } zoom={10} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={ [-21.2738, 55.4447] } initialPosition={ initialPosition } />
                        <LocationMarker position={ informations.position } initialPosition={ initialPosition } />
                    </MapContainer>
            </div>
            <div className="row mt-3">
                <div className="col-md-12 mt-4">
                    <AlgoliaPlaces
                        ref={ apInput }
                        placeholder={ strings["address"] }
                        className="form-control"
                        options={{
                            appId: 'pl6124DJ467I',
                            apiKey: 'dac682bc8a0dc7a59f7ada449553bcf9',
                            language: 'fr',
                            countries: ['fr'],
                            type: 'address',
                        }}
                        onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
                            console.log(suggestion);
                            updatePosition(suggestion);
                        }}
                        onClear={() => updatePosition({latlng: {lat: initialPosition[0], lng: initialPosition[1]}})}

                        // onSuggestions={({ rawAnswer, query, suggestions }) => console.log('On suggestion')}
                        // onCursorChanged={({ rawAnswer, query, suggestion, suggestionIndex }) => console.log('On cursor changed')}
                        // onLimit={({ message }) => console.log('On limit')}
                        // onError={({ message }) => console.log('On Error')}
                    />
                </div>
            </div>
        </>
    );
}
 
export default multilanguage(Map);