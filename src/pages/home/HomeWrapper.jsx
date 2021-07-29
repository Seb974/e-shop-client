import React, { Fragment, useContext } from "react";
import { useEffect } from "react";
import MetaTags from "react-meta-tags";
import HomeContext from "../../contexts/HomeContext";
import { isDefined } from "../../helpers/utils";
import BlackFridayContent from "./BlackFridayContent";
import BlackFridayTwoContent from "./BlackFridayTwoContent";
import ChristmasContent from "./ChristmasContent";
import DefaultContent from "./DefaultContent";
import ValentinesDayContent from "./ValentinesDayContent";

const HomeWrapper = () => {

    const { homepage } = useContext(HomeContext);

    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Auto parts Home</title>
                <meta
                name="description"
                content="Auto parts home of flone react minimalist eCommerce template."
                />
            </MetaTags>
            { !isDefined(homepage) || homepage.name.toUpperCase() === "DEFAULT" ?
                    <DefaultContent /> : 
                homepage.name.toUpperCase() === "CHRISTMAS" ? 
                    <ChristmasContent /> :
                homepage.name.toUpperCase() === "VALENTINES DAY" ? 
                    <ValentinesDayContent /> :
                homepage.name.toUpperCase() === "BLACK FRIDAY" ?
                    <BlackFridayContent /> : <BlackFridayTwoContent />
            }
        </Fragment>
    );
};

export default HomeWrapper;