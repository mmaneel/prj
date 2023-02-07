import { Link } from "react-router-dom"
import React,{useEffect, useState} from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


function Contact() {
  return (
    <div className="CONTACT">
        <Link to='/Login'><div className="Back-icon"><KeyboardBackspaceIcon/></div> </Link>
         <div className='info-annonceur'>
          <div className='dv-name'>
          <label> Nom:</label>
          <input  className="name-step" placeholder='Full Name' type="text"/>
          </div>
          <div className='dv-name'>
          <label> Adresse:</label>
          <input  className="name-step" placeholder='Adresse' type="text"/>
          </div>
          <div className='dv-name'>
          <label> Email:</label>
          <input  className="name-step" placeholder='Email' type="email"/>
          </div>
          <div className='dv-name'>
          <label> Téléphone:</label>
          <input  className="name-step" placeholder='Phone Number' type="text"/>
          </div>
          

          </div>
    </div>
  )
}

export default Contact