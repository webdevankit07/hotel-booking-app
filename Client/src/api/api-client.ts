import axios from 'axios';

export const validateToken = async () => {
    const res = await axios.get('/api/v1/users/auth/validate-token', {
        withCredentials: true,
    });

    if (!(res.statusText === 'OK')) {
        throw new Error('token invalid');
    }

    return null;
};
