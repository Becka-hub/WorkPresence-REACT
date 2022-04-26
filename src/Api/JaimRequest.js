import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";
const Jaim = async (idUser) => {
    return await axios.post(`${BASE_URL}/api/jaime`,idUser,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
}

export {Jaim};