import api from "../config/api";

function findAll() {
    return api
        .get('/api/heroes')
        .then(response => response.data['hydra:member'].sort((a, b) => (a.homepage.name > b.homepage.name) ? 1 : -1));
}

function deleteHero(id) {
    return api.delete('/api/heroes/' + id);
}

function find(id) {
    return api
        .get('/api/heroes/' + id)
        .then(response => response.data);
}

function update(id, hero) {
    return api.put('/api/heroes/' + id, {...hero});
}

function create(hero) {
    return api.post('/api/heroes', {...hero});
}

export default { 
    findAll,
    delete: deleteHero,
    find,
    update,
    create
}