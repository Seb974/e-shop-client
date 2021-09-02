import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Field from '../forms/Field';
import UserActions from '../../services/UserActions';

const Register = ({ onEnd }) => {

    const [user, setUser] = useState({name:"", email: "", password: "", confirmPassword: "", acceptCGV: false, acceptRGPD: false});
    const [errors, setErrors] = useState({name:"", email: "", password: "", confirmPassword: "", acceptCGV: "", acceptRGPD: ""});

    const handleChange = ({ currentTarget }) => {
        setUser({...user, [currentTarget.name]: currentTarget.value});
    };

    const handleCheckbox = ({ currentTarget }) => {
        setUser({...user, [currentTarget.name]: !user[currentTarget.name]});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const apiErrors = {};
        if (user.password !== user.confirmPassword) {
            apiErrors.confirmPassword = "Les mots de passe saisis ne correspondent pas";
            setErrors(apiErrors);
            return ;
        }
        if (!user.acceptCGV || !user.acceptRGPD) {
            apiErrors.acceptCGV = user.acceptCGV ? "" : "Les conditions générales de vente doivent être acceptées pour s'inscrire.";
            apiErrors.acceptRGPD = user.acceptRGPD ? "" : "La collecte des informations doit être acceptée pour s'inscrire.";
            setErrors(apiErrors);
            return ;
        }
        try {
            UserActions.register(user);
            setErrors({});
            onEnd();
        } catch ( e ) {
            if (e.response !== undefined) {
                const { violations } = e.response.data;
                if (violations) {
                    violations.forEach(({propertyPath, message}) => {
                        apiErrors[propertyPath] = message;
                    });
                    setErrors(apiErrors);
                }
            } else {
                console.log(e);
            }
            //TODO : Flash notification d'erreur
        }
    }

    return (
        <Form onSubmit={ handleSubmit }>
            <Form.Group>
                <Field  name="name"
                        label="Nom"
                        value={ user.name }
                        error={ errors.name }
                        onChange={ handleChange }
                />
            </Form.Group>
            <Form.Group>
                <Field  name="email"
                        type="email"
                        label="Adresse email"
                        value={ user.email }
                        error={ errors.email }
                        onChange={ handleChange }
                />
            </Form.Group>
            <Form.Group>
                <Field  name="password"
                        type="password"
                        label="Mot de passe"
                        value={ user.password }
                        error={ errors.password }
                        onChange={ handleChange }
                />
            </Form.Group>
            <Form.Group>
                <Field  name="confirmPassword"
                        type="password"
                        label="Confirmation"
                        placeholder="Confirmation du mot de passe"
                        value={ user.confirmPassword }
                        error={ errors.confirmPassword }
                        onChange={ handleChange }
                />
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox">
                    <Form.Check.Input name="acceptCGV" type="checkbox" checked={ user.acceptCGV } onChange={ handleCheckbox } className={"ext-input " + (errors.acceptCGV && " is-invalid")}/>
                    <Form.Check.Label>J'accepte les <Link to="/cgv">Conditions Générales de Vente</Link></Form.Check.Label>
                    <Form.Control.Feedback type="invalid">{ errors.acceptCGV }</Form.Control.Feedback>
                </Form.Check>
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox">
                    <Form.Check.Input name="acceptRGPD" type="checkbox" checked={ user.acceptRGPD } onChange={ handleCheckbox } className={"ext-input " + (errors.acceptRGPD && " is-invalid")}/>
                        <Form.Check.Label>J'accepte que Frais Péi collecte mon adresse et N° de téléphone afin d'assurer la livraison de mes commandes.</Form.Check.Label>
                        <Form.Control.Feedback type="invalid">{ errors.acceptRGPD }</Form.Control.Feedback>
                </Form.Check>
            </Form.Group>
            <Form.Row>
                <Col className="col-md-12 text-center">
                    <Button variant="success" type="submit">S'INSCRIRE</Button>    {/* variant="primary" style={{ backgroundColor: '#4C69B9' }} */}
                </Col>
            </Form.Row>
        </Form>
    );
}

export default Register;