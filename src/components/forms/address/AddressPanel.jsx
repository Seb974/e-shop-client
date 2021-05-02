import React from 'react';
import Map from '../../map/Map';
import Field from '../Field';
import { multilanguage } from "redux-multilanguage";

const initialPosition = [-21.125285, 55.480270];
const initialInformations = { phone: '', address: '', address2: '', zipcode: '', city: '', position: initialPosition};

const AddressPanel = ({ informations, setInformations, errors, strings }) => {

    const onChange = ({ currentTarget }) => {
        setInformations({...informations, [currentTarget.name]: currentTarget.value});
    };

    return (
        <>
            <Map informations={ informations } initialPosition={ initialPosition } setInformations={ setInformations } />
            <div className="row mt-3">
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
                    <Field 
                        name="zipcode"
                        label=" "
                        value={ informations.zipcode }
                        onChange={ onChange }
                        placeholder={ strings["zipcode"] }
                        error={ errors.zipcode }
                    />
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
            </div>
        </>
    );
}

AddressPanel.getInitialPosition = () => initialPosition;
AddressPanel.getInitialInformations = () => initialInformations;
 
export default multilanguage(AddressPanel);