const endpoint = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCAJO0wv7XesFKwYoFcMVkjNhbziBx7CSY';

export function safeFetch(route) {
  return fetch(`${endpoint}${route}`)
    .then((resp) => {
      return resp.json();
    });
}

const api = {
  get: () => {
    return safeFetch('');
  }
};

export default api;
