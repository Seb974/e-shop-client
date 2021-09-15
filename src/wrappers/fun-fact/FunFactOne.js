import PropTypes from "prop-types";
import React from "react";
import funFactData from "../../data/fun-fact/fun-fact-one.json";
import FunFactOneSingle from "../../components/fun-fact/FunFactOneSingle.js";
import { isDefined } from "../../helpers/utils";

const FunFactOne = ({ spaceTopClass, spaceBottomClass, bgClass, data, products, relaypoints, sellers }) => {
  return (
    <div
      className={`funfact-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${bgClass ? bgClass : ""}`}
    >
      <div className="container">
        <div className="row">
          { isDefined(data) &&
              <>
                <FunFactOneSingle
                  data={{title: 'Produits', iconClass: 'fas fa-gifts', countNum: products.length }}
                  spaceBottomClass="mb-30"
                  textAlignClass="text-center"
                />
                <FunFactOneSingle
                  data={{title: 'Points relais', iconClass: 'fas fa-map-marker-alt', countNum: relaypoints.length }}
                  spaceBottomClass="mb-30"
                  textAlignClass="text-center"
                />
                <FunFactOneSingle
                  data={{title: 'Distinctions', iconClass: 'fas fa-trophy', countNum: 2 }}
                  spaceBottomClass="mb-30"
                  textAlignClass="text-center"
                />
                <FunFactOneSingle
                  data={{title: 'Partenaires', iconClass: 'fas fa-handshake', countNum: sellers.length }}
                  spaceBottomClass="mb-30"
                  textAlignClass="text-center"
                />
              </>
          }
        </div>
      </div>
    </div>
  );
};

FunFactOne.propTypes = {
  bgClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default FunFactOne;
