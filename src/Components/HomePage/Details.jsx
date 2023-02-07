import React, { useState ,useEffect} from "react";
import "../HomePage/Details.css";
import house from '../../assets/house.jpg'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import devs from '../../data'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhoneIcon from '@mui/icons-material/Phone';
import Axios from 'axios'
import { Link } from "react-router-dom";





export const Details=({id}) =>{
const announce_to_display=devs.cardDevs.filter(ann=>ann.id===id)[0]
const [data,setData]=useState([])
useEffect (() => {
  Axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(res =>
    {
      console.log(res.data)
      setData(res.data)

    } ).catch(err => console.log(err))
  }, [])

  
  return (
    <>
   
    <article className="Announce-lst-1-details">
    <div className="Annouce-pic-details"><img src={announce_to_display.pic}/></div>
        <div className="Annouce-details-2">
            <h1 className="  popular-name-details">{announce_to_display.name}</h1>
            <div className="fav-details">
               <span className=" popular-description-details">{announce_to_display.bedrooms} bedrooms .{announce_to_display.bethrooms} bethrooms .{announce_to_display.space}m</span>
               <FavoriteBorderIcon className="like-details"/>
            </div>
            <div className="contact">
              <div className="contact-icon">
                <button  className="contact-msg-btn"><TelegramIcon className="contact-msg"/></button>  
                <button  className="contact-call-btn"><PhoneIcon className="contact-call"/></button>
              </div>
              
              <h3 className=" popular popular-price-details">{announce_to_display.price}</h3>
            </div>
            <div className="location"><img src={announce_to_display.map}/></div>
            <h1 className="photos-name">Photos</h1>
            <div className="photo-details">
            <img src={house}/>
            <img src={house}/>
            <img src={house}/>
            <img src={house}/>
            <img src={house}/>
            <img src={house}/>
          

            </div>
        </div>
        
        
    </article>
    
    

    </>
    
    
  )
}

export default Details;