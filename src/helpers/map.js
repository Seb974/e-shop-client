import { isDefined } from "./utils";

export const checkForAlternatives = (zipcode, condition, relaypoints, settings) => {
    if (isDefined(relaypoints)) {
        let message = "Economisez sur les frais de livraison en choisissant un point relais près de chez vous.";
        const alternatives = relaypoints.filter(relaypoint => relaypoint.metas.zipcode === zipcode);
        if (isDefined(condition)) {
            const filteredAlternatives = alternatives.filter(relaypoint => relaypoint.conditions.find(c => {
                    return c.price < condition.price && c.userGroups.find(group => group.value === settings.value) !== undefined
                }) !== undefined
            );
            if (filteredAlternatives.length > 1)
                return {message, params: {appearance: "warning", autoDismiss: true, autoDismissTimeout: 10000, placement: "top-right"}};
            else 
                return null;
        } else {
            const cityName = "votre commune";
            message = alternatives.length > 0 ?
                "Nous n'assurons pas les livraisons à domicile sur " + cityName + ", mais il existe un point relais près de chez vous.":
                "Nous avons aucune offre de livraison sur "+ cityName + ". Vérifiez la présence de points relais dans les communues voisines.";
            return {message, params: {appearance: alternatives.length > 0 ? "warning" : "error", autoDismiss: true, autoDismissTimeout: 10000, placement: "top-right"}};
        }
    }
};

export const getCityCondition = (zipcode, cities, settings) => {
    const userCity = cities.find(city => city.zipCode === zipcode);
    return !isDefined(userCity) ? undefined : userCity.conditions.find(condition => {
        return condition.userGroups.find(group => group.value === settings.value)
    });
}