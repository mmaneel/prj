import React, { useState } from "react";
import "../Profile/ListP.css"
import { Link } from "react-router-dom"

import LogoutIcon from '@mui/icons-material/Logout';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChatIcon from '@mui/icons-material/Chat';
import avatar from'../../assets/avatar.jpg';
import LOGO from '../../assets/LOGO.png'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';

function ListP() {
  const [hidep,setHidep]=useState(false)
  return (
    <>
    <Link to="/"><img  className="LOGO-p" src={LOGO}/></Link>
    <div className="profile-list">
              <div className="avatar-p"><img src={avatar}/></div>
              <div className="Name-p">
              <h2>Jacob Jones</h2>
              <div onClick={()=>setHidep(!hidep)}>< KeyboardArrowDownSharpIcon   className="arrow-p"/></div>
              </div>
              {hidep? <div className="info-p" >
                <span>  Téléphone : +213 6 87 65 43 23</span>
                <span>  Email : j.jacob342@email.com </span>
                <span>Oran , Algeria</span>
              </div>:null}
              <div className='ListP'>
        <div className="list-p">
        <div className="l1-p"><Link to='/Chat'><ChatIcon className="l1-icon-p"/>Message</Link></div>
        <div className="l1-p"><Link  to="/Profile ">< FilterListIcon  className="l1-icon-p"/>Mes Annonnce</Link></div>
         <div className="l1-p"><Link to="/"><LogoutIcon className="l1-icon-p" />Déconnecter</Link></div>
    </div>
    </div>
        </div>
    
    </>
  )
}

export default ListP