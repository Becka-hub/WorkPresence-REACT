import React from 'react'
import '../css/absent.css';
const AbsentDetails = ({ handleCloseAbsent, absent }) => {
  return (
    <div className='absent'>
      <h4 className='text-center'>ABSENTS</h4>
      <div className=''>
        {absent.length === 0 ?
          <h6 className='text-center white-text'>Pas d'absents</h6>
          : absent.map((absent, index) => {
            return (
              <div key={index} className='d-flex justify-content-center'>
                <div className='absent_details' >
                  <h6 className='text-center'>{absent.nom} {absent.prenom}</h6>
                  <h6 className='text-center'>{absent.travaille}</h6>
                  <h6 className='text-center'>{absent.contact}</h6>
                </div>
              </div>
            );
          })}

      </div>
      <div className='d-flex justify-content-center'>
        <button className='btn mt-2 btn-dark' onClick={handleCloseAbsent}>FERMER</button>
      </div>
    </div>
  )
}

export default AbsentDetails