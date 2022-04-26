import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CssBaseline } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import { toast } from 'react-toastify';
import scrollreveal from "scrollreveal";
import { useSelector, useDispatch } from 'react-redux';
import './css/employe.css';
import { BASE_URL } from '../../Utils/Base_url';
import Loader from '../../component/Loader';
import EmployeForm from '../../component/EmployeForm';
import EmployeModifierForm from '../../component/EmployeModifierForm';
import EmployeDetails from '../../component/EmployeDetails';
import { AfficheEmployePaginate, SuprimerEmploye, RechercheEmploye, AfficheEmploye } from '../../Api/EmployeRequest';
import { suprimerEmploye } from '../../redux/actions/actionEmploye';


const Employe = () => {

  const [employe, setEmploye] = useState([]);
  const [employeDonner, setEmployeDonner] = useState([]);
  const user = useSelector((state) => state.user);
  const employeStore = useSelector((state) => state.employe);
  const dispatch = useDispatch();

  const [showEmploye, setShowEmploye] = useState(false);
  const [showModifier, setShowModifier] = useState(false);
  const [showVoir, setShowVoir] = useState(false);
  const [employeDetails, setEmployeDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPaginate, setShowPaginate] = useState(true);
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleCloseEmploye = () => setShowEmploye(false);
  const handleShowEmploye = () => setShowEmploye(true);

  const handleCloseModifier = () => setShowModifier(false);
  const handleShowModifier = (employe) => {
    setShowModifier(true);
    setEmployeDetails(employe);
  }

  const handleCloseVoir = () => setShowVoir(false);
  const handleShowVoir = (employe) => {
    setShowVoir(true);
    setEmployeDetails(employe);
  }



  useEffect(() => {
    EmployeData();
  }, []);

  useEffect(() => {
    const Employe = () => {
      AfficheEmploye(user.id).then(function (response) {
        setEmployeDonner(response.data.donner)
      }).catch(function (error) {
        console.log(error);
      });
    }
    Employe();
  }, [user.id]);

  useEffect(() => {
    if (employeDonner.length < 5) {
      setShowPaginate(false);
    } else {
      setShowPaginate(true);
    }
  }, [employeDonner.length]);



  const EmployeData = (value = null) => {
    let dataPage = value === null ? page : value;
    setLoading(true);
    AfficheEmployePaginate(dataPage, user.id).then(function (response) {
      setEmploye(response.data.donner);
      setTotalPage(response.data.totalPage);
    }).catch(function (error) {
      console.log(error);
    }).finally(function () {
      setLoading(false);
    });
  }

  const handlePage = (event, value) => {
    setPage(value);
    EmployeData(value);
  }


  const handleDeleteEmploye = (id) => {
    setLoader(true);
    SuprimerEmploye(id).then(function (response) {
      toast.success(response.data.message);
      dispatch(suprimerEmploye(id));
      EmployeData(1);
      setPage(1);
    }).catch(function (error) {
      console.log(error);
    }).finally(function () {
      setLoader(false);
    });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setLoader(true);
    RechercheEmploye(user.id, search).then(function (response) {
      if (response.data.donner.length !== 0) {
        setEmploye(response.data.donner);
        setShowPaginate(false);
      } else {
        toast.warning("Ouups! Pas de donner pour ce prénom!");
        setEmploye(employe);
        if (employeDonner.length < 5) {
          setShowPaginate(false);
        } else {
          setShowPaginate(true);
        }
      }
    }).catch(function (error) {
      console.log(error);
    }).finally(function () {
      setLoader(false);
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
        .header,
        .table-responsive
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);

  return (
    <section className='Employe'>
      {loader && <Loader />}
      <div className='bloc_employe'>
        <div className='titre_header d-flex justify-content-center'>
          <div>
            <i className='fa fa-users'></i>
            <h4>EMPLOYES {user.nomUtilisateur}</h4>
          </div>
        </div>
        <div className='d-flex justify-content-between header'>
          <form onSubmit={handleSearch} className="form">
            <input type="text" className='form-control form_recherche' value={search} required onChange={(e) => setSearch(e.target.value)} placeholder='Recherche prénom...' />
            <button type="submit" className='btn'><i className="fa fa-search-plus"></i></button>
          </form>
          <button className='btn btn_ajoute' onClick={handleShowEmploye}>AJOUTE EMPLOYE</button>
        </div>
        {loading && employe.length === 0 ?
          <div className='load mb-2 mt-2'>
            <p className='text-center text-white'>Employés loading...</p>
          </div> :
          <div className='table-responsive mt-3'>
            <table className="table table-bordered">
              <thead align="center" className="table_thead">
                <tr>
                  <th scope="col">PHOTO</th>
                  <th scope="col">NOM</th>
                  <th scope="col">PRENOM</th>
                  <th scope="col">TELEPHONE</th>
                  <th scope="col">TRAVAILLE</th>
                  <th scope="col">VOIR</th>
                  <th scope="col">MODIFIER</th>
                  <th scope="col">SUPRIMER</th>
                </tr>
              </thead>
              <tbody>
                {employe.length===0?
                <tr><td>Employés vide...</td></tr>
                :employe.map((employe) => {
                  return (
                    <tr key={employe.id}>
                      <td align="center"><div className='image_employe'><img src={BASE_URL + employe.photo_url} alt="image_employe" /></div></td>
                      <td align="center">{employe.nom}</td>
                      <td align="center">{employe.prenom}</td>
                      <td align="center">{employe.contact}</td>
                      <td align="center">{employe.travaille}</td>
                      <td align="center"><i className='fa fa-eye' onClick={() => handleShowVoir(employe)}></i></td>
                      <td align="center"><i className='fa fa-edit' onClick={() => handleShowModifier(employe)}></i></td>
                      <td align="center"><i className='fa fa-trash-o' onClick={() => handleDeleteEmploye(employe.id)}></i></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {showPaginate &&
              <div className="d-flex justify-content-center mt-4 mb-1">
                <div className='pagination'>
                  <CssBaseline />
                  <Pagination
                    count={totalPage}
                    color="secondary"
                    onChange={handlePage}
                  />
                </div>
              </div>
            }
          </div>

        }
      </div>


      <Modal show={showEmploye} onHide={handleCloseEmploye}>
        <Modal.Body>
          <EmployeForm EmployeData={EmployeData} handleCloseEmploye={handleCloseEmploye} />
        </Modal.Body>
      </Modal>


      <Modal show={showModifier} onHide={handleCloseModifier}>
        <Modal.Body>
          <EmployeModifierForm employeDetails={employeDetails} EmployeData={EmployeData} handleCloseModifier={handleCloseModifier} />
        </Modal.Body>
      </Modal>

      <Modal show={showVoir} onHide={handleCloseVoir}>
        <Modal.Body>
          <EmployeDetails employeDetails={employeDetails} handleCloseVoir={handleCloseVoir} />
        </Modal.Body>
      </Modal>


    </section>
  )
}

export default Employe