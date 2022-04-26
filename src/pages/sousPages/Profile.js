import React, { useEffect } from 'react';
import './css/profile.css';
import scrollreveal from "scrollreveal";
import { BASE_URL } from '../../Utils/Base_url';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const employe = useSelector((state) => state.employe);
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "10px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      .nom_utilisateur,
      .bloc_logo,
      .bloc_decription,
      .bloc_employe
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return (
    <section className='Profile'>
      <div className='bloc_profile'>
        <div className='row mt-3'>
          <div className='col-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='bloc_logo'>
              <img src={BASE_URL + user.photo_url} alt="image_logo" />
            </div>
          </div>
          <div className='col-12 col-sm-8 col-md-8 col-lg-8'>
            <div className='bloc_decription'>
            <div className='d-flex justify-content-center'>
              <div className='nom_utilisateur'>
                <h3><i className='fa fa-star'></i>{user.nomUtilisateur}</h3>
              </div>
            </div>
              <h4><i className='fa fa-user'></i>{user.nom}</h4>
              <h4><i className='fa fa-user'></i>{user.prenom}</h4>
              <h4><i className='fa fa-map-marker'></i>{user.adresse}</h4>
              <h4><i className='fa  fa-google'></i>{user.email}</h4>
              <h4><i className='fa fa-university'></i>{user.activiter}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile