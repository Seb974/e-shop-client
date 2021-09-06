import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutSeven from "../../layouts/LayoutSeven";
import PlatformActions from "../../services/PlatformActions";
import { isDefined } from "../../helpers/utils";
import ContactMap from "../../components/map/contact/Map";
import AuthContext from "../../contexts/AuthContext";
import api from "../../config/api";

const Contact = ({ location }) => {

  const { pathname } = location;
  const { selectedCatalog } = useContext(AuthContext);
  const defaultInformationsErrors = {name:"", email: "", phone: "", address: "", address2: "", zipcode: "", city: "", position: ""};
  const initialInformations = { phone: '', address: '', address2: '', zipcode: '', city: '', position: isDefined(selectedCatalog) ? selectedCatalog.center : [0, 0]};
  const [platform, setPlatform] = useState(null);
  const [informations, setInformations] = useState(initialInformations);
  const [informationsErrors, setInformationsErrors] = useState(defaultInformationsErrors);

  useEffect(() => fetchPlatform(), [])
  
  const fetchPlatform = () => {
      PlatformActions
        .find()
        .then(response => {
          setPlatform(response);
          setInformations(response.metas);
        });
  };

  return !isDefined(platform) ? <></> : (
    <Fragment>
      <MetaTags>
          <title>{ "Frais Péi, votre maraîcher en ligne - Contact" }</title>
          <meta property="title" content={ "Frais Péi, votre maraîcher en ligne - Contact" } />
          <meta property="og:title" content={ "Frais Péi, votre maraîcher en ligne - Contact" } />
          <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
          <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
      </MetaTags>

      <LayoutSeven stick="stick">
        <div className="contact-area pt-100 pb-100 mt-3">
          <div className="container">
            <div className="contact-map mb-10">
              <ContactMap
                  informations={ informations }
                  setInformations={ setInformations }
                  isFixed={ true }
                  errors={ informationsErrors }
              />
            </div>
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      { platform.metas.phone }
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:koifai@fraispei.re">koifai@fraispei.re</a>
                      </p>
                      <p>
                        <a href="https://fraispei.re">https://fraispei.re</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      { platform.metas.address }
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input name="name" placeholder="Name*" type="text" />
                      </div>
                      <div className="col-lg-6">
                        <input name="email" placeholder="Email*" type="email" />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Subject*"
                          type="text"
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message*"
                          defaultValue={""}
                        />
                        <button className="submit" type="submit">
                          SEND
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutSeven>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object
};

export default Contact;
