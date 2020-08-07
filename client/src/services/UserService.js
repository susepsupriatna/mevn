import Axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return Axios.get(API_URL + "all");
  }

  getUserBoard() {
    return Axios.get(API_URL + "user", { headers: AuthHeader() });
  }

  getModeratorBoard() {
    return Axios.get(API_URL + "mod", { headers: AuthHeader() });
  }

  getAdminBoard() {
    return Axios.get(API_URL + "admin", { headers: AuthHeader() });
  }
}

export default new UserService();
