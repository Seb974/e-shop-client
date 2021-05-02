import api from '../config/api';

function findAll() {
    return api
        .get('/api/relaypoints')
        .then(response => response.data['hydra:member'].sort((a, b) => (a.name > b.name) ? 1 : -1));
}

// function deleteRelaypoints(id) {
//     return api.delete('/api/relaypoints/' + id);
// }

function find(id) {
    return api
        .get('/api/relaypoints/' + id)
        .then(response => response.data);
}

// function update(id, relaypoint) {
//     return api.put('/api/relaypoints/' + id, {...relaypoint});
// }

// function create(relaypoint) {
//     return api.post('/api/relaypoints', {...relaypoint});
// }

export default {
    findAll,
    find,
    // delete: deleteRelaypoints,
    // update,
    // create
}