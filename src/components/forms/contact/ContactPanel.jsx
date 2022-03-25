import React from 'react';
import Field from '../Field';

const ContactPanel = ({ user, phone, onUserChange, onPhoneChange, errors }) => {

    const handleChange = ({ currentTarget }) => onPhoneChange(currentTarget.value);
    const handleUserChange = ({ currentTarget }) => onUserChange({...user, [currentTarget.name]: currentTarget.value}, currentTarget.name);

    return (
        <>
            <div className="row mb-0">
                <div className="col-md-12">
                    <Field 
                        name="name"
                        label=" "
                        value={ user.name }
                        onChange={ handleUserChange }
                        placeholder="Nom"
                        error={ errors.name }
                        required={ true }
                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6">
                    <Field 
                        name="email"
                        type="email"
                        label=" "
                        value={ user.email }
                        onChange={ handleUserChange }
                        placeholder="Adresse email"
                        error={ errors.email }
                        required={ true }
                    />
                </div>
                <div className="col-md-6">
                    <Field 
                        type="tel"
                        name="phone"
                        label=" "
                        value={ phone }
                        onChange={ handleChange }
                        placeholder="N° de téléphone"
                        error={ errors.phone }
                        required={ true }
                    />
                </div>
            </div>
        </>
    );
}
 
export default ContactPanel;