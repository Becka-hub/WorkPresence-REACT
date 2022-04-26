import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";

const AfficherJaime = async () => {
    return await axios.get(`${BASE_URL}/jaime`);
}

const AfficherUser = async () => {
    return await axios.get(`${BASE_URL}/afficherUser`);
}


export { AfficherJaime, AfficherUser};