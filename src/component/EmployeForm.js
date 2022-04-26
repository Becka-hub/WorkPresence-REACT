import React, { useState } from 'react';
import { AjouteEmploye } from '../Api/EmployeRequest';
import Loader from './Loader';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ajouteEmploye } from '../redux/actions/actionEmploye';

const EmployeForm = ({handleCloseEmploye ,EmployeData}) => {
  const [icon, setIcon] = useState(true);
  const [loading,setLoading]=useState(false);
  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");
  const [telephone,setTelephone]=useState("");
  const [travaille,setTravaille]=useState("");
  const [email,setEmail]=useState("");
  const [photo, setPhoto] = useState();

  const user=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  
  const handleClickPhoto = (e) => {
    var reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setPhoto(Base64);
        setIcon(false);
      };
      reader.onerror = (error) => {
        console.log('Error', error);
      };
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    setLoading(true);
    const data={nom:nom,prenom:prenom,contact:telephone,email:email,travaille:travaille,photo:photo,idUser:user.id};
    AjouteEmploye(data).then(function (response) {
      if (response.data.title === "success") {
        toast.success(response.data.message);
        handleCloseEmploye();
        EmployeData();
        dispatch(ajouteEmploye(data));
      }
    }).catch(function (error) {
      console.log(error.response);
      if(error.response.data !== ""){
          toast.warning(error.response.data.message);
      }
    }).finally(function () {
      setNom("");
      setPrenom("");
      setTravaille("");
      setEmail("");
      setPhoto("");
      setIcon(false);
      setLoading(false);
    });

  }

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Loader/>}
      <input type="file" className="form-control" id="fileInput" onChange={(e) => handleClickPhoto(e)} required />
      <label htmlFor="fileInput" className="d-flex justify-content-center" id="fileLabel">
        <div className='avatar d-flex justify-content-center align-items-center'>
          {icon === true ?
            <i className='fa fa-user'></i> : 
            <img src={photo} alt='photo_user' />
          }
        </div>
        <div className='camera'>
          <i className='fa fa-camera'></i>
        </div>
      </label>
      <div className='d-flex justify-content-center'>
        <span>PHOTO</span>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Nom</label>
        <input type="text" className="form-control" value={nom} onChange={(e)=>setNom(e.target.value)} placeholder='nom...' />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Prenom</label>
        <input type="text" className="form-control" value={prenom} onChange={(e)=>setPrenom(e.target.value)} placeholder='prenom...' />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Téléphone</label>
        <input type="text" className="form-control" value={telephone} onChange={(e)=>setTelephone(e.target.value)} placeholder='téléphone...' />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Travaille</label>
        <input type="text" className="form-control" value={travaille} onChange={(e)=>setTravaille(e.target.value)} placeholder='travaille...' />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Adresse email</label>
        <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='adresse email...' />
      </div>
      <div className='d-flex justify-content-between'>
            <button type="button" className="btn btn_fermer" onClick={handleCloseEmploye}>Fermer</button>
            <button type="submit" className="btn btn_inscrire">Enregistrer</button>
            </div>
    </form>

  )
}

export default EmployeForm