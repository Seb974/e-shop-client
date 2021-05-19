import api from '../config/api';

function findByCode(code) {
    return api
        .get('/api/promotions?code=' + code)
        .then(response => response.data['hydra:member']);
}
export default {
    findByCode
}