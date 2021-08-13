import api from "../config/api";

function findAll() {
    return api
        .get('/api/articles')
        .then(response => response.data['hydra:member'].sort((a, b) => (a.publishedAt > b.publishedAt) ? -1 : 1));
}

function deleteArticle(id) {
    return api.delete('/api/articles/' + id);
}

function find(id) {
    return api
        .get('/api/articles/' + id)
        .then(response => response.data);
}

function update(id, article) {
    return api.put('/api/articles/' + id, {...article});
}

function create(article) {
    return api.post('/api/articles', {...article});
}


export default {
    findAll,
    delete: deleteArticle,
    find,
    update,
    create
}