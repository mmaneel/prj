import "./AboutUs.css"
import house from "../../assets/house.jpg"
import Announce from "../HomePage/Announce"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from "react";
import devs from "../../data";


const AboutUs = (det) => {
   
    const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
        currency: "DZD",
        style: "currency",
        });
        const formatCurrency = (number) => {
        return CURRENCY_FORMATTER.format(number);
        };
    const path="http://127.0.0.1:8000/"+det.imageprincip

    return ( 

        <>
        <div className="About-us">
       <article  className="land-ann">
        <div className="land-ann-pic"><img src={path}/></div>
        <div className="Annouce-details-land">
        <h3 className=" land-popular-price">{formatCurrency(det.prix)}</h3>
        <div className="dv-land">
           <h1 className=" land-popular-name">{det.titre}</h1>
            <span className="land-popular-type">.{det.type}</span>
        </div>
           <div className="wl-dv">
            <LocationOnIcon/>
           <span className="land-popular-city">{det.commune} , </span>
           <span className="land-popular-city"> {det.wilaya}</span>
           </div>
           <div  className="wl-dv">
           < AccessTimeIcon />
           <span className="land-popular-time"> {det.date}</span>
           </div>
           
            
            
        </div>
    
    </article>
    </div>
    </>
     );
}
 
export default AboutUs;