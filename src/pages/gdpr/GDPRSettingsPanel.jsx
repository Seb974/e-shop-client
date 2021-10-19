import React, { Component, useEffect, useState } from 'react';
import { multilanguage } from "redux-multilanguage";
import { GDPRSettings, GDPRConfigBuilder, cookiesTool } from 'react-gdpr';
import '../../assets/scss/gdpr.scss';
import { Button, Modal } from 'react-bootstrap';
import { getActiveText, getAlwaysActiveText, getAnalyticsDescription, getAnalyticsTitle, getFunctionalsDescription, getFunctionalsTitle, getInactiveText, getLinkText, getMainButtonText, getMainDescription, getMainTitle } from '../../helpers/gdpr';
import { isDefined } from '../../helpers/utils';

const GDPRSettingsPanel = ({ strings, isFooter = false }) => {

    const local_storage = JSON.parse(localStorage.getItem('redux_localstorage_simple'));
    const language = isDefined(local_storage) && isDefined(local_storage.multilanguage) ? local_storage.multilanguage.currentLanguageCode : 'en';

    const [show, setShow] = useState(false);
    const [analyticsConsent, setAnalyticsConsent] = useState(cookiesTool.isActive("analytics"));

    let configBuilder = new GDPRConfigBuilder();
    configBuilder
        .setLocale(
            "",
            getMainDescription(language),
            getMainButtonText(language),
            getActiveText(language),
            getInactiveText(language),
            getAlwaysActiveText(language)
        )
        .addSetting('navigation', getFunctionalsTitle(language), getFunctionalsDescription(language), true, false)
        .addSetting('analytics', getAnalyticsTitle(language), getAnalyticsDescription(language), analyticsConsent, true)
    
    let config = configBuilder.getConfig();

    const handleShow = e => {
        e.preventDefault();
        setShow(true)
    };
    const handleClose = () => setShow(false);

    const handleToggle = (id, value) => {
        cookiesTool.setActive(id, value);
        setAnalyticsConsent(!analyticsConsent);
    }

    const handleValidate = () => {
    }

    return (
        <>
            <a href="#" onClick={ handleShow } className={ !isFooter && "text-warning" }>{ getLinkText(language) }</a>
            <Modal show={ show } onHide={ handleClose } size="md" aria-labelledby="contained-modal-title-center" style={{ padding: '5px 15px'}}>
                <Modal.Header closeButton>
                    <Modal.Title>{ getMainTitle(language) }</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '0px 15px'}}>
                    <div className="gdpr-settings-panel">
                        <GDPRSettings onValidate={ handleValidate } onToggle={ handleToggle } {...config} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <img src="/assets/img/icon-img/stripe-logo.png" alt="stripe-logo"/>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default multilanguage(GDPRSettingsPanel);