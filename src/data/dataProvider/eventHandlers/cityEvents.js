import Roles from "../../../config/Roles";
import { isDefined } from "../../../helpers/utils";

export const updateCities = (cities, setCities, condition, setCondition, data, setData) => {
    
    let updatedCities = cities;
    const newData = data.map(entity => {
        updatedCities = entity['@id'].includes('cities') ?
                            treatCity(entity, updatedCities) :
                            treatCondition(entity, updatedCities, condition, setCondition);
        return {...entity, treated: true};
    });

    setCities(updatedCities);
    setData(newData.filter(d => !isDefined(d.treated)));

    return new Promise((resolve, reject) => resolve(false));
};

const treatCity = (city, updatedCities) => {
    return !isDefined(city.id) ? [...updatedCities].filter(c => c['@id'] !== city['@id']) : getUpdatedCities(city, updatedCities);
};

const treatCondition = (newCondition, updatedCities, condition, setCondition) => {
    updateCurrentConditionIfNeeded(newCondition, condition, setCondition);
    const linkedCity = updatedCities.find(city => city.conditions.find(c => c['@id'] === newCondition['@id']) !== undefined);
    return !isDefined(linkedCity) ? updatedCities :
            updatedCities.map(city => city.id !== linkedCity.id ? city : {...linkedCity, conditions: city.conditions.map(c => c['@id'] !== newCondition['@id'] ? c : newCondition)});
};

const getUpdatedCities = (newCity, updatedCities) => {
    const index = updatedCities.findIndex(c => c.id === newCity.id);
    return index !== -1 ? updatedCities.map(c => c.id !== newCity.id ? c : newCity) : [...updatedCities, newCity];
};

const updateCurrentConditionIfNeeded = (newCondition, condition, setCondition) => {
    if (newCondition.id === condition.id)
        setCondition(newCondition);
};