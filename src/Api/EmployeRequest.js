import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";

const AjouteEmploye = async (data) => {
    return await axios.post(`${BASE_URL}/api/employe`,data,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
}
const AfficheEmploye = async (idUser) => {
  return await axios.get(`${BASE_URL}/api/employe/${idUser}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
}

const AfficheEmployePaginate = async (page,idUser) => {
  return await axios.get(`${BASE_URL}/api/employePagination/${page}/${idUser}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
}

const ModifierEmploye = async (id,data) => {
  return await axios.put(`${BASE_URL}/api/employe/${id}`,data,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
}
const SuprimerEmploye = async (id) => {
  return await axios.delete(`${BASE_URL}/api/employe/${id}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
}

const RechercheEmploye = async (id,prenom) => {
    return await axios.get(`${BASE_URL}/api/searchEmploye/${id}/${prenom}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  
}

export {AjouteEmploye,AfficheEmploye,ModifierEmploye,SuprimerEmploye,AfficheEmployePaginate,RechercheEmploye};