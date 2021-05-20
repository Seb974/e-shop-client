import { isDefined } from "./utils";

export const getWeekDays = () => {
    return [
        {value: 1, label: "LUNDI", isFixed: false},
        {value: 2, label: "MARDI", isFixed: false},
        {value: 3, label: "MERCREDI", isFixed: false},
        {value: 4, label: "JEUDI", isFixed: false},
        {value: 5, label: "VENDREDI", isFixed: false},
        {value: 6, label: "SAMEDI", isFixed: false},
        {value: 0, label: "DIMANCHE", isFixed: false}
    ];
}

export const isSameAddress = (address1, address2) => {
    return isDefined(address1) && isDefined(address2) &&
           address1.address === address2.address &&
           address1.zipcode === address2.zipcode &&
           address1.address2 === address2.address2;
};

export const getWorstConstraint = (items, groupDelay) => {
    let constraint = groupDelay;
    items.map(item => {
        const productConstraint = item.product.seller.delay;
        constraint = productConstraint > constraint ? productConstraint : constraint;
    });
    return constraint;
}