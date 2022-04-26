import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";

const Inscription = async (data) => {
    return await axios.post(`${BASE_URL}/inscription`,data);
}

const Login = async (data) => {
    return await axios.post(`${BASE_URL}/login`,data);
}

const Forgot = async (data) => {
    return await axios.post(`${BASE_URL}/changePassword`,data);
}
export { Inscription, Login , Forgot};