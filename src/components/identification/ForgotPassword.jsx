import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Field from '../forms/Field';
import { multilanguage } from "redux-multilanguage";
import AuthActions from '../../services/AuthActions';
import AuthContext from '../../contexts/AuthContext';
import { useToasts } from "react-toast-notifications";

const ForgotPassword = ({ onEnd, setLoading, strings }) => {

    const { addToast } = useToasts();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({username: ''});
    const [error, setError] = useState("");

    const handleChange = ({currentTarget}) => {
        setCredentials({...credentials, [currentTarget.name]: currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        AuthActions.resetPassword(credentials.username)
                   .then(response => {
                       setError("");
                       setIsAuthenticated(true);
                       setLoading(false);
                       onEnd();
                       addToast(strings["reset_password_success"], { appearance: "success", autoDismiss: true});
                    })
                   .catch(error => {
                       console.log(error);
                       setLoading(false);
                       setError("Paramètres de connexion invalides")
                    });
    }

    return (
        <Form onSubmit={ handleSubmit }>
            <Form.Group>
                <Field
                    name="username"
                    label="Adresse email"
                    value={ credentials.username }
                    onChange={ handleChange }
                    placeholder="Adresse email de connexion"
                    type="email"
                    error={error}
                />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} md={12} className="text-center" >
                    <Button variant="success" type="submit">RÉINITIALISER</Button>
                </Form.Group>
            </Form.Row>
        </Form>
    );
}

export default multilanguage(ForgotPassword);