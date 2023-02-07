import React, { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


import '../Profile/MyAnnounce.css'

import  ANN from '../../annonce'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function MyAnnounce(props) {
  const [announce,setAnnounce]=useState(ANN.annonce);

  const handleDelete=(id)=>{
    alert('remove')
    setAnnounce(announce.filter((p)=>p.id !==id));

    console.log(announce)

  }
  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "DZD",
    style: "currency",
    });
    const formatCurrency = (number) => {
    return CURRENCY_FORMATTER.format(number);
    };
  return (
    <>
    <div className="MyAnnounce">
    
   
       
            <div className='poste-ann'>
                <img className='post-pic' src={props.pic}/>
                <div className='poste-ann-l1'>
                    <div className='ttl'>
                    <h1 className="  ann-name">{props.name}</h1>
                   <h3 className=" ann-price">{formatCurrency(props.price)}</h3>
                    </div>
                   <span className="  ann-description"> .{props.space}m</span>
                   <div className="wl-dv">
            <LocationOnIcon/>
           <span className="land-popular-city">{props.Commune} , </span>
           <span className="land-popular-city"> {props.Wilaya}</span>
           </div>
           <div  className="wl-dv">
           < AccessTimeIcon />
           <span className="land-popular-time"> {props.time}</span>
           </div>
                </div>
                <div className='delete'><button key={props.id} className='delete-btn' onClick={()=>handleDelete(props.id)}>Supprimer</button> </div>
            </div>

        </div>
        
    
    </>
  )
}

export default MyAnnounce