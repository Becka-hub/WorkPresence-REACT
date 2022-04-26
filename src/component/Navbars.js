import React,{useEffect} from 'react';
import '../css/navbar.css';
import scrollreveal from "scrollreveal";
import { useSelector } from 'react-redux';
import { BASE_URL } from '../Utils/Base_url';

function Navbars({ navbarState, setNavbarState }) {
  const user = useSelector((state)=>state.user);
    useEffect(() => {
        const sr = scrollreveal({
          origin: "top",
          distance: "20px",
          duration: 2000,
          reset: false,
        });
        sr.reveal(
          `
            .titre
        `,
          {
            opacity: 0,
            interval: 100,
          }
        );
      }, []);
    return (
        <div className='nav_bloc'>
            <div className="titre">
                <div className='titre_logo'>
                    <img src={BASE_URL+user.photo_url} alt="logo" />
                </div>
                <h4>{user.nomUtilisateur}</h4>
            </div>
            <div className="button_responsive">
                {navbarState ? (
                    <i className='fa fa-close' onClick={() => setNavbarState(false)}></i>
                ) : (
                    <i className='fa fa-bars' onClick={(e) => {
                        e.stopPropagation();
                        setNavbarState(true);
                    }}></i>
                )}
            </div>
        </div>
    )
}
export default Navbars;
