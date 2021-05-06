import React, { useContext } from 'react';
import DeliveryContext from '../../../../contexts/DeliveryContext';
import RelaypointMarker from './tools/RelaypointMarker';
import RelaypointPopup from './tools/RelaypointPopup';
import RelaypointTooltip from './tools/RelaypointTooltip';

const RelaypointTools = ({ informations, relayPointTooltip, relayPointPopup, setInformations, setRelaypointTooltip, setRelaypointPopup, setViewport, setIsRelaypoint, onClear }) => {

    const { relaypoints, setCondition } = useContext(DeliveryContext);

    return (
        <>
            { relaypoints.map(relaypoint => {
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