const TOKEN_KEY = 'wait-token';

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const loginf = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const isAuth = () => {
    return getToken() !== null;
}