import React, { Component, useEffect, useState } from 'react';
import { multilanguage } from "redux-multilanguage";
import { GDPRSettings, GDPRConfigBuilder, cookiesTool } from 'react-gdpr';
import '../../assets/scss/gdpr.scss';
import { Button, Modal } from 'react-bootstrap';
import { getActiveText, getAlwaysActiveText, getAnalyticsDescription, getAnalyticsTitle, getFunctionalsDescription, getFunctionalsTitle, getInactiveText, getLinkText, getMainButtonText, getMainDescription, getMainTitle } from '../../helpers/gdpr';
import { isDefined } from '../../helpers/utils';

const GDPRSettingsPanel = ({ currentLanguageCode, strings, isFooter = false }) => {

    const [show, setShow] = useState(false);
    const [language, setLanguage] = useState('fn');
    const [analyticsConsent, setAnalyticsConsent] = useState(cookiesTool.isActive("analytics"));

    useEffect(() => {
        const newLanguage = isDefined(currentLanguageCode) ? currentLanguageCode : 'fn';
        setLanguage(newLanguage);
    }, [currentLanguageCode]);

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

    const handleValidate = () => setShow(false);

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
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    )
}

export default multilanguage(GDPRSettingsPanel);