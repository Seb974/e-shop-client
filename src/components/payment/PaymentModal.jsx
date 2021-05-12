import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PaymentForm from './PaymentForm';

const PaymentModal = ({ name, available }) => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button href="#" onClick={ handleShow } disabled={ !available }>{ name }</Button>
            <Modal show={ show } onHide={ handleClose } size="md" aria-labelledby="contained-modal-title-vcenter" centered id="payment-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Paiement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PaymentForm setShow={ setShow }/>
                </Modal.Body>
                <Modal.Footer>
                    <img src="/assets/img/icon-img/stripe-logo.png" alt="stripe-logo"/>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default PaymentModal;