import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Login from './Login';
import Register from './Register';

const Identification = ({ name }) => {

    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => setIsLogin(true), [show]);

    const handleClose = () => setShow(false);
    const handleShow = e => {
        e.preventDefault();
        setShow(true)
    };

    const onIsLoginChange = event => {
        event.preventDefault();
        setIsLogin(!isLogin);
    };

    return (
        <>
            <a href="#" onClick={ handleShow }>{ name }</a> {/* className="nav-link" */}
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