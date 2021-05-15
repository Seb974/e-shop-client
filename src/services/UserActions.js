import api from '../config/api';
import Roles from '../config/Roles';

function register(user) {
    const { name, email, password } = user;
    return api.post("/api/users", { name, email, password });
}

function findAll() {
    return api
        .get('/api/users')
        .then(response => response.data['hydra:member']);
}

function deleteUser(id) {
    return api
        .delete('/api/users/' + id);
}

function find(id) {
    return api.get('/api/users/' + id)
                .then(response => response.data);
}

function update(id, user) {
    return api.put('/api/users/' + id, user)
              .then(response => {
                  const { id, email, name, roles, metas } = response.data;
                  return {id, email, name, roles: Roles.filterRoles(roles), metas} ;
              })
}

function create(user) {
    return api.post('/api/users', user);
}

export default {
    register,
    findAll,
    delete: deleteUser,
    find, 
    update, 
    create
}