import React, { useEffect } from "react";
import Logo from '../images/logo.png';
import scrollreveal from "scrollreveal";
import '../css/sidebar.css';
import { suprimerUser } from "../redux/actions/actionAuth";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

const SideBar = ({ navbarState, setNavbarState, currentLink, setCurrentLink }) => {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "20px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
      .full,
      .logout_full
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);

  const current = (data) => {
    setCurrentLink(data);
    localStorage.setItem('current', JSON.stringify(data));
  }
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('jaime');
    setCurrentLink(1);
    localStorage.setItem('current', JSON.stringify(1));
    dispatch(suprimerUser());
    history.push("/");
  }
  return (
    <>

      <div className="fullView">
        <div className="top full">
          <div className="d-flex justify-content-center">
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
          </div>
          <h2 className="text-center">Work Presence</h2>
          <div className="links">
            <ul>
              <li
                className={currentLink === 1 ? "active" : "none"}
                onClick={() => current(1)}
              >
                <div>
                  <i className="fa fa-user"></i>
                  <span>PROFILE</span>
                </div>
              </li>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => current(2)}
              >
                <div>
                  <i className="fa fa-group"></i>
                  <span>EMPLOYES</span>
                </div>
              </li>
              <li
                className={currentLink === 3 ? "active" : "none"}
                onClick={() => current(3)}
              >
                <div>
                  <i className="fa fa-check-square-o"></i>
                  <span>PRESENCES</span>
                </div>
              </li>
              <li
                className={currentLink === 4 ? "active" : "none"}
                onClick={() => current(4)}
              >
                <div>
                  <i className="fa fa-phone-square"></i>
                  <span>CONTACTS</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="logout logout_full">
          <div onClick={handleLogout}>
            <i className="fa fa-power-off"></i>
            <span className="logout" >Déconnexion</span>
          </div>
        </div>
      </div>


      <div className={navbarState ? "responsiveViewShow" : "responsiveViewClose"}>
        <div className="responsiveView_content">
          <div className="top">
            <div className="d-flex justify-content-end">
              <div className="toggle">
                <i className="fa fa-close" onClick={() => setNavbarState(false)}></i>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="logo">
                <img src={Logo} alt="logo" />
              </div>
            </div>
            <h2 className="text-center">Work Presence</h2>
            <div className="links">
              <ul>
                <li
                  className={currentLink === 1 ? "active" : "none"}
                  onClick={() => current(1)}
                >
                  <div>
                    <i className="fa fa-user"></i>
                    <span>PROFILE</span>
                  </div>
                </li>
                <li
                  className={currentLink === 2 ? "active" : "none"}
                  onClick={() => current(2)}
                >
                  <div>
                    <i className="fa fa-group"></i>
                    <span>EMPLOYES</span>
                  </div>
                </li>
                <li
                  className={currentLink === 3 ? "active" : "none"}
                  onClick={() => current(3)}
                >
                  <div>
                    <i className="fa fa-check-square-o"></i>
                    <span>PRESENCES</span>
                  </div>
                </li>
                <li
                  className={currentLink === 4 ? "active" : "none"}
                  onClick={() => current(4)}
                >
                  <div>
                    <i className="fa fa-phone-square"></i>
                    <span>CONTACTS</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="logout">
            <div onClick={handleLogout}>
              <i className="fa fa-power-off"></i>
              <span className="logout" >Déconnexion</span>
            </div>
          </div>
        </div>
        <div className="closeInterface" onClick={() => setNavbarState(false)}></div>
      </div>
    </>
  )
}

export default SideBar