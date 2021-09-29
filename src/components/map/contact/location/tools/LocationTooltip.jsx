import React, { useContext, useEffect, useState } from 'react';
import { Popup } from 'react-map-gl';
import AuthContext from '../../../../../contexts/AuthContext';
import { isDefined } from '../../../../../helpers/utils';
import { multilanguage } from "redux-multilanguage";

const LocationTooltip = ({ location, strings }) => {

    const { selectedCatalog } = useContext(AuthContext);

    return !isDefined(location) || JSON.stringify(location.position) === JSON.stringify(selectedCatalog.center) ? <></> : (
        <Popup latitude={location.position[0]} longitude={location.position[1]} offsetLeft={10} offsetTop={-35}>
            <div className="text-center">
                <h4 className="mb-0">{ strings["our_address"] }</h4>
                <p className="mb-0 mt-0">{ location.address }</p>
            </div>
        </Popup>
    );
}

export default multilanguage(LocationTooltip);