import React, { useState } from 'react';
import { BASE_URL } from '../Utils/Base_url';
import Loader from './Loader';
import { ModifierEmploye } from '../Api/EmployeRequest';
import { toast } from 'react-toastify';
import { modifierEmploye } from '../redux/actions/actionEmploye';
import { useDispatch } from 'react-redux';

const EmployeModifierForm = ({ handleCloseModifier, employeDetails, EmployeData }) => {

  const [icon, setIcon] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState(employeDetails.nom);
  const [prenom, setPrenom] = useState(employeDetails.prenom);
  const [telephone, setTelephone] = useState(employeDetails.contact);
  const [travaille, setTravaille] = useState(employeDetails.travaille);
  const [email, setEmail] = useState(employeDetails.email);
  const [photo, setPhoto] = useState();

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


  const handleSubmit = (e) => {
    e.preventDefault();
    let data="";
    if(photo===""){
          data = { nom: nom, prenom: prenom, contact: telephone, travaille: travaille,email: email };
    }else{
          data = { nom: nom, prenom: prenom, contact: telephone, travaille: travaille, photo: photo, email: email };
    }

    
    setLoading(true);
    ModifierEmploye(employeDetails.id,data).then(function (response) {
      if (response.data.title === "success") {
        toast.success(response.data.message);
        handleCloseModifier();
        EmployeData();
        dispatch(modifierEmploye(response.data.donner));
      }
    }).catch(function (error) {
      console.log(error.response);
      if (error.response.data !== "") {
        toast.warning(error.response.data.message);
      }
    }).finally(function () {
      setIcon(false);
      setLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Loader />}
      <input type="file" className="form-control" id="fileInput" onChange={(e) => handleClickPhoto(e)} />
      <label htmlFor="fileInput" className="d-flex justify-content-center" id="fileLabel">
        <div className='avatar d-flex justify-content-center align-items-center'>
          {icon === true ?
            <img src={BASE_URL + employeDetails.photo_url} alt='photo_user' /> :
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
        <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} placeholder='nom...' />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Prenom</label>
        <input type="text" className="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder='prenom...' />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Téléphone</label>
        <input type="text" className="form-control" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder='téléphone...' />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Travaille</label>
        <input type="text" className="form-control" value={travaille} onChange={(e) => setTravaille(e.target.value)} placeholder='travaille...' />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Adresse email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='adresse email...' />
      </div>
      <div className='d-flex justify-content-between'>
        <button type="button" className="btn btn_fermer" onClick={handleCloseModifier}>Fermer</button>
        <button type="submit" className="btn btn_inscrire">Modifier</button>
      </div>
    </form>

  )
}

export default EmployeModifierForm