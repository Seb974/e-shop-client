import PropTypes from "prop-types";
import React, { useState } from "react";
import { multilanguage } from "redux-multilanguage";
import AuthActions from "../../../services/AuthActions";

const SubscribeEmail = ({ strings }) => {

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const errorMessage = "Une erreur est survenue. Veuillez s'il vous plaît réessayer ultérieurement."
  const successMessage = "Votre adresse email a bien été ajouté à notre liste de diffusion de la newsletter";

  const handleChange = ({ currentTarget }) => setEmail(currentTarget.value);

  const handlesubmit = () => {
    setStatus("sending");
    setEmail("");
    AuthActions
        .subscribeToNewsletter(email)
        .then(response => {
            const serverMessage = response.data.status === 'done' ? successMessage : errorMessage;
            const serverStatus = response.data.status === 'done' ? "success" : "error";
            setMessage(serverMessage);
            setStatus(serverStatus);
            reinitializeStatus();
        })
        .catch(error => {
            setMessage(errorMessage);
            setStatus("error");
            reinitializeStatus();
        });
  };

  const reinitializeStatus = () => {
    setTimeout(() => {
        setStatus("");
        setMessage("");
  }, 4000);
  }

  return (
    <div>
      <div className="subscribe-form">
        <div className="mc-form">
          <div>
            <input
              id="mc-form-email"
              className="email"
              type="email"
              placeholder={strings["your_email_address"]}
              value={ email }
              onChange={ handleChange }
            />
          </div>
          <div className="clear">
            <button className="button" onClick={ handlesubmit }>
                {strings["subscribe_button"]}
            </button>
          </div>
        </div>

        {status === "sending" && (
          <div style={{ color: "#3498db", fontSize: "12px" }}>sending...</div>
        )}
        {status === "error" && (
          <div
            style={{ color: "#e74c3c", fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            style={{ color: "#2ecc71", fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </div>
    </div>
  );
};

SubscribeEmail.propTypes = {
  mailchimpUrl: PropTypes.string
};

export default multilanguage(SubscribeEmail);
