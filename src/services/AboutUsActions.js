import api from '../config/api';

function find() {
    return api
        .get('/api/about_uses')
        .then(response => response.data['hydra:member'][0]);
}

function deleteAboutUs(id) {
    return api.delete('/api/about_uses/' + id);
}

function update(id, platform) {
    return api.put('/api/about_uses/' + id, {...platform});
}

function create(platform) {
    return api.post('/api/about_uses', {...platform});
}

export default {
    find, 
    delete: deleteAboutUs,
    update,
    create
}