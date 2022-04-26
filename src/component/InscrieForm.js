import React, { useState } from 'react'
import '../css/inscription.css';
import Loader from './Loader';
import { Inscription } from '../Api/AuthRequest';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const InscrieForm = ({ handleCloseInscrie }) => {
    const [icon, setIcon] = useState(true);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [activiter, setActiviter] = useState("");
    const [utilisateur, setUtilisateur] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const select = [
        { id: "entreprise", name: "entreprise" },
        { id: "ecole", name: "ecole" },
        { id: "autres", name: "autres" },
    ];

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
        setLoading(true);
        const data = { nom: nom, prenom: prenom, adresse: adresse, activiter: activiter, utilisateur: utilisateur, email: email, photo: photo };
        Inscription(data).then(function (response) {
            if (response.data.title === "success") {
                toast.success(response.data.message);
                history.push(`/result/${response.data.donner.user.email}/${response.data.donner.password}`);
                handleCloseInscrie();
            }
        }).catch(function (error) {
            console.log(error.response);
            if (error.response.data !== "") {
                toast.warning(error.response.data.message);
            }
        }).finally(function () {
            setNom("");
            setPrenom("");
            setAdresse("");
            setActiviter("");
            setUtilisateur("");
            setEmail("");
            setPhoto("");
            setIcon(false);
            setLoading(false);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {loading && <Loader />}
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
                <span>LOGO</span>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Nom</label>
                <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} required placeholder='nom..' />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Prenom</label>
                <input type="text" className="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} required placeholder='prenom...' />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Adresse</label>
                <input type="text" className="form-control" value={adresse} onChange={(e) => setAdresse(e.target.value)} required placeholder='adresse...' />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Activiter</label>
                <select className="form-select" value={activiter} onChange={(e) => setActiviter(e.target.value)} aria-label=".form-select-sm example" required>
                    <option selected value="">select activiter...</option>
                    {select.map((select,index) => {
                        return (
                            <option key={index} value={select.id}>{select.name}</option>
                        );
                    })}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Nom d'utilisateur</label>
                <input type="text" className="form-control" value={utilisateur} onChange={(e) => setUtilisateur(e.target.value)} required placeholder='nom utilisateur...' />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Adresse email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='adresse email...' />
            </div>
            <div className='d-flex justify-content-between'>
                <button type="button" className="btn btn_fermer" onClick={handleCloseInscrie}>Fermer</button>
                <button type="submit" className="btn btn_inscrire">Inscrire</button>
            </div>
        </form>

    )
}

export default InscrieForm