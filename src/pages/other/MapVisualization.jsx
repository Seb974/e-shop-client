import React, { useContext, useEffect } from 'react';
import TouringLocation from '../../components/map/touring/touringLocation';
import DeliveryContext from '../../contexts/DeliveryContext';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import TouringActions from '../../services/TouringActions';
import { Fragment } from 'react';
import { MetaTags } from 'react-meta-tags';
import LayoutSeven from '../../layouts/LayoutSeven';
import { multilanguage } from "redux-multilanguage";
import api from '../../config/api';

const MapVisualization = ({ match, location, strings }) => {
    
    const { id = "new" } = match.params;
    const { tourings, setTourings } = useContext(DeliveryContext);

    useEffect(() => fetchTourings(id), []);
    useEffect(() => fetchTourings(id), [id]);

    const fetchTourings = id => {
        if (id !== "new") {
            TouringActions
                .getOrderTouring(id)
                .then(response => setTourings(response));
        }
    };

    return (
        <Fragment>
            <MetaTags>
                <title>{ "Frais Péi, votre maraîcher en ligne - Suivi de la livraisn" }</title>
                <meta property="title" content={ "Frais Péi, votre maraîcher en ligne - Suivi de la livraisn" } />
                <meta property="og:title" content={ "Frais Péi, votre maraîcher en ligne - Suivi de la livraisn" } />
                <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
                <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
            </MetaTags>

            <LayoutSeven stick="stick">
                <div className="cart-main-area pt-90 pb-100 mt-5">
                    <div className="container">
                        <h3 className="cart-page-title">Votre commande N°{ id.padStart(10, '0')} en temps réel</h3>
                        <Row>
                            <Col xs="12" lg="12">
                                <Card>
                                    <TouringLocation tourings={ tourings }/>
                                </Card>
                            </Col>
                        </Row>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cart-shiping-update-wrapper">
                                    <div className="cart-shiping-update"></div>
                                    <div className="cart-clear">
                                        <Link to="/my-orders" className="btn btn-link">Retour à la liste</Link>
                                        {/* <Link to={process.env.PUBLIC_URL + "/shop"}>{ strings["continue_shopping"] }</Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutSeven>
        </Fragment>
    );
}
 
export default multilanguage(MapVisualization);