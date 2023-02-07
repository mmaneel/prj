import React,{useState} from 'react'
import"./NavBar.css";
import { Link } from "react-router-dom"
import LOGO from '../../assets/LOGO.png'
import {SearchBar} from "../HomePage/SearchBar";
import BookData from "../../data.json";
import avatar from'../../assets/avatar.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import devs from '../../data';

const NavBarr=()=> {
  const [hide,setHide]=useState(false)
  return (
    <>
    <div className="nav-bar">
                <Link to="/"><img  className="LOGO" src={LOGO}/></Link>
                <SearchBar   className="rech" placeholder="Recherche..." data={devs} />
                <NotificationsNoneIcon className="ntotification"/>
                <div className="like-navbar" onClick={()=>setHide(!hide)}>
                <FavoriteBorderIcon />
                { hide?<div >test </div>:null}
                </div>
               <div className="avatar"> <Link to='/Profile'><img src={avatar}/></Link></div>
            </div>
    </>
  )
}

export default NavBarr