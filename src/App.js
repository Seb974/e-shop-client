import PropTypes from "prop-types";
import React, { useEffect, Suspense, useState } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import routes from './routes';
import AuthContext from './contexts/AuthContext';
import AuthActions from './services/AuthActions';
import MercureHub from './components/Mercure/MercureHub';

const loading = (
    <div className="flone-preloader-wrapper">
        <div className="flone-preloader">
            <span></span>
            <span></span>
        </div>
    </div>
);

const App = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(AuthActions.isAuthenticated());
  const [currentUser, setCurrentUser] = useState(AuthActions.getCurrentUser());
  const [eventSource, setEventSource] = useState({});

  useEffect(() => {
      AuthActions.setErrorHandler(setCurrentUser, setIsAuthenticated);
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

  useEffect(() => {
      setCurrentUser(AuthActions.getCurrentUser());
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser, eventSource, setEventSource} }>
      <MercureHub>
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
      </MercureHub>
    </AuthContext.Provider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
