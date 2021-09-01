import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Register from './Register';

const Identification = ({ name }) => {

    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
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
                        <Register onEnd={ handleClose }/> }
                </Modal.Body>
                <Modal.Footer>
                    { isLogin && !forgetPassword && <a href="#" onClick={ handleForgetPassword }>Mot de passe oublié ?</a> }
                    <a href="#" onClick={ onIsLoginChange }>{ isLogin ? "Créer un compte" : "J'ai déjà un compte" }</a>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Identification;