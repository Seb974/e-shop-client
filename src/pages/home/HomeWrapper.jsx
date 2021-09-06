import React, { Fragment, useContext, useState } from "react";
import { useEffect } from "react";
import MetaTags from "react-meta-tags";
import api from "../../config/api";
import HomeContext from "../../contexts/HomeContext";
import { isDefined } from "../../helpers/utils";
import BlackFridayContent from "./BlackFridayContent";
import BlackFridayTwoContent from "./BlackFridayTwoContent";
import ChristmasContent from "./ChristmasContent";
import DefaultContent from "./DefaultContent";
import ValentinesDayContent from "./ValentinesDayContent";

const HomeWrapper = ({ location }) => {

    const { homepage, setHomepage } = useContext(HomeContext);
    const [mercureOpering, setMercureOpering] = useState(false);

    return (
        <Fragment>
            <MetaTags>
                <title>{ "Frais Péi, votre maraîcher en ligne" }</title>
                <meta property="title" content={ "Frais Péi, votre maraîcher en ligne" } />
                <meta property="og:title" content={ "Frais Péi, votre maraîcher en ligne" } />
                <meta property="url" content={ api.CLIENT_DOMAIN + location.pathname } />
                <meta property="og:url" content={ api.CLIENT_DOMAIN + location.pathname } />
            </MetaTags>

            { !isDefined(homepage) || homepage.name.toUpperCase() === "DEFAULT" ?
                    <DefaultContent /> : 
                homepage.name.toUpperCase() === "CHRISTMAS" ? 
                    <ChristmasContent /> :
                homepage.name.toUpperCase() === "VALENTINES DAY" ? 
                    <ValentinesDayContent /> :
                homepage.name.toUpperCase() === "BLACK FRIDAY" ?
                    <BlackFridayContent /> : 
                    <BlackFridayTwoContent />
            }
        </Fragment>
    );
};

export default HomeWrapper;