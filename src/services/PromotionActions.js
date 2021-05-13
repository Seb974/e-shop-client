import api from '../config/api';

function findAll() {
    return api
        .get('/api/promotions')
        .then(response => response.data['hydra:member'].sort((a, b) => (a.name > b.name) ? 1 : -1));
}

// function deletePromotion(id) {
//     return api.delete('/api/promotions/' + id);
// }

function find(id) {
    return api
        .get('/api/promotions/' + id)
        .then(response => response.data);
}

function findByCode(code) {
    return api
        .get('/api/promotions?code=' + code)
        .then(response => response.data['hydra:member']);
}

// function update(id, promotion) {
//     return api.put('/api/promotions/' + id, {...promotion});
// }

// function create(promotion) {
//     return api.post('/api/promotions', {...promotion});
// }

export default {
    findAll,
    findByCode,
    // delete: deletePromotion,
    find,
    // update,
    // create
}