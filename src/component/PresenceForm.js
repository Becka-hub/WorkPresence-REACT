import React, { useState, useEffect, useRef } from 'react';
import '../css/presenceForm.css';
import Loader from './Loader';
import { AjoutePresence } from '../Api/PresenceRequest';
import { useSelector } from 'react-redux';
import { AfficheEmploye } from '../Api/EmployeRequest';
import { toast } from 'react-toastify';

const PresenceForm = ({ handleCloseForm,anneSelect,moisSelect,dateSelect,presenceDay,absentDay }) => {

  const [employe, setEmploye] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const present=useRef();

  useEffect(() => {
    const EmployeData = () => {
      AfficheEmploye(user.id).then(function (response) {
        setEmploye(response.data.donner);
      }).catch(function (error) {
        console.log(error);
      });
    }
    EmployeData();
  }, [user.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { idUser: user.id, idEmploye: present.current.value };
    AjoutePresence(data).then(function (response) {
      if (response.data.title === "success") {
        toast.success(response.data.message);
        presenceDay();
        absentDay();
        anneSelect();
        moisSelect();
        dateSelect();
        handleCloseForm();
      }
    }).catch(function (error) {
      console.log(error.response);
      if (error.response.data !== "") {
        toast.warning(error.response.data.message);
      }
    }).finally(function () {
      setLoading(false);
    });
  }



  return (
    <div className='ajoute_presence'>
      {loading && <Loader />}
      <h4 className='text-center'>AJOUTE PRESENCE</h4>
      <form className='mt-4' onSubmit={handleSubmit}>
        <select className="form-select  mb-3" ref={present}  placeholder="select employer..." required>
          {employe.length===0?
          <option  value="" selected>Pas d'employés</option>
          :employe.map((select, index) => {
            return (
              <option key={index} value={select.id}>{select.nom} {select.prenom}</option>
            );
          })}
        </select>
        <button type="submit" className="btn w-100">Ajouter</button>
      </form>

    </div>
  )
}

export default PresenceForm