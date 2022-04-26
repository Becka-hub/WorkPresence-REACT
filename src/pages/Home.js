import React, { useState,useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '../css/home.css';
import Logo from '../images/logo.png';
import Thumb from '../images/thumbup.png';
import InscrieForm from '../component/InscrieForm';
import ForgotForm from '../component/ForgotForm';
import Loader from '../component/Loader';
import { Login } from '../Api/AuthRequest';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { AjouteUser } from '../redux/actions/actionAuth';
import { AfficherJaime, AfficherUser } from '../Api/FullRequest';

const Home = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState("");
  const [jaime,setJaime]=useState([]);
  const [user,setUser]=useState([]);

  const [showInscrie, setShowInscrie] = useState(false);

  const handleCloseInscrie = () => setShowInscrie(false);
  const handleShowInscrie = () => setShowInscrie(true);

  const [showForgot, setShowForgot] = useState(false);

  const handleCloseForgot = () => setShowForgot(false);
  const handleShowForgot = () => setShowForgot(true);


  useEffect(() => {
     AfficherUser().then(function (response) {
      setUser(response.data.donner);
    }).catch(function (error) {
      console.log(error);
    });
    AfficherJaime().then(function (response) {
      setJaime(response.data.donner);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);


  const dispatch=useDispatch();
  const history=useHistory();

  const handleSubmit=(e)=>{
     e.preventDefault();
     setLoading(true);
     const data={email:email,password:password};
     Login(data).then(function (response) {
      if (response.data.title === "success") {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data.donner));
        localStorage.setItem('token', response.data.token);
        dispatch(AjouteUser(response.data.donner));
        history.push("/dashboard");
      }
    }).catch(function (error) {
      console.log(error.response);
      if(error.response.data !== ""){
          toast.error(error.response.data.message);
      }
    }).finally(function () {
      setEmail("");
      setPassword("");
      setLoading(false);
    });
  }

  const entreprise=user.filter((user)=>user.activiter==="entreprise");
  const ecole=user.filter((user)=>user.activiter==="ecole");
  const autres=user.filter((user)=>user.activiter==="autres");

  return (
    <section className='Home'>
      {loading && <Loader/>}
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='d-flex justify-content-center'>
              <div className='logo'>
                <img src={Logo} alt="logo" />
              </div>
            </div>
            <div className='description'>
              <h1 className='text-center'>Work Presence</h1>
              <p>Work Presence est une application qui fournit un service de présence pour les entreprises ou écoles ou autres ce qui le veut, Merci d'avoir choisi work presence et n'hésiter pas à maitre un Jaime sur l'application dans la page de contact.</p>
            </div>
            <div className="jaime">
              <div className='d-flex justify-content-center'>
                <div className='bloc_jaime'>
                  <div className='img_jaime'>
                    <img src={Thumb} alt="image_jaime" />
                  </div>
                  <h2>{jaime.length}</h2>
                </div>
              </div>
            </div>
            <div className='state'>
              <div className='row'>
                <div className='col-6 col-sm-4 col-md-4 col-lg-4'>
                  <div className='bloc_entreprise'>
                    <div className='d-flex justify-content-center'>
                      <div className='titre'>
                        <i className='fa fa-suitcase'></i>
                        <h2>Entreprises</h2>
                      </div>
                    </div>
                    <h3 className='text-center'>{entreprise.length}</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-4 col-md-4 col-lg-4'>
                  <div className='bloc_ecole'>
                    <div className='d-flex justify-content-center'>
                      <div className='titre'>
                        <i className='fa fa-university'></i>
                        <h2>Ecoles</h2>
                      </div>
                    </div>
                    <h3 className='text-center'>{ecole.length}</h3>
                  </div>
                </div>
                <div className='col-6 col-sm-4 col-md-4 col-lg-4'>
                  <div className='bloc_autre'>
                    <div className='d-flex justify-content-center'>
                      <div className='titre'>
                        <i className='fa fa-users'></i>
                        <h2>Autres</h2>
                      </div>
                    </div>
                    <h3 className='text-center'>{autres.length}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='bloc_login'>
              <div className='d-flex justify-content-center'>
                <div className='img_login'>
                  <i className='fa fa-user'></i>
                </div>
              </div>
              <div className='bloc_form'>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Adresse email</label>
                      <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='adresse email...'  required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe</label>
                      <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='mot de passe...'  required/>
                    </div>
                    <div className='d-flex justify-content-end'>
                      <span className='forgot' onClick={handleShowForgot}>Changer mot de passe ?</span>
                    </div>
                    <button type="submit" className="btn w-100 mb-3">connexion</button>
                    <span className='compte'>Vous n'avez pas de compte ? <strong onClick={handleShowInscrie}>Inscrire</strong></span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='modal_inscrition'>
        <Modal show={showInscrie} onHide={handleCloseInscrie} className='modal_inscrie'>
          <Modal.Body>
            <InscrieForm handleCloseInscrie={handleCloseInscrie} />
          </Modal.Body>
        </Modal>
      </div>
      <div className='modal_forgot'>
        <Modal show={showForgot} onHide={handleCloseForgot} className='modal_inscrie'>
          <Modal.Body>
            <ForgotForm handleCloseForgot={handleCloseForgot} />
          </Modal.Body>
        </Modal>
      </div>
    </section>
  )
}

export default Home