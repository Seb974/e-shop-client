import api from '../config/api';

function create(message) {
    return api.post('/api/messages', message);
}

export default { create }