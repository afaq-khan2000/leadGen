import axios from "./axios";
// send

class Routes {
  // change password - api handler
  async register(data) {
    const response = await axios.post(`/auth/register`, data);
    console.log(response);
    return response;
  }

  async login(data) {
    const response = await axios.post(`/auth/login`, data);
    console.log(response);
    return response;
  }
}

export default new Routes();
