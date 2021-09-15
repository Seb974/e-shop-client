import React, { useContext, useEffect, useState } from 'react';
import { Popup, FlyToInterpolator } from 'react-map-gl';
import AuthContext from '../../../../../contexts/AuthContext';
import { isDefined } from '../../../../../helpers/utils';

const RelaypointPopup = ({ relaypoint, setPopup }) => {

    const { settings } = useContext(AuthContext);
    const [ownCondition, setOwnCondition] = useState(undefined);

    useEffect(() => {
        const relaypointCondition = !isDefined(relaypoint) ? [] : relaypoint.conditions.find(condition => {
            return condition.userGroups.find(group => group.value === settings.value) !== undefined;
        });
        setOwnCondition(relaypointCondition);
    }, [relaypoint]);

    return !isDefined(relaypoint) || !isDefined(ownCondition) || !isDefined(ownCondition.days) ? <></> : (
        <Popup latitude={relaypoint.metas.position[0]} longitude={relaypoint.metas.position[1]} offsetLeft={10} offsetTop={-35} closeOnClick={ false } onClose={() => setPopup(undefined)}>
            <div className="d-flex flex-column align-items-center">
                 <h5 className="mb-0 mt-1">{ relaypoint.name }</h5>
                 <p className="mb-0 mt-1 text-center"> Livré les { " " }
                     { ownCondition.days.map((day, i) => {
                         return day.label + ( i < (ownCondition.days.length - 2) ? ", " : (i === (ownCondition.days.length - 2) ? " et " : ""))
                     })}
                 </p>
                 <p className="mt-1">{ relaypoint.informations }</p>
             </div>
        </Popup>
    );
}
 
export default RelaypointPopup;