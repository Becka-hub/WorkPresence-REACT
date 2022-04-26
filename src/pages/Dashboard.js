import React,{useState,useEffect} from 'react';
import Page from './Page';
import SideBar from './SideBar';
import '../css/dashboard.css';
import { AfficheEmploye } from '../Api/EmployeRequest';
import { useSelector,useDispatch} from 'react-redux';
import { employe } from '../redux/actions/actionEmploye';

const Dashboard = () => {
const [navbarState, setNavbarState] = useState(false);  
const [currentLink, setCurrentLink] = useState(1);

 const user=useSelector((state)=>state.user);
 const dispatch=useDispatch();

useEffect(() => {
  if (localStorage.getItem('current')) {
    setCurrentLink(JSON.parse(localStorage.getItem('current')));
  }
}, [])

useEffect(() => {
  const EmployeData = () => {
    AfficheEmploye(user.id).then(function (response) {
      dispatch(employe(response.data.donner));
      localStorage.setItem('employe', JSON.stringify(response.data.donner));
    }).catch(function (error) {
      console.log(error);
    });
  }
  EmployeData();
}, [user.id,dispatch]);



  return (
    <div className='Dashboard'>
      <SideBar 
              navbarState={navbarState}
              setNavbarState={setNavbarState}
              currentLink={currentLink}
              setCurrentLink={ setCurrentLink}
      />
      <Page
              navbarState={navbarState}
              setNavbarState={setNavbarState}
              currentLink={currentLink}
      />
    </div>
  )
}

export default Dashboard