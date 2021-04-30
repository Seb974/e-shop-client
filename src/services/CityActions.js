import api from '../config/api';

function findAll() {
    return api
        .get('/api/cities')
        .then(response => response.data['hydra:member'].sort((a, b) => (a.name > b.name) ? 1 : -1));
}

// function deleteCities(id) {
//     return api.delete('/api/cities/' + id);
// }

function find(id) {
    return api
        .get('/api/cities/' + id)
        .then(response => response.data);
}

// function update(id, priceGroup) {
//     return api.put('/api/cities/' + id, {...priceGroup});
// }

// function create(priceGroup) {
//     return api.post('/api/cities', {...priceGroup});
// }

export default {
    findAll,
    find,
    // delete: deleteCities,
    // update,
    // create
}