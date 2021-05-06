import React, { useContext, useEffect, useState } from 'react';
import Map from '../../map/checkout/Map';
import Field from '../Field';
import { multilanguage } from "redux-multilanguage";
import AuthContext from '../../../contexts/AuthContext';
import DeliveryContext from '../../../contexts/DeliveryContext';
import { isDefined, isDefinedAndNotVoid } from '../../../helpers/utils';
import { useToasts } from 'react-toast-notifications';

const initialPosition = [-21.065285, 55.480270];
const initialInformations = { phone: '', address: '', address2: '', zipcode: '', city: '', position: initialPosition};

const AddressPanel = ({ informations, setInformations, errors, strings }) => {

    const { addToast } = useToasts();
    const { settings } = useContext(AuthContext);
    const [isRelaypoint, setIsRelaypoint] = useState(false);
    const { cities, relaypoints, setCondition } = useContext(DeliveryContext);

    // useEffect(() => {
    //     if (informations.zipcode.length === 5 && !isRelaypoint) {
    //         const condition = setCityCondition(informations.zipcode);
    //         checkForAlternatives(informations.zipcode, condition);
    //         if (isDefined(condition) && informations.address.length > 0)
    //             addToast("Livraison à domicile sélectionné", { appearance: "success", autoDismiss: true });
    //     }
    // }, [informations.zipcode]);

    // const onChange = ({ currentTarget }) => {
    //     setInformations({...informations, [currentTarget.name]: currentTarget.value});
    // };

    // const setCityCondition = zipcode => {
    //     const userCity = cities.find(city => city.zipCode === zipcode);
    //     const cityCondition = !isDefined(userCity) ? undefined : userCity.conditions.find(condition => {
    //         return condition.userGroups.find(group => group.value === settings.value)
    //     });
    //     setCondition(cityCondition);
    //     return cityCondition;
    // };

    // const checkForAlternatives = (zipcode, condition) => {
    //     if (isDefined(relaypoints)) {
    //         let message = "Economisez sur les frais de livraison en choisissant un point relais près de chez vous.";
    //         const alternatives = relaypoints.filter(relaypoint => relaypoint.metas.zipcode === zipcode);
    //         if (isDefined(condition)) {
    //             const filteredAlternatives = alternatives.filter(relaypoint => relaypoint.conditions.find(c => {
    //                     return c.price < condition.price && c.userGroups.find(group => group.value === settings.value) !== undefined
    //                 }) !== undefined
    //             );
    //             if (filteredAlternatives.length > 1)
    //                 addToast(message, {appearance: "warning", autoDismiss: true, autoDismissTimeout: 10000, placement: "top-right"});
    //         } else {
    //             const cityName = "votre commune";
    //             message = alternatives.length > 0 ?
    //                 "Nous n'assurons pas les livraisons à domicile sur " + cityName + ", mais il existe un point relais près de chez vous.":
    //                 "Nous avons aucune offre de livraison sur "+ cityName + ". Vérifiez la présence de points relais dans les communues voisines.";
    //             addToast(message, {appearance: alternatives.length > 0 ? "warning" : "error", autoDismiss: true, autoDismissTimeout: 10000, placement: "top-right"});
    //         }
    //     }
    // };

    return (
        <>
            <Map informations={ informations } setInformations={ setInformations } />
            {/* <div className="row mt-3">
                <div className="col-md-12">
                    <Field
                        name="address2"
                        label=" "
                        value={ informations.address2 }
                        onChange={ onChange }
                        placeholder={ strings["address2"] }
                        error={ errors.address2 }
                    />
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-6">
                    <div className="form-group ">
                        <label htmlFor="zipcode"> </label>
                        <input 
                            type="number"
                            value={ informations.zipcode }
                            onChange={ onChange }
                            onFocus={ () => setManualUpdate(true) }
                            onBlur={ () => setManualUpdate(false) }
                            className={"ext-input form-control" + (errors.zipcode && " is-invalid")} 
                            placeholder=" "
                            name="zipcode" 
                            id="zipcode"
                            maxLength="5"
                        />
                        { errors.zipcode && <p className="invalid-feedback">{ errors.zipcode }</p> }
                     </div>
                </div>
                <div className="col-md-6">
                    <Field
                        name="city"
                        label=" "
                        value={ informations.city }
                        onChange={ onChange }
                        placeholder={ strings["city"] }
                        error={ errors.city }
                    />
                </div>
            </div> */}
        </>
    );
}

AddressPanel.getInitialPosition = () => initialPosition;
AddressPanel.getInitialInformations = () => initialInformations;
 
export default multilanguage(AddressPanel);