import PropTypes from "prop-types";
import React, { useEffect, Suspense } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { Switch, Route, HashRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import routes from './routes';
import DataProvider from "./data/dataProvider/dataProvider";
import 'mapbox-gl/dist/mapbox-gl.css';

import CookieConsent from "react-cookie-consent";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import en from "./translations/english.json";
import fn from "./translations/french.json";
import de from "./translations/germany.json";
import GDPRSettingsPanel from "./pages/gdpr/GDPRSettingsPanel";
import { isDefined } from "./helpers/utils";
// import HelmetMetaData from "./config/helmetMetadata";

const loading = (
    <div className="flone-preloader-wrapper">
        <div className="flone-preloader">
            <span></span>
            <span></span>
        </div>
    </div>
);

const stripePromise = loadStripe("pk_test_51I4RT9KtG62ZyJyqGD3WG0rqQCXyzZirW9GhFVE4Moq8HsMcMcV8y42fTbYihbTUTfMugi6FzdBHuz1uOyr4G7If008xMpch8a");

const App = (props) => {

    useEffect(() => {
        props.dispatch( loadLanguages({languages: { en, fn, de }}) );
    }, []);

    return (
        <Elements stripe={ stripePromise }>
            <DataProvider>
                <ToastProvider placement="bottom-left">
                    <BreadcrumbsProvider>
                        <HashRouter>
                            <ScrollToTop>
                                <Suspense fallback={ loading }>
                                    {/* <HelmetMetaData></HelmetMetaData> */}
                                    <Switch>
                                        { routes.map((route, index) => {
                                            return route.component && (
                                                <Route
                                                    key={ index }
                                                    path={ route.path }
                                                    exact={ route.exact }
                                                    name={ route.name }
                                                    render={ props => <route.component {...props} />}
                                                />
                                            )
                                        })
                                        }
                                    </Switch>
                                </Suspense>
                            </ScrollToTop>
                        </HashRouter>
                    </BreadcrumbsProvider>
                </ToastProvider>
                <CookieConsent
                    debug={ false }
                    location="bottom"
                    buttonText={ isDefined(props) && isDefined(props.strings) && props.strings["accept"] }
                    cookieName="gdpr-analytics"
                    cookieValue={ 1 }
                    declineCookieValue={ 0 }
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                    expires={150}
                    enableDeclineButton
                    declineButtonText={ isDefined(props) && isDefined(props.strings) && props.strings["refuse"] }
                >
                    <i className="fas fa-cookie mr-2 text-warning"></i>{ isDefined(props) && isDefined(props.strings) && props.strings["cookie_warning"] }{" "}
                    <span style={{ fontSize: "10px", marginLeft: '15px'}}><GDPRSettingsPanel /></span>
                </CookieConsent>
            </DataProvider>
        </Elements>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
