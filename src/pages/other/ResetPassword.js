import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Card from "react-bootstrap/Card";
import LayoutSeven from "../../layouts/LayoutSeven";
import { isDefined, isDefinedAndNotVoid } from "../../helpers/utils";
import { multilanguage } from "redux-multilanguage";
import AuthContext from "../../contexts/AuthContext";
import Field from "../../components/forms/Field";
import AuthActions from "../../services/AuthActions";
import { useToasts } from "react-toast-notifications";
import { Redirect } from "react-router-dom";
import api from "../../config/api";

const ResetPassword = ({ location, strings, match, history }) => {

  const { id = "new" } = match.params;
  const { pathname } = location;
  const { addToast } = useToasts();
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [reset, setReset] = useState(null);
  const defaultEmail = "unexisting";
  const defaultPasswordErrors = { newPassword: "", confirm: ""};
  const [passwordErrors, setPasswordErrors] = useState(defaultPasswordErrors);
  const [changePassword, setChangePassword] = useState({newPassword: "", confirm: ""});

  useEffect(() => fetchReset(), []);

  const fetchReset = () => {
      if (id.length >= 15) {
          AuthActions
              .findResetByToken(id)
              .then(({ data }) => {
                  const newEmail = data['hydra:member'].length > 0 ? data['hydra:member'][0] : defaultEmail;
                  setReset(data['hydra:member'][0]);
                  setEmail(newEmail);
              })
      } else {
        setEmail(defaultEmail);
      }
  };

  const handleChangePassword = ({ currentTarget }) => {
      const { name, value } = currentTarget;
      setChangePassword({...changePassword, [name]: value})
  };

  const handleChangePasswordSubmit = e => {
      e.preventDefault();
      setPasswordErrors(defaultPasswordErrors);
      const { newPassword, confirm } = changePassword;
      if (newPassword !== confirm) {
          setConfirmError();
          return ;
      }
      if (newPassword.length < 6) {
          setSizeError();
          return ;
      }
      console.log(reset);
      AuthActions
          .resetAccountPassword(reset, newPassword)
          .then(response => {
            console.log(response);
            console.log(response.data);
            response.data.success ? setUpdatePasswordSuccess() : setAuthenticationError()
            })
          .catch( error => addToast(strings["email_not_found"], { appearance: "error", autoDismiss: true}));
  };

  const setSizeError = () => {
      setPasswordErrors({ 
          confirm: " ",
          newPassword: strings["size_passwords"]
      });
  }

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
      // setTimeout(() => history.push("/"), 4000);
  };

  return email === defaultEmail ? <Redirect to="/"/> : (
    <Fragment>
      <MetaTags>
        <title>Flone | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <LayoutSeven stick="stick">
        <div className="myaccount-area pb-80 pt-100 mt-3">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-12">
                <div className="myaccount-wrapper">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <h3 className="panel-title">
                            { strings["change_password"] }
                          </h3>
                      </Card.Header>
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <form onSubmit={ handleChangePasswordSubmit }>
                                <div className="row">
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
                    </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutSeven>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  location: PropTypes.object
};

export default multilanguage(ResetPassword);
