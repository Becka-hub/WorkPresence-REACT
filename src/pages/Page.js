import React from 'react';
import Navbar from '../component/Navbars';
import Profile from './sousPages/Profile';
import Contact from './sousPages/Contact';
import Employe from './sousPages/Employe';
import Presence from './sousPages/Presence';
import '../css/page.css';
const Page = ({ navbarState, setNavbarState, currentLink }) => {
  return (
    <div className='page'>
      <Navbar
        navbarState={navbarState}
        setNavbarState={setNavbarState}
      />
      {currentLink === 1 ?
        <Profile /> :
        currentLink === 2 ?
          <Employe /> :
          currentLink === 3 ?
            <Presence /> :
            <Contact />
      }

    </div>
  )
}

export default Page