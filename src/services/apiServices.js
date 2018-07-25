import ApiUtils from './apiUtils';

const host = '192.168.0.16:3000';
//const host = 'daymkrcluster0-shard-00-02-1sjio.gcp.mongodb.net:27017';

export function getUserInfoViaFB(fbID) {
  return fetch(`http://${host}/fbUsers/${fbID}`, { method: 'GET' })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .catch((e) => {
      console.log(e);
      throw new Error(e.message);
    });
}

export function getUserInfo(id) {
  return fetch(`http://${host}/getUser/${id}`, { method: 'GET' })
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
  const request = new Request(`http://${host}/users/`, {
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

export function updateDailyAPI(id, message, givenName, imagePath) {
  const info = {
    message,
    givenName,
    imagePath,
  };

  const request = new Request(`http://${host}/updateDaily/${id}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(info),
  });
  return fetch(request)
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .catch((e) => {
      console.log(e);
      throw new Error(e.message);
    });
}

export function getDaily(id) {
  return fetch(`http://${host}/getDaily/${id}`, { method: 'GET' })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .catch((e) => {
      console.log(e);
      throw new Error(e.message);
    });
}

export function incrementStreak(id) {
  return fetch(`http://${host}/incrementStreak/${id}`, { method: 'GET' })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .catch((e) => {
      console.log(e);
      throw new Error(e.message);
    });
}
