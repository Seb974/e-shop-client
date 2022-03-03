import Login from "../components/identification/Login";
import { isInSelectedCountry } from "./map";
import { isDefined, isDefinedAndNotVoid } from "./utils";

export const cardStyle = {
    style: {
        base: {
            fontSize: "16px",
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
            color: "#aab7c4"
            }
        },
        invalid: {
            color: "#9e2146"
        }
    }
};

export const updateError = "Votre paiement a bien été reçu et votre commande a bien été créée et sauvegardée.\n" +
    "Toutefois, une erreur est survenue lors de son envoi en préparation.\n" +
    "Nous vous invitons à contacter nos services sur les horaires d'ouverture, " +
    "afin que nous puissions récupérer votre commande et la traiter.";

export const getOrderToWrite = (user, informations, productCart, date, objectDiscount, message, selectedCatalog, currentUser, condition) => {
    return {
        ...user,
        deliveryDate: date,
        metas: informations,
        // metas: !informations.isRelaypoint ? informations : getCopiedMetas(informations),
        message: message,
        catalog: selectedCatalog['@id'],
        uuid: currentUser.userId,
        notification: "Email",
        appliedCondition: isDefined(condition) ? condition['@id'] : null,
        promotion: isDefined(objectDiscount) ? objectDiscount['@id'] : null,
        items: productCart.map(item => ({
            product: item.product['@id'],
            variation: isDefined(item.selectedProductColor) ? item.selectedProductColor['@id'] : null,
            size: isDefined(item.selectedProductSize) ? item.selectedProductSize['@id'] : null,
            orderedQty: item.quantity,
        })),
    };
};

const getCopiedMetas = ({ address, address2, city, phone, zipcode, position }) => ({ address, address2, city, phone, zipcode, position })

export const validateForm = (user, informations, catalog, condition, relaypoints, addToast) => {
    let errors = {};
    let isCatalogError = false;
    let notDeliverableAddress = false;
    if (!isValidName(user.name))
        errors['name'] = "Le nom n'est pas renseigné."
    if (!isValidEmail(user.email))
        errors['email'] = "L'adresse email est invalide ou non renseignée."
    if (!isValidPhoneNumber(informations.phone))
        errors['phone'] = "Le numéro de téléphone est invalide ou non renseigné."
    if (!isValidAddress(informations, catalog, condition, relaypoints))
        errors['address'] = "L'adresse n'est pas valide."
    else if (!isValidCatalog(catalog, informations)) {
        errors['address'] = "Adresse non disponible depuis le catalogue sélectionné."
        isCatalogError = true;
    } else if (!isDeliverable(catalog, condition)) {
        errors['address'] = "Pas de livraison à domicile à cette adresse."
        notDeliverableAddress = true;
    }

    if (Object.keys(errors).length > 0) {
        let message = "Des champs obligatoires ne sont pas renseignés ou sont invalides."
        if (Object.keys(errors).length === 1 && Object.keys(errors).includes('address')) {
            message = isCatalogError ? 
                "L'adresse indiquée n'est pas accessible depuis le catalogue sélectionné. Veuillez s'il vous plaît changer de catalogue ou entrer une autre addresse." :
            notDeliverableAddress ?
                "Nous n'assurons pas les livraisons à domicile sur votre commune. Choisissez un point relais sur la carte dans une ville voisine." :
                "L'adresse indiquée n'est pas valide. Choisissez parmis les propositions lors de la saisie ou sélectionnez un point-relais sur la carte";
        }
        addToast(message, { appearance: "error", autoDismiss: true, autoDismissTimeout: 10000 })
    }
    return errors;
}

export const isValidName = name => {
    return name.length > 0;
}

export const isValidEmail = email => {
    const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    return isDefinedAndNotVoid(email.match(pattern));
}

export const isValidPhoneNumber = phoneNumber => {
    const pattern1 = /^(?:(?:\+|00)33|(?:\+|00)262|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/g;
    const pattern = /^(?:(?:\+|00)33|(?:\+|00)262|0)[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/g;
    return isDefinedAndNotVoid(phoneNumber.match(pattern));
}

export const isValidAddress = (informations, catalog, condition, relaypoints) => {
    const zipPattern = /^(?:[0-9]\d|9[0-8])\d{3}$/g;
    if ( isDefinedAndNotVoid(informations.zipcode.match(zipPattern)) ) {
        const { city, address, position } = informations;
        const initialPosition = isDefined(catalog) && isDefinedAndNotVoid(catalog.center) ? catalog.center : [0, 0];
        return city.length > 0 && address.length > 0 && (!isSamePosition(position, initialPosition) || isRelaypoint(condition, relaypoints));
    }
    return false;
}

export const isValidCatalog = (catalog, informations) => {
    const { position } = informations;
    return isInSelectedCountry(position[0], position[1], catalog);
};

const isDeliverable = (catalog, condition) => {
    return isDefined(catalog) && (catalog.needsParcel || (!catalog.needsParcel && isDefined(condition)));
};

const isSamePosition = (position1, position2) => JSON.stringify(position1) === JSON.stringify(position2);

const isRelaypoint = (condition, relaypoints) => {
    if (!isDefined(condition) || !isDefinedAndNotVoid(relaypoints)) {
        return false;
    }
    const selectedRelaypoint = relaypoints.find(relaypoint => relaypoint.conditions.find(c => c.id === condition.id) !== undefined);
    return isDefined(selectedRelaypoint);
};

export const checkForRestrictions = (catalog, cart, categories, addToast = null) => {
    let hasRestriction = false;
    if (isDefinedAndNotVoid(cart) && isDefined(catalog) && isDefinedAndNotVoid(categories)) {
        let activeCategories = [];
        cart.map(item => {
          if (isDefined(item.product) && isDefinedAndNotVoid(item.product.categories)) {
              activeCategories = [...activeCategories, ...item.product.categories.map(c => c.id)];
          }
        });
        const selectedCategories = [...new Set(activeCategories)];
        const quantitiesPerCategory = selectedCategories.map(category => {
          const quantity = cart.reduce((sum, item) => {
              return sum += isDefinedAndNotVoid(item.product.categories) && item.product.categories.find(c => c.id === category) !== undefined ? item.quantity : 0;
          }, 0);
          const selection = categories.find(c => c.id === category);
          return {category: selection, quantity};
        });
        const restrictedCategories = quantitiesPerCategory.filter(c => isDefined(c.category) && c.category.restrictions.find(r => r.catalog.id === catalog.id));
        if (restrictedCategories.length > 0) {
            restrictedCategories.map(c => {
                const restriction = c.category.restrictions.find(r => r.catalog.id === catalog.id);
                if (isDefined(restriction) && c.quantity > restriction.quantity) {
                    hasRestriction = true;
                    const message = "Les livraisons sur la " + catalog.name + " de " + c.category.name + " sont limitées à " + restriction.quantity + " " + restriction.unit + '/envoi';
                    isDefined(addToast) ?
                        addToast(message, { appearance: "error", autoDismiss: true, autoDismissTimeout: 10000 }) :
                        console.log(message);
                }
            });
        }
    }
    return hasRestriction;
  };