import React, { useEffect, useState } from 'react';
import { Popup } from 'react-map-gl';
import { isDefined } from '../../../../../helpers/utils';
import { multilanguage } from "redux-multilanguage";

const RelaypointTooltip = ({ relaypoint, strings }) => {

    return !isDefined(relaypoint) ? <></> : (
        <Popup latitude={relaypoint.metas.position[0]} longitude={relaypoint.metas.position[1]} offsetLeft={10} offsetTop={-35}>
            <div className="text-center">
                <p className="mb-0">{ relaypoint.name }</p>
                <p className="mb-0 mt-0">{ relaypoint.metas.city }</p>
                <small className="mt-0">({strings["relay_details"]})</small>
            </div>
        </Popup>
    );
}
 
export default multilanguage(RelaypointTooltip);