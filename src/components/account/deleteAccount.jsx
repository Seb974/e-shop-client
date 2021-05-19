import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../assets/css/delete-account.css';
import AuthActions from '../../services/AuthActions';
import AuthContext from '../../contexts/AuthContext';
import { useToasts } from 'react-toast-notifications';
import { multilanguage } from "redux-multilanguage";

const DeleteAccount = ({ password, setError, strings }) => {

    const { addToast } = useToasts();
    const [show, setShow] = useState(false);
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleConfirm = e => {
        e.preventDefault();
        setShow(false);
        AuthActions
            .deleteAccount(currentUser, password)
            .then(response => {
                response.isAuthenticated ?
                setDeleteAccountSuccess() :
                setAuthenticationError();
            })
            .catch( error => {
                // setAuthenticationError()
                addToast(strings["error_occured"], { appearance: "error", autoDismiss: true});
                AuthActions.logout();
            });
    };

    const setAuthenticationError = () => {
        setError(strings["invalid_password"]);
        addToast(strings["identification_failure"], { appearance: "error", autoDismiss: true});
    };
  
    const setDeleteAccountSuccess = () => {
        setError("");
        setCurrentUser(AuthActions.isAuthenticated());
        window.location.replace('/');
        addToast(strings["delete_account_successful"], { appearance: "success", autoDismiss: true});
    };


    return (
        <>
            <Button variant="danger" href="#" onClick={ handleShow } disabled={ password.length === 0 }><i className="fas fa-trash mr-2"/>{ strings["delete_account"] }</Button>
            <Modal show={ show } onHide={ handleClose } size="md" aria-labelledby="contained-modal-title-center" centered id="delete-account" style={{width: 'auto!important'}}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontSize: '1.2em'}}>{ strings["confirm_deletion"] }</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-row justify-content-around">
                        <Button id="submit" variant="danger" size="md" onClick={ handleConfirm }>
                            <span id="button-text"><i className="fas fa-trash mr-2"/>{ strings["confirm"] }</span>
                        </Button>
                        <Button id="submit" variant="dark" size="md" onClick={ handleClose }>
                            <span id="button-text"><i className="far fa-times-circle mr-2"></i>{ strings["cancel"] }</span>
                        </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}
 
export default multilanguage(DeleteAccount);