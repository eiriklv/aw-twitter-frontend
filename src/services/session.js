const API_URL = 'http://localhost:3333';

export async function getLoginToken({ username, password }) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password }),
  })
  .then((res) => res.json());
}
