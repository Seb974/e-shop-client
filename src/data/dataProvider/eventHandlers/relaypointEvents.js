import Roles from "../../../config/Roles";
import { isDefined } from "../../../helpers/utils";

export const updateRelaypoints = (relaypoints, setRelaypoints, condition, setCondition, data, setData) => {
    
    let updatedRelaypoints = relaypoints;
    const newData = data.map(entity => {
        updatedRelaypoints = entity['@id'].includes('relaypoints') ? 
                                treatRelaypoint(entity, updatedRelaypoints) :
                             entity['@id'].includes('conditions') ?
                                treatCondition(entity, updatedRelaypoints, condition, setCondition) :
                                treatMeta(entity, updatedRelaypoints);
        return {...entity, treated: true};
    });

    setRelaypoints(updatedRelaypoints);
    setData(newData.filter(d => !isDefined(d.treated)));

    return new Promise((resolve, reject) => resolve(false));
};

const treatRelaypoint = (relaypoint, updatedRelaypoints) => {
    return !isDefined(relaypoint.id) ? [...updatedRelaypoints].filter(r => r['@id'] !== relaypoint['@id']) : getUpdatedRelaypoints(relaypoint, updatedRelaypoints);
};

const treatCondition = (newCondition, updatedRelaypoints, condition, setCondition) => {
    updateCurrentConditionIfNeeded(newCondition, condition, setCondition);
    const linkedRelaypoint = updatedRelaypoints.find(r => r.conditions.find(c => c['@id'] === newCondition['@id']) !== undefined);
    return !isDefined(linkedRelaypoint) ? updatedRelaypoints :
            updatedRelaypoints.map(r => r.id !== linkedRelaypoint.id ? r : {...linkedRelaypoint, conditions: r.conditions.map(c => c['@id'] !== newCondition['@id'] ? c : newCondition)});
};

const treatMeta = (meta, updatedRelaypoints) => {
    const linkedRelaypoint = updatedRelaypoints.find(r => r.metas['@id'] === meta['@id']);
    return  !isDefined(linkedRelaypoint) ? updatedRelaypoints :
            updatedRelaypoints.map(r => r.id !== linkedRelaypoint.id ? r : {...linkedRelaypoint, metas: meta});
};

const getUpdatedRelaypoints = (newRelaypoint, updatedRelaypoints) => {
    const index = updatedRelaypoints.findIndex(r => r.id === newRelaypoint.id);
    return index !== -1 ? updatedRelaypoints.map(r => r.id !== newRelaypoint.id ? r : newRelaypoint) : [...updatedRelaypoints, newRelaypoint];
};

const updateCurrentConditionIfNeeded = (newCondition, condition, setCondition) => {
    if (newCondition.id === condition.id)
        setCondition(newCondition);
};