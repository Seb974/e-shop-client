import api from "../config/api";
import { isDefined } from "../helpers/utils";

function findAll() {
    return api
        .get('/api/containers')
        .then(response => response.data['hydra:member'].filter(container => container.available).sort((a, b) => (a.max < b.max) ? -1 : 1));
}

function deleteContainer(id) {
    return api.delete('/api/containers/' + id);
}

function find(id) {
    return api
        .get('/api/containers/' + id)
        .then(response => response.data);
}

function findAvailable(userGroup) {
    const group = isDefined(userGroup) ? `group[]=${ userGroup.value }&` : '';
    return api
        .get(`/api/containers?available=true&${ group }order[name]=asc`)
        .then(response => response.data['hydra:member']);
}

function update(id, container) {
    return api.put('/api/containers/' + id, {...container});
}

function create(container) {
    return api.post('/api/containers', {...container});
}

export default {
    findAll,
    findAvailable,
    delete: deleteContainer,
    find,
    update,
    create
}