import React, { Fragment, useContext, useState } from "react";
import { useEffect } from "react";
import MetaTags from "react-meta-tags";
import api from "../../config/api";
import AuthContext from "../../contexts/AuthContext";
import HomeContext from "../../contexts/HomeContext";
import { isDefined } from "../../helpers/utils";
import BlackFridayContent from "./BlackFridayContent";
import BlackFridayTwoContent from "./BlackFridayTwoContent";
import ChristmasContent from "./ChristmasContent";
import DefaultContent from "./DefaultContent";
import ValentinesDayContent from "./ValentinesDayContent";

const HomeWrapper = ({ location }) => {

    const { platform } = useContext(AuthContext);
    const { homepage, setHomepage } = useContext(HomeContext);
    const [mercureOpering, setMercureOpering] = useState(false);

    return !isDefined(platform) ? <></> : (
        <Fragment>
            <MetaTags>
                <title>{ platform.name + " - Accueil" }</title>
                <meta property="title" content={ platform.name + " - Accueil" } />
                <meta property="og:title" content={ platform.name + " - Accueil" } />
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