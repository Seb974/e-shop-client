import React from 'react';

export default React.createContext({
    cities: [],
    setCities: (value) => {},
    relaypoints: [],
    setRelaypoints: (value) => {},
    condition: {},
    setCondition: (value) => {}
});