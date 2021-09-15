import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import AuthContext from '../../contexts/AuthContext';

const DeliveredCities = ({ cities }) => {

    const { settings } = useContext(AuthContext);

    return (
        <>
        {cities
            .map((city, i) => {
                const appliedCondition = city.conditions.find(c => c.userGroups.find(group => group.id === settings.id) !== undefined);
                return (
                    <span key={ i }>
                    <Row key={ i }>
                        <Col xs="4" lg="4">{ city.name }</Col>
                        <Col xs="4" lg="4">
                            { JSON.stringify(appliedCondition.days.map(d => d.label)) === JSON.stringify(["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"]) ? 
                                "Du lundi au samedi" :
                              JSON.stringify(appliedCondition.days) === JSON.stringify(["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI"]) ?
                                "Du lundi au vendredi" :
                                <>
                                    Les { appliedCondition.days.map((d, j) => {
                                        return d.label.toLowerCase() + (j < appliedCondition.days.length - 2 ? ', ' : j< appliedCondition.days.length - 1 ? ' et ' : '');
                                    }) }
                                </>
                            }
                        </Col>
                        <Col xs="4" lg="4">
                            {
                                appliedCondition.price === 0 ? 'Livraison gratuite' :
                                appliedCondition.minForFree > 0 ? 'Gratuit à partir de ' + appliedCondition.minForFree + '€' :
                                'Livraison à ' + appliedCondition.minForFree + '€'
                            }
                        </Col>
                    </Row>
                    <hr/>
                    </span>
                )
            })
        }
        </>
    );
}

export default DeliveredCities;