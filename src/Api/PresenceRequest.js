import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";

const AjoutePresence = async (data) => {
    return await axios.post(`${BASE_URL}/api/presence`,data,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
}
const AfficheAnne = async (idUser) => {
  return await axios.get(`${BASE_URL}/api/anne/${idUser}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
}

const AfficheMois = async (idUser) => {
    return await axios.get(`${BASE_URL}/api/mois/${idUser}`,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
  }

  const AfficheDate = async (idUser) => {
    return await axios.get(`${BASE_URL}/api/date/${idUser}`,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
  }

  const SortiePresence = async (data) => {
    return await axios.post(`${BASE_URL}/api/sortie`,data,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
  }

const SuprimerPresence = async (idUser,id) => {
  return await axios.delete(`${BASE_URL}/api/presence/${idUser}/${id}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
}


const Present = async (idUser) => {
    return await axios.get(`${BASE_URL}/api/presence/${idUser}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  

}

const AffichePresent = async (idUser,anne,mois,date) => {
  return await axios.get(`${BASE_URL}/api/presence/${idUser}/${anne}/${mois}/${date}`,{
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });
}

const Absent = async (idUser) => {
  return await axios.get(`${BASE_URL}/api/absent/${idUser}`,{
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }
  });
}

const AfficheAbsent = async (idUser,anne,mois,date) => {
    return await axios.get(`${BASE_URL}/api/absent/${idUser}/${anne}/${mois}/${date}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
}




export {AjoutePresence,AfficheAnne,AfficheMois,AfficheDate,SuprimerPresence,SortiePresence,AfficheAbsent,Absent,AffichePresent, Present};