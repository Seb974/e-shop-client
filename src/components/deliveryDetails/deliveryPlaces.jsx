import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Tabs } from 'react-bootstrap';
import { Tab } from 'bootstrap';
import Map from '../map/deliveryDetails/Map';
import DeliveryContext from '../../contexts/DeliveryContext';
import RelaypointActions from '../../services/RelaypointActions';
import DeliveredCities from './deliveredCities';
import AuthContext from '../../contexts/AuthContext';
import CityActions from '../../services/CityActions';
import { isDefined, isDefinedAndNotVoid } from '../../helpers/utils';

const DeliveryPlaces = ({ name, color }) => {

    const { settings, catalogs } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [cities, setCities] = useState([]);
    const { relaypoints, setRelaypoints } = useContext(DeliveryContext);

    useEffect(() => {
        fetchCities();
        fetchRelaypoints();
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = e => {
        e.preventDefault();
        setShow(true)
    };

    const fetchRelaypoints = () => {
        RelaypointActions
            .findAll()
            .then(response => {
                const userRelaypoints = response.filter(r => r.available && !r.private)
                setRelaypoints(userRelaypoints);
            })
    };

    const fetchCities = () => {
        CityActions
             .findAll()
             .then(response => {
                 const userCities = response.filter(c => c.conditions.find(condition => {
                     return condition.userGroups.find(group => group.id === settings.id) !== undefined;
                 }) !== undefined);
                 setCities(userCities);
             });
     };

    return (
        <>
            <a href="#" onClick={ handleShow } style={{ color: color, borderColor: color }}><i className="fa fa-long-arrow-right" /></a> {/* className="nav-link" */}
            <Modal show={ show } onHide={ handleClose } size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title>Les zones de livraison</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ minHeight: '648px', maxHeight: '648px', overflow: 'scroll'}}>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="home" title="A domicile">
                        <DeliveredCities cities={ cities }/>
                    </Tab>
                    <Tab eventKey="profile" title="En points relais">
                        <Map displayedRelaypoints={ relaypoints }/>
                    </Tab>
                    { isDefinedAndNotVoid(catalogs) && catalogs.filter(c => isDefined(c.isActive) && c.isActive && c.needsParcel).length > 0 &&
                        <Tab eventKey="contact" title="Hors Réunion">
                            <Row className="my-4">
                                <Col className="mx-2">
                                    Les livraisons hors réunion sont effectuées à votre domicile ou bureau par notre partenaire <span style={{ color: 'blue' }}>Chronopost</span>,
                                    dans un délais de 48 à 72h suivant la date d'expédition.
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col className="d-flex justify-content-center mt-4">
                                    <img src={ process.env.PUBLIC_URL + '/assets/img/logo/logo-chronopost.jpeg' }/>
                                </Col>
                            </Row>
                        </Tab>
                    }
                </Tabs>
                </Modal.Body>
                <Modal.Footer style={{ width: '100%', display: 'block' }}>
                    <Row>
                        <Col xs="6" lg="6" className="d-flex justify-content-start">
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeliveryPlaces;