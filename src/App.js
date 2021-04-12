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

const loading = (
    <div className="flone-preloader-wrapper">
        <div className="flone-preloader">
            <span></span>
            <span></span>
        </div>
    </div>
);

const App = (props) => {

    useEffect(() => {
        props.dispatch(
            loadLanguages({
                languages: {
                    en: require("./translations/english.json"),
                    fn: require("./translations/french.json"),
                    de: require("./translations/germany.json")
                }
            })
        );
    }, []);

    return (
        <DataProvider>
            <ToastProvider placement="bottom-left">
                <BreadcrumbsProvider>
                    <HashRouter>
                        <ScrollToTop>
                            <Suspense fallback={ loading }>
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
        </DataProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
