import React, { useContext, useEffect, useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import api from '../../config/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import '../../assets/css/payment-form.css';
import { Spinner } from 'react-bootstrap';
import { multilanguage } from "redux-multilanguage";
import { isDefined } from '../../helpers/utils';
import DeliveryContext from '../../contexts/DeliveryContext';
import AuthContext from '../../contexts/AuthContext';

const PaymentForm = ({ name, available, user, cartItems, deleteAllFromCart, strings }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [show, setShow] = useState(false);
    const { selectedCatalog } = useContext(AuthContext);
    const { packages } = useContext(DeliveryContext);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [inputError, setInputError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);

    const cardStyle = {
        style: {
            base: {
                fontSize: "16px",
                color: "#424770",
                letterSpacing: "0.025em",
                fontFamily: "Source Code Pro, monospace",
                "::placeholder": {
                color: "#aab7c4"
                }
            },
            invalid: {
                color: "#9e2146"
            }
        }
    };

    useEffect(() => {
        if (show)
            createPayment();
    }, [show]);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setError(null);
        setInputError(null);
        setLoading(false);
        setProcessing(false);
        if (succeeded) {
            // deleteAllFromCart();
            window.location.replace('/#/shop');
        }
    };

    const handleChange = (e) => {
        setDisabled(e.empty);
        setInputError(e.error ? e.error.message : "");
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!stripe || !elements) {
            setError(strings["payment_error"]);
            return ;
        }
        confirmPayment();
    };

    const handleSuccess = () => {
        setShow(false);
        deleteAllFromCart();
        window.location.replace('/#/shop');
    }

    const handleRetry = () => createPayment();

    const createPayment = () => {
        setLoading(true);
         api.post('/api/create-payment', {items: cartItems, packages, area: selectedCatalog, customer: user})
            .then(({data}) => {
                setClientSecret(data.clientSecret);
                setAmount(data.amount / 100 );
                setError(null);
                setInputError(null);
                setLoading(false);
            })
            .catch(error => setError(strings["payment_error"]));
    };

    const confirmPayment = () => {
        setProcessing(true);
        stripe
            .confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardNumberElement) } })
            .then(response => {
                if (isDefined(response.error)) {
                    setError(response.error.message);
                    setProcessing(false);
                } else {
                    setError(null);
                    setInputError(null);
                    setProcessing(false);
                    setSucceeded(true);
                }
            });
    };

    return (
        <>
        <Button href="#" onClick={ handleShow } disabled={ !available }>{ name }</Button>
        <Modal show={ show } onHide={ handleClose } size="md" aria-labelledby="contained-modal-title-vcenter" centered id="payment-modal">
            <Modal.Header closeButton>
                <Modal.Title>{loading ? "Paiement" : "Paiement de " + amount.toFixed(2).replace('.', ',') + " €"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { loading ? 
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Spinner animation="border" variant="danger"/>
                        </div>
                    </div>
                : !succeeded && !error ? 
                    <Form id="payment-form" onSubmit={ handleSubmit } className="d-flex flex-column justify-content-center">
                        <label>
                            { strings["card_number"] }
                            <CardNumberElement options={ cardStyle } onChange={ handleChange }/>
                        </label>
                        <label>
                            { strings["expiration_date"] }
                            <CardExpiryElement options={ cardStyle } onChange={ handleChange }/>
                        </label>
                        <label>
                            CVC
                            <CardCvcElement options={ cardStyle } onChange={ handleChange }/>
                        </label>
                        { !inputError ? <div className="mb-3">{ " " }</div> :
                            <div className="card-error d-flex flex-column align-items-start mb-3 text-danger" role="alert">{ inputError }</div> 
                        }
                        <Form.Row>
                            <Form.Group as={Col} md={12} className="text-center" >
                                { processing ? <Spinner animation="border" variant="warning" /> :
                                    <Button id="submit" variant="primary" type="submit" disabled={ !stripe || processing || disabled || succeeded } size="lg">
                                        <span id="button-text">{ strings["pay"] }</span>
                                    </Button>
                                }
                            </Form.Group>
                        </Form.Row>
                    </Form>
                : succeeded ?
                    <div className="result-message d-flex flex-column align-items-center">
                        <h3><i className="fas fa-check-circle text-success"></i> { strings["accepted_payment"] }</h3>
                        <br/>
                        <p> 
                            <Button variant="secondary" onClick={ handleSuccess }>{ strings["back to shop"] }</Button>
                        </p>
                    </div>
                : error ? 
                    <div className="card-error d-flex flex-column align-items-center" role="alert">
                        <p>{ error }</p>
                        <br/>
                        <p>
                            <Button variant="secondary" onClick={ handleRetry }>{ strings["retry"] }</Button>
                        </p>
                    </div> 
                : <></> 
                }
            </Modal.Body>
            <Modal.Footer>
                <img src="/assets/img/icon-img/stripe-logo.png" alt="stripe-logo"/>
            </Modal.Footer>
        </Modal>
    </>
    );
}

PaymentForm.propTypes = {
    cartItems: PropTypes.array,
    deleteAllFromCart: PropTypes.func,
};

const mapStateToProps = state => {
    return {
      cartItems: state.cartData
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        deleteAllFromCart: addToast => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(PaymentForm));