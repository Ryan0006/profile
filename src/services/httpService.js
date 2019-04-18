import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/profile/";

export function getProfile() {
  return axios.get(apiUrl);
}

export function saveProfile(profile) {
  return axios.post(apiUrl, profile);
}
