import '../../assets/css/map.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import AlgoliaPlaces from 'algolia-places-react';
import LocationMarker from './LocationMarker';
import { multilanguage } from "redux-multilanguage";
import { Icon } from 'leaflet';
import RelaypointMarker from './RelaypointMarker';
import DeliveryContext from '../../../contexts/DeliveryContext';
import AuthContext from '../../../contexts/AuthContext';
import { isDefined } from '../../../helpers/utils';
import { useToasts } from 'react-toast-notifications';

const Map = ({ informations, initialPosition, setInformations, isRelaypoint, setIsRelaypoint, setCityCondition, strings }) => {

    const apInput = useRef(null);
    const { addToast } = useToasts();
    const { country } = useContext(AuthContext);
    const { relaypoints, setCondition } = useContext(DeliveryContext);
    const reunionArea = [-20.871965, 55.216556, -21.389627, 55.836940];
    const franceArea = [41.332365, -5.139160, 51.087336, 8.233883];
    const [selectedArea, setSelectedArea] = useState([franceArea]);

    useEffect(() => apInput.current.autocompleteElem.value = informations.address, [informations.address]);

    useEffect(() => console.log(country), [country]);
    useEffect(() => setSelectedArea([country === "RE" ? reunionArea : franceArea]), []);
    useEffect(() => setSelectedArea([country === "RE" ? reunionArea : franceArea]), [country]);

    const updatePosition = suggestion => {
        const { lat, lng } = suggestion.latlng;
        setIsRelaypoint(false);
        setInformations(informations => ({
            ...informations, 
            position: [lat, lng], 
            address: suggestion.value, 
            zipcode : suggestion.postcodes[0], 
            city: suggestion.city
        }));
        if (isDefined(suggestion.force)) {
            const newCondition = setCityCondition(suggestion.postcodes[0]);
            if (isDefined(newCondition))
                addToast("Livraison à domicile sélectionné", { appearance: "success", autoDismiss: true });
        }
    };

    const onClear = () => {
        setInformations(informations => ({...informations, position: initialPosition, address: '', zipcode: '', city: ''}));
        setIsRelaypoint(false);
        setCondition(undefined);
    }

    return (
        <>
            <div id="map" className="row mt-3">
                    <MapContainer center={ informations.position } zoom={10} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        { relaypoints.map((relaypoint, i) => <RelaypointMarker key={ i } position={ relaypoint.metas.position } relaypoint={ relaypoint } informations={ informations } setInformations={ setInformations } setIsRelaypoint={ setIsRelaypoint } onClear={ onClear }/>) }
                        <LocationMarker position={ informations.position } informations={ informations } updatePosition={ updatePosition } isRelaypoint={ isRelaypoint } onClear={ onClear }/>
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
                            countries: ['fr', 'mc'],      // 'fr', 'mc'
                            type: 'address',
                            insideBoundingBox: selectedArea
                        }}
                        onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => updatePosition(suggestion)}
                        onClear={ onClear }
                        // updatePosition({latlng: {lat: initialPosition[0], lng: initialPosition[1]}})
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