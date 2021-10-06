import axios from 'axios';


let client = false;

const init = (baseURL) => {
  client = axios.create({
    baseURL: baseURL, // contains the version
    json: true,
    headers: {}
  });
}


const execute = async (method, resource, data) => new Promise(((resolve, reject) => {
  //client.defaults.headers.authorization = `Bearer ${cookies.get('session')}`;

  if(!client){
    console.log('FIRST TRIGGER THE INIT VIA rapi.init(baseURL)')
    return false;
  }

  return client({ method, url: resource, data }).then((req) => resolve(req.data)).catch((err) =>
  // console.log(err)
    reject(err));
}));


const put = (url, body) => new Promise((resolve) => {
    execute('put', url, body).then((user) => {
      resolve(user);
    }).catch((e) => {
      resolve({ error: e });
    });
});

const post = (url, body) => new Promise((resolve) => {
    execute('post', url, body).then((res) => {
      resolve(res);
    }).catch((e) => {
      console.log(e)
      resolve(e);
    });
});

const get = (url) => new Promise((resolve) => {
    execute('get', url).then((user) => {
      resolve(user);
    }).catch((e) => {
      console.log(e);
      resolve({ error: e });
    });
});

const remove = (url) => new Promise((resolve) => {
    execute('delete', url).then((user) => {
      resolve(user);
    }).catch((e) => {
      console.log(e);
      resolve({ error: e });
    });
});


export default {
  init,
  get,
  post,
  put,
  remove,
}
