import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import DeliveryContext from '../../../../contexts/DeliveryContext';
import { isDefined, isDefinedAndNotVoid } from '../../../../helpers/utils';
import RelaypointMarker from './tools/RelaypointMarker';
import RelaypointPopup from './tools/RelaypointPopup';
import RelaypointTooltip from './tools/RelaypointTooltip';

const RelaypointTools = ({ informations, displayedRelaypoints, relayPointTooltip, relayPointPopup, setInformations, setRelaypointTooltip, setRelaypointPopup, setViewport, setIsRelaypoint, onClear, setDiscount, objectDiscount, setObjectDiscount }) => {

    const { settings } = useContext(AuthContext);
    const { relaypoints, setCondition } = useContext(DeliveryContext);
    const [ userRelaypoints, setUserRelaypoints ] = useState([]);

    useEffect(() => {
        if (isDefined(settings) && isDefinedAndNotVoid(displayedRelaypoints)) {
            const userOptions = displayedRelaypoints.filter(relaypoint => {
                return relaypoint.available && relaypoint.conditions.find(condition => {
                    return condition.userGroups.find(group => group.id === settings.id) !== undefined;
                }) !== undefined;
            });
            setUserRelaypoints(userOptions);
        }
    }, [displayedRelaypoints, settings]);

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
                objectDiscount={ objectDiscount }
                setInformations={ setInformations } 
                setCondition={ setCondition } 
                setViewport={ setViewport } 
                setPopup={ setRelaypointPopup } 
                setTooltip={ setRelaypointTooltip } 
                onClear={ onClear }
                setDiscount={ setDiscount }
                setObjectDiscount={ setObjectDiscount }
                setIsRelaypoint={ setIsRelaypoint }
            />
        </>
    );
}
 
export default RelaypointTools;