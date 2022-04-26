import React from 'react';
import '../css/employeDetails.css';
import { BASE_URL } from '../Utils/Base_url';
const EmployeDetails = ({handleCloseVoir,employeDetails}) => {
    return (
        <div className='details'>
            <div className='d-flex justify-content-center'>
                <div className='photo_employe'>
                    <img src={BASE_URL+employeDetails.photo_url} alt="photo_employe" />
                </div>
            </div>
            <div className='description'>
                <h4>Nom: {employeDetails.nom}</h4>
                <h4>Prenom: {employeDetails.prenom}</h4>
                <h4>Téléphone: {employeDetails.contact}</h4>
                <h4>Travaille: {employeDetails.travaille}</h4>
                <h4>Email: {employeDetails.email}</h4>
            </div>
            <div className='d-flex justify-content-center'>
            <button className="btn btn_fermer" onClick={handleCloseVoir}>Fermer</button>
            </div>
        </div>
    )
}

export default EmployeDetails