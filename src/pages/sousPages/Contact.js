import React, { useEffect, useState } from 'react';
import './css/contact.css';
import scrollreveal from "scrollreveal";
import Photo from '../../images/Beckas_avatar.jpg';
import Jaime from '../../images/thumbup.png';
import Glass from '../../images/glasses.png';
import { useSelector } from 'react-redux';
import { Jaim } from '../../Api/JaimRequest';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';

const Contact = () => {
  const user = useSelector((state) => state.user);
  const [showJaim, setShowJaim] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('jaime')){
      setShowJaim(true);
    }
  }, []);

  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "10px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        .image,
        .description,
        .jaime

    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);

  const handleJaime = () => {
    setLoading(true);
    const idUser = { idUser: user.id }
    Jaim(idUser).then(function (response) {
      if (response.data.title === "success") {
        toast.success(response.data.message);
        setShowJaim(true);
        localStorage.setItem('jaime', 1);
      }
    }).catch(function (error) {
      console.log(error.response);
      if (error.response.data !== "") {
        toast.warning(error.response.data.message);
      }
    }).finally(function () {
      setShowJaim(true);
      setLoading(false);
    });
  }
  return (
    <section className='Contact'>
      {loading && <Loader />}
      <div className='d-flex justify-content-center'>
        <div className='col-12 col-sm-6 col-md-6 col-lg-6'>
          <div className='bloc_contact'>
            <div className='d-flex justify-content-center'>
              <div className='image'>
                <img src={Photo} alt="photo_contact" />
              </div>
            </div>
            <div className='description'>
              <h5 className='text-center'>RAKOTONDRATSIMBA</h5>
              <h5 className='text-center'>Maminiaina</h5>
              <h5 className='text-center'>0323984415</h5>
              <h5 className='text-center'>MAMINIAINAZAIN@gmail.com</h5>
            </div>
            {showJaim === false && user.jaimes[0] === 0 ?
              <div className='d-flex justify-content-center'>
                <div className='jaime d-flex'>
                  <p>Cliquez si vous aimez l'applications <i className='fa fa-arrow-circle-o-right'></i></p>
                  <div className='image_jaime' onClick={handleJaime}>
                    <img src={Jaime} alt="jaime" />
                  </div>
                </div>
              </div> : null}
            {showJaim || user.jaimes[0] !== 0 ?
              <div className='d-flex justify-content-center'>
                <div className='jaime d-flex'>
                  <p>Merci d'avoir aimer l'applications</p>
                  <div className='image_jaime'>
                    <img src={Glass} alt="jaime" />
                  </div>
                </div>
              </div> : null
            }

          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact