import ApiUtils from './apiUtils';

export function getUserInfo(userID) {
  return fetch(`http:///192.168.0.12:3000/users/${userID}`, { method: 'GET' })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .catch((e) => {
      console.log(e);
      throw new Error(e.message);
    });
}

export function createUser(fbData) {
  const info = {
    fbID: fbData.id,
    name: fbData.name,
  };
  const request = new Request('http:///192.168.0.12:3000/users/', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(info),
  });

  return fetch(request)
    .then(ApiUtils.checkStatus)
    .then(response => response.json());
}
