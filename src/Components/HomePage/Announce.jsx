import React, { useState } from "react";
import "../HomePage/Announce.css";
//import cat_YmVaPP4 from "../../../Backend/media/uploads/cat_YmVaPP4.jpg"

import { Link } from "react-router-dom"

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const Announce=(det) =>{
  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "DZD",
    style: "currency",
    });
    const formatCurrency = (number) => {
    return CURRENCY_FORMATTER.format(number);
    };
   const [favAn,setFavAn]=useState([]);
    const favAnn =(id)=>{
      setFavAn((currentAnn)=>{
        if (currentAnn.find((item)=>item.id===id)== null){
          return [currentAnn.id,{id}]
        }
      })
      console.log(favAn)
      alert('btn')

    }
  const path="http://127.0.0.1:8000/"+det.imageprincip

  return (
    <>
    <article  className="Announce-list-1">
        <div className="Annouce-pic"><img variant="top" src={path}/></div>
        <div className="Annouce-details">
            <h1 className=" popular popular-name">{det.titre}</h1>
            <span className=" popular popular-description">description: {det.description}  </span>
            <h3 className=" popular popular-price">{formatCurrency(det.prix)}</h3>
        </div>
        <div className="fav">
            <span className=" time">added {det.date}  </span>
        <button className="dt-btn"><Link  to={`/DetailsAnn/${det.id}`}> Details</Link></button>
        </div>

    </article>
    

    </>
    
    
  )
}

export default Announce;