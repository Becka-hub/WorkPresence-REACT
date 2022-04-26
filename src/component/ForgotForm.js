import React,{useState} from 'react';
import '../css/forgot.css';
import Loader from './Loader';
import { Forgot } from '../Api/AuthRequest';
import { toast } from 'react-toastify';

const ForgotForm = ({handleCloseForgot}) => {
    const [utilisateur,setUtilisateur]=useState("");
    const [email,setEmail]=useState("");
    const [loading,setLoading]=useState(false);

    const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true);
      const data={utilisateur:utilisateur,email:email};
      Forgot(data).then(function (response) {
        if (response.data.title === "success") {
          toast.success(response.data.message);
          handleCloseForgot();
        }
      }).catch(function (error) {
        console.log(error.response);
        if(error.response.data !== ""){
            toast.warning(error.response.data.message);
        }
      }).finally(function () {
        setEmail("");
        setUtilisateur("");
        setLoading(false);
      });

    }
    return (
        <form onSubmit={handleSubmit}>
            {loading && <Loader/>}
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Nom d'utilisateur</label>
                <input type="text" className="form-control" value={utilisateur} onChange={(e)=>setUtilisateur(e.target.value)} placeholder="nom d'utilisateur..." required />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Adresse email</label>
                <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='adresse email...' required/>
            </div>
            <div className='d-flex justify-content-between'>
            <button className="btn btn_fermer" onClick={handleCloseForgot}>Fermer</button>
            <button type="submit" className="btn btn_inscrire">Envoyer</button>
            </div>
        </form>
    )
}

export default ForgotForm