import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import DeliveryContext from '../../../../contexts/DeliveryContext';
import { isDefined, isDefinedAndNotVoid } from '../../../../helpers/utils';
import RelaypointMarker from './tools/RelaypointMarker';
import RelaypointPopup from './tools/RelaypointPopup';
import RelaypointTooltip from './tools/RelaypointTooltip';

const RelaypointTools = ({ informations, relayPointTooltip, relayPointPopup, setInformations, setRelaypointTooltip, setRelaypointPopup, setViewport, setIsRelaypoint, onClear }) => {

    const { settings } = useContext(AuthContext);
    const { relaypoints, setCondition } = useContext(DeliveryContext);
    const [ userRelaypoints, setUserRelaypoints ] = useState([]);

    useEffect(() => {
        if (isDefined(settings) && isDefinedAndNotVoid(relaypoints)) {
            const userOptions = relaypoints.filter(relaypoint => {
                return relaypoint.conditions.find(condition => {
                    return condition.userGroups.find(group => group.id === settings.id) !== undefined;
                }) !== undefined;
            });
            setUserRelaypoints(userOptions);
        }
    }, [relaypoints, settings]);

    return (
        <>
            { userRelaypoints.map(relaypoint => {
                const { id, metas } = relaypoint;
                return <RelaypointMarker
                            key={ id } 
                            position={ metas.position } 
                            relaypoint={ relaypoint } 
                            setTooltip={ setRelaypointTooltip } 
                            setPopup={ setRelaypointPopup }
                        />
                })
            }
            <RelaypointTooltip
                relaypoint={ relayPointTooltip } 
                informations={ informations } 
            />
            <RelaypointPopup
                relaypoint={ relayPointPopup } 
                informations={ informations } 
                setInformations={ setInformations } 
                setCondition={ setCondition } 
                setViewport={ setViewport } 
                setPopup={ setRelaypointPopup } 
                setTooltip={ setRelaypointTooltip } 
                onClear={ onClear } 
                setIsRelaypoint={ setIsRelaypoint }
            />
        </>
    );
}
 
export default RelaypointTools;