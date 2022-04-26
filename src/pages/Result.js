import React from 'react';
import '../css/result.css'; 
import Logo from '../images/logo.png';
import Emojy from '../images/heartemoji.png';
import { Link,useParams} from 'react-router-dom';

const Result = () => {
  const { email,mdp } = useParams();
  return (
    <section className='Result'>
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <div className='logo'>
            <img src={Logo} alt="logo_presence" />
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <div className='merci'>
            <h2>Merci d'avoir choisie <strong>Work Presence</strong></h2>
            <div className='emojy'>
              <img src={Emojy} alt="emojy" />
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <div className='description'>
            <h4>Adresse email: <span>{email}</span></h4>
            <h4 className='mt-5'>Mot de passe: <span>{mdp}</span></h4>
          </div>
        </div>
        <div className='d-flex justify-content-center mt-3'>
        <Link to='/' className='retour'><i className='fa fa-arrow-circle-left me-2'></i>retour vers Login</Link>
        </div>
      </div>
    </section>
  )
}

export default Result