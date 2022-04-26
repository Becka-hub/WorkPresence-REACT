import React, { useEffect, useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import './css/presence.css';
import AbsentDetails from '../../component/AbsentDetails';
import PresenceForm from '../../component/PresenceForm';
import scrollreveal from "scrollreveal";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';
import { AfficheAnne, AfficheMois, AfficheDate,SuprimerPresence, SortiePresence, Absent, AfficheAbsent , Present,AffichePresent} from '../../Api/PresenceRequest';

const Presence = () => {

  const [showAbsent, setShowAbsent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [anne, setAnne] = useState([]);
  const [mois, setMois] = useState([]);
  const [jour, setJour] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const A=useRef();
  const M=useRef();
  const J=useRef();

  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);

  const user = useSelector((state) => state.user);

  const handleCloseAbsent = () => setShowAbsent(false);
  const handleShowAbsent = () => setShowAbsent(true);

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);


  let today = new Date()
  let date = today.getDate() + ':' + parseInt(today.getMonth() + 1) + ':' + today.getFullYear();


  useEffect(() => {
    presenceDay();
    absentDay();
    anneSelect();
    moisSelect();
    dateSelect();
  }, []);


  const absentDay = () => {
    Absent(user.id).then(function (response) {
      setAbsent(response.data.donner);
    }).catch(function (error) {
      console.log(error);
    })
  }

  const presenceDay = () => {
    setLoader(true);
    Present(user.id).then(function (response) {
      setPresent(response.data.donner);
    }).catch(function (error) {
      console.log(error);
    }).finally(function () {
      setLoader(false);
    });
  }

  const anneSelect = () => {
    AfficheAnne(user.id).then(function (response) {
      setAnne(response.data.donner);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const moisSelect = () => {
    AfficheMois(user.id).then(function (response) {
      setMois(response.data.donner);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const dateSelect = () => {
    AfficheDate(user.id).then(function (response) {
      setJour(response.data.donner);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const handleSortie = (id) => {
    setLoading(true);
    const data = { idUser: user.id, id: id };
    SortiePresence(data).then(function (response) {
      if (response.data.title === "success") {
        toast.success(response.data.message);
        anneSelect();
        moisSelect();
        dateSelect();
        presenceDay();
        absentDay();
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


  const handleDelete = (id) => {
    setLoading(true);
    SuprimerPresence(user.id, id).then(function (response) {
      if (response.data.title === "success") {
        toast.success(response.data.message);
        anneSelect();
        moisSelect();
        dateSelect();
        presenceDay();
        absentDay();
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


  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    AfficheAbsent(user.id, A.current.value, M.current.value, J.current.value).then(function (response) {
      setAbsent(response.data.donner);
    }).catch(function (error) {
      console.log(error);
    });

    AffichePresent(user.id, A.current.value, M.current.value, J.current.value).then(function (response) {
      setPresent(response.data.donner);
    }).catch(function (error) {
      console.log(error);
    }).finally(function () {
      setLoading(false);
    });
  }




  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "10px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        h2,
        .select,
        .ajouterPresence,
        .table-responsive
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return (
    <section className='Presence'>
      {loading && <Loader />}
      <div className='bloc_presence'>
        <div className='d-flex justify-content-between'>
          <form onSubmit={handleSearch}>
            <div className='select'>
              <select className="form-select mb-3" ref={A}  required>
                {anne.length===0?
                <option  value="">ANNE</option>
                :anne.map((anne) => {
                  return (
                    <option key={anne.id} value={anne.anne}>{anne.anne}</option>
                  )
                })}
              </select>
              <select className="form-select  mb-3" ref={M} required>
                {mois.length===0?
                <option  value="">MOIS</option>
                :mois.map((mois) => {
                  return (
                    <option key={mois.id} value={mois.mois}>{mois.mois}</option>
                  )
                })}
              </select>
              <select className="form-select  mb-3" ref={J}  required>
                {jour.length===0?
                <option  value="">JOUR</option>
                :jour.map((jour) => {
                  return (
                    <option key={jour.id} value={jour.date}>{jour.date}</option>
                  )
                })}
              </select>
              <button type="submit" className='btn btn-sm me-2'><i className='fa fa-search'></i></button>
              <h4 className='date'><i className='fa fa-calendar me-2'></i>{date}</h4>
              <button type="button" className='btn btn-sm ms-3' onClick={handleShowAbsent}>Absents<span className="badge">{absent.length}</span></button>
            </div>
          </form>
          <div className='ajouterPresence'>
            <button className='btn' onClick={handleShowForm}>AJOUTE PRESENCE</button>
          </div>
        </div>
        {loader && present.length === 0 ?
          <div className='load mb-2 mt-2'>
            <p className='text-center text-white'>Presences loading...</p>
          </div>
          :
          <div className='table-responsive mt-3'>
            <table className="table table-bordered">
              <thead align="center" className="table_thead">
                <tr>
                  <th scope="col">NOM</th>
                  <th scope="col">PRENOM</th>
                  <th scope="col">TELEPHONE</th>
                  <th scope="col">TRAVAILLE</th>
                  <th scope="col">ENTRER</th>
                  <th scope="col">SORTIE</th>
                  <th scope="col">SUPRIMER</th>
                </tr>
              </thead>
              <tbody>
                {present.length===0?
                <tr><td align="center">Présents vide...</td></tr>
                :present.map((present) => {
                  return (
                    <tr key={present.id}>
                      <td align="center">{present.employe.nom}</td>
                      <td align="center">{present.employe.prenom}</td>
                      <td align="center">{present.employe.contact}</td>
                      <td align="center">{present.employe.travaille}</td>
                      <td align="center">{present.heureEntre}</td>
                      {present.heureSortie === null ?
                        <td align="center"><span className='btn_sortie' onClick={() => handleSortie(present.id)}>sortie</span></td> :
                        <td align="center">{present.heureSortie}</td>
                      }

                      <td align="center"><i className='fa fa-trash-o' onClick={() => handleDelete(present.id)}></i></td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        }
      </div>

      <Modal show={showAbsent} size="lg" onHide={handleCloseAbsent}>
        <Modal.Body>
          <AbsentDetails absent={absent} handleCloseAbsent={handleCloseAbsent} />
        </Modal.Body>
      </Modal>


      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Body>
          <PresenceForm presenceDay={presenceDay} absentDay={absentDay} anneSelect={anneSelect} moisSelect={moisSelect} dateSelect={dateSelect} handleCloseForm={handleCloseForm} />
        </Modal.Body>
      </Modal>
    </section >
  )
}

export default Presence