import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PaymentForm from './PaymentForm';
import { multilanguage } from "redux-multilanguage";
import { Row } from 'react-bootstrap';

const ConfirmationAgeModal = ({ show, setShow, onConfirm, strings }) => {

    const handleClose = () => setShow(false);

    const handleConfirm = () => {
        setShow(false)
        onConfirm();
    };

    return (
        <>
            {/* <Button href="#" onClick={ handleShow } disabled={ !available }>{ name }</Button> */}
            <Modal show={ show } onHide={ handleClose } size="md" aria-labelledby="contained-modal-title-vcenter" centered id="payment-modal">
                <Modal.Header closeButton>
                    <Modal.Title><small>{ strings["confirm_age_title"] }</small></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center mb-4"><img src="/assets/img/logo/france.png" alt="france-layer" width={ 120 }/></p>
                    <p className="my-2">{ strings["confirm_question"] }</p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    {/* <Row > */}
                        <Button id="submit" variant="danger" size="sm" onClick={ handleClose }>
                            <span id="button-text">{ strings["abort"] }</span>
                        </Button>
                        <Button id="submit" variant="success" size="sm" onClick={ handleConfirm }>
                            <span id="button-text">{ strings["continue"] }</span>
                        </Button>
                    {/* </Row> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default multilanguage(ConfirmationAgeModal);