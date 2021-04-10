import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Login from './Login';
import Register from './Register';

const Identification = (props) => {

    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onIsLoginChange = event => {
        event.preventDefault();
        setIsLogin(!isLogin);
    };

    return (
        <>
            <a className="nav-link" href="#" onClick={ handleShow }>Se connecter</a>
            
            <Modal show={ show } onHide={ handleClose } size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title>{ isLogin ? "Connexion" : "Inscription" }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { isLogin ? <Login onEnd={ handleClose }/> : <Register onEnd={ handleClose }/> }
                </Modal.Body>
                <Modal.Footer>
                    <a href="#" onClick={ onIsLoginChange }>{ isLogin ? "Créer un compte" : "J'ai déjà un compte" }</a>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Identification;