import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";

const userInfo = localStorage.getItem("user");
if (userInfo) {
  let userData = JSON.parse(userInfo);
  axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
}

export async function csrfCookie() {
  return await axios({
    method: 'get',
    url: 'sanctum/csrf-cookie',
    baseURL: 'http://localhost:8000/',
  });
}

export async function postLogin(credentials) {
  return await axios.post("login", credentials);
}

export async function postRegister(parameters) {
  return await axios.post("register", parameters);
}

export async function getList() {
  return await axios.get("tickets");
}

export async function postSolicit(parameters) {
  return await axios.post("tickets", parameters);
}

export async function patchApprove(parameters) {
  return await axios.patch("tickets", parameters);
}

export default {
  csrfCookie,
  postLogin,
  postRegister,
  getList,
  postSolicit,
  patchApprove,
};