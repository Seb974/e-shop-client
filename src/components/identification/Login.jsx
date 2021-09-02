import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Field from '../../components/forms/Field';
import AuthActions from '../../services/AuthActions';
import AuthContext from '../../contexts/AuthContext';
// import FacebookLogin from 'react-facebook-login';

const Login = ({ onEnd, forgetPassword, setForgetPassword }) => {

    const { setIsAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [error, setError] = useState("");

    const handleChange = ({currentTarget}) => {
        setCredentials({...credentials, [currentTarget.name]: currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthActions.authenticate(credentials)
                   .then(response => {
                       setError("");
                       setIsAuthenticated(true);
                       onEnd();
                    })
                   .catch(error => {
                       console.log(error);
                       setError("Paramètres de connexion invalides")
                    });
    }

    // const responseFacebook = response => {
    //     console.log(response);
    //   }

    return forgetPassword ? <></> : (
        <>
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
                <Form.Group>
                    <Field
                        name="password"
                        label="Mot de passe"
                        value={ credentials.password }
                        onChange={ handleChange }
                        type="password"
                    />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} md={12} className="text-center" >
                        <Button variant="success" type="submit">S'IDENTIFIER</Button>  {/* variant="primary" style={{ backgroundColor: '#4C69B9' }} */}
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    );
}

export default Login;