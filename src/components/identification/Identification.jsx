import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Register from './Register';
import FacebookLogin from 'react-facebook-login';
import AuthContext from '../../contexts/AuthContext';
import AuthActions from '../../services/AuthActions';
import { Col, Row } from 'react-bootstrap';

const Identification = ({ name }) => {

    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const { setIsAuthenticated } = useContext(AuthContext);
    const [forgetPassword, setForgetPassword] = useState(false);

    useEffect(() => setIsLogin(true), [show]);

    const handleClose = () => setShow(false);
    const handleShow = e => {
        e.preventDefault();
        setShow(true)
    };

    const onIsLoginChange = event => {
        event.preventDefault();
        setIsLogin(!isLogin);
        if (!isLogin) 
            setForgetPassword(false);
    };

    const handleForgetPassword = e => {
        e.preventDefault();
        setForgetPassword(!forgetPassword);
    }

    const responseFacebook = response => {
        AuthActions.authenticateWithFacebook(response)
                   .then(r => {
                       setIsAuthenticated(true);
                       setShow(false);
                    })
                   .catch(error => console.log(error));
    }

    return (
        <>
            <a href="#" onClick={ handleShow }>{ name }</a> {/* className="nav-link" */}
            <Modal show={ show } onHide={ handleClose } size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title>{ isLogin ? "Connexion" : "Inscription" }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { isLogin ?
                        !forgetPassword ? 
                            <Login onEnd={ handleClose } forgetPassword={ forgetPassword }/>
                        :
                            <ForgotPassword onEnd={ handleClose }/>
                    : 
                        <Register onEnd={ handleClose }/>
                    }
                    <hr className="mx-2"/>
                    <Row>
                        <Col xs="12" lg="12" className="d-flex justify-content-center">
                            <FacebookLogin
                                appId="630008714635405"
                                autoLoad={ true }
                                fields="name,email"
                                size="small"
                                textButton={ (isLogin ? "Se connecter " : "S'enregistrer ") + "avec Facebook" }
                                language="fr_FR"
                                icon={ <i className="fa fa-facebook-square" aria-hidden="true"></i> }
                                callback={ responseFacebook }
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer style={{ width: '100%', display: 'block' }}>
                    <Row>
                        <Col xs="6" lg="6" className="d-flex justify-content-start">
                            { isLogin && !forgetPassword && <a href="#" onClick={ handleForgetPassword }>Mot de passe oublié ?</a> }
                        </Col>
                        <Col xs="6" lg="6" className="d-flex justify-content-end">
                            <a href="#" onClick={ onIsLoginChange }>{ isLogin ? "Créer un compte" : "J'ai déjà un compte" }</a>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Identification;