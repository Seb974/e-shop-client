import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutSeven from "../../layouts/LayoutSeven";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { isDefined } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../contexts/AuthContext";
import AccountMap from "../../components/map/account/Map";
import ContactPanel from "../../components/forms/contact/ContactPanel";
import Field from "../../components/forms/Field";
import AuthActions from "../../services/AuthActions";
import UserAactions from "../../services/UserActions";
import { useToasts } from "react-toast-notifications";
import DeleteAccount from "../../components/account/deleteAccount";

const MyAccount = ({ location, strings }) => {

  const { pathname } = location;
  const { addToast } = useToasts();
  const { currentUser, country, settings, selectedCatalog, setCurrentUser } = useContext(AuthContext);
  const defaultPasswordErrors = { current: "", newPassword: "", confirm: ""};
  const defaultInformationsErrors = {name:"", email: "", phone: "", address: "", address2: "", zipcode: "", city: "", position: ""};
  const initialInformations = { phone: '', address: '', address2: '', zipcode: '', city: '', position: isDefined(selectedCatalog) ? selectedCatalog.center : [0, 0]};
  const [informations, setInformations] = useState(initialInformations);
  const [user, setUser] = useState({name:"", email: ""});
  const [deletePassword, setDeletePassword] = useState("")
  const [deletePasswordError, setDeletePasswordError] = useState("")
  const [informationsErrors, setInformationsErrors] = useState(defaultInformationsErrors);
  const [passwordErrors, setPasswordErrors] = useState(defaultPasswordErrors);
  const [changePassword, setChangePassword] = useState({current: "", newPassword: "", confirm: ""});

  useEffect(() => setDataUser(), []);
  useEffect(() => setDataUser(), [currentUser]);

  const onUserInputChange = (newUser) => setUser(newUser);
  const onPhoneChange = (phone) => setInformations(informations => ({...informations, phone}));
  const handleDeletePasswordChange = ({ currentTarget }) => setDeletePassword(currentTarget.value);

  const handleChangePassword = ({ currentTarget }) => {
      const { name, value } = currentTarget;
      setChangePassword({...changePassword, [name]: value})
  };

  const handleInformationsSubmit = e => {
      e.preventDefault();
      const { name, email, roles, ...dbUser } = currentUser;
      const newUser = {...dbUser, ...user, metas: {...currentUser.metas, ...informations} };
      console.log(newUser);
      UserAactions
          .update(currentUser.id, {...dbUser, ...user, metas: informations })
          .then(response => setUpdateInformationsSuccess(response))
          .catch( ({ response }) => {
            if (response) {
                const { violations } = response.data;
                if (violations) {
                    const apiErrors = {};
                    violations.forEach(({propertyPath, message}) => {
                        apiErrors[propertyPath] = message;
                    });
                    setInformationsErrors(apiErrors);
                }
                //TODO : Flash notification d'erreur
            }
        });
  }

  const handleChangePasswordSubmit = e => {
      e.preventDefault();
      const { current, newPassword, confirm } = changePassword;
      if (newPassword !== confirm) {
          setConfirmError();
          return ;
      }
      AuthActions
          .updatePassword(currentUser, {current, newPassword})
          .then(response => {
              response.isAuthenticated ? 
                  setUpdatePasswordSuccess() : 
                  setAuthenticationError();
          })
          .catch( error => {
              // setAuthenticationError()
              addToast(strings["error_occured"], { appearance: "error", autoDismiss: true});
          });
  };

  const setDataUser = () => {
      if (currentUser.id !== -1) {
          const { name, email } = currentUser;
          setUser({ name, email });
          if (isDefined(currentUser.metas) && isDefined(currentUser.metas.address) && JSON.stringify(informations) === JSON.stringify(initialInformations)) {
              setInformations(currentUser.metas);
          }
      }
  };

  const setConfirmError = () => {
      setPasswordErrors({ 
          confirm: strings["mismatch_passwords"],
          newPassword: " "
      });
  };

  const setAuthenticationError = () => {
      setPasswordErrors({ current: strings["invalid_password"]});
      addToast(strings["identification_failure"], { appearance: "error", autoDismiss: true});
  };

  const setUpdatePasswordSuccess = () => {
      addToast(strings["update_password_successful"], { appearance: "success", autoDismiss: true});
      setPasswordErrors(defaultPasswordErrors);
      setChangePassword(defaultPasswordErrors);
  };

  const setUpdateInformationsSuccess = (response) => {
      console.log(response);
      addToast(strings["update_informations_successful"], { appearance: "success", autoDismiss: true});
      setInformationsErrors(defaultInformationsErrors);
      setCurrentUser(response);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>My Account</BreadcrumbsItem> */}

      <LayoutSeven stick="stick">
        {/* breadcrumb */}
        {/* <Breadcrumb /> */}
        <div className="myaccount-area pb-80 pt-100 mt-3">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span>{ strings["edit_informations"] }{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                              <form onSubmit={ handleInformationsSubmit }>
                                  <div className="account-info-wrapper">
                                    <h5>{ strings["personal_details"] }</h5>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-12">
                                          <div className="billing-info-wrap">
                                            <ContactPanel
                                                user={ user }
                                                phone={ informations.phone }
                                                onUserChange={ onUserInputChange }
                                                onPhoneChange={ onPhoneChange }
                                                errors={ informationsErrors }
                                            />
                                            <div className="mb-4"></div>
                                            <AccountMap
                                                informations={ informations }
                                                setInformations={ setInformations }
                                                errors={ informationsErrors }
                                            />
                                          </div>
                                      </div>
                                  </div>
                                  <div className="billing-back-btn mt-1">
                                    <div className="billing-btn">
                                      <button type="submit" >{ strings["save"] }</button>
                                    </div>
                                  </div>
                              </form>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span>{ strings["change_password"] }
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <form onSubmit={ handleChangePasswordSubmit }>
                                {/* <div className="account-info-wrapper">
                                  <h4>Change Password</h4>
                                  <h5>Your Password</h5>
                                </div> */}
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                      <Field 
                                          name="current"
                                          type="password"
                                          label={ strings["current_password"] }
                                          value={ changePassword.current }
                                          onChange={ handleChangePassword }
                                          placeholder=" "
                                          error={ passwordErrors.current }
                                          required={ true }
                                      />
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                      <Field 
                                          name="newPassword"
                                          type="password"
                                          label={ strings["new_password"] }
                                          value={ changePassword.newPassword }
                                          onChange={ handleChangePassword }
                                          placeholder=" "
                                          error={ passwordErrors.newPassword }
                                          required={ true }
                                      />
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                      <Field 
                                          name="confirm"
                                          type="password"
                                          label={ strings["confirm_password"] }
                                          value={ changePassword.confirm }
                                          onChange={ handleChangePassword }
                                          placeholder=" "
                                          error={ passwordErrors.confirm }
                                          required={ true }
                                      />
                                  </div>
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <button type="submit">{ strings["save"] }</button>
                                  </div>
                                </div>
                            </form>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span>{ strings["delete_account"] }
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <form onSubmit={ handleChangePasswordSubmit }>
                                <div className="account-info-wrapper">
                                  <h5><i className="fas fa-exclamation-triangle mr-2 text-danger"></i>{ strings["irreversible_action"] }</h5>
                                </div>
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                      <Field 
                                          name="current"
                                          type="password"
                                          label={ strings["current_password"] }
                                          value={ deletePassword }
                                          onChange={ handleDeletePasswordChange }
                                          placeholder=" "
                                          error={ deletePasswordError }
                                          required={ true }
                                      />
                                  </div>
                                </div>
                                <div className="row mt-4 mr-1 d-flex justify-content-center ml-1">
                                    <DeleteAccount password={ deletePassword } setError={ setDeletePasswordError }/>
                                </div>
                            </form>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutSeven>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object
};

export default multilanguage(MyAccount);
