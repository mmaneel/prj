import React from 'react'
import "./List.css"
import { Link } from "react-router-dom"

import PersonIcon from '@mui/icons-material/Person';

import AddCircleIcon from '@mui/icons-material/AddCircle';

function List() {
  return (
    <>
    <div className="Ad-left">
    <div className="list">
        <div className="l1"><Link to="/Profile"><PersonIcon  className="l1-icon"/>Profile</Link></div> 
        <div className="l1"><Link to='/AddAnnounce'><AddCircleIcon className="l1-icon"/>Ajouter Announce</Link></div>
        
         
    </div>
</div>
    </>
  )
}

export default List