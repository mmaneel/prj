import "../LandingPage/LandingPage.css"
import React,{useEffect, useState} from "react";

import NaviBar from "./NaviBar";
import AboutUs from "./AboutUs";
import { Link } from "react-router-dom"
import LandImg from "./LandImg";
import devs from "../../data";
import axios from 'axios';

const LandingPage = () => {

  const [noOfElement,setnoOfElement]=useState(6);
  const slice= devs.cardDevs.slice(0,noOfElement);
  const loadMore=()=>{
    setnoOfElement(noOfElement+noOfElement)
  }
  const [announceToDisplay, setAnnounceToDisplay] = useState([])
  const fetchannonces = async () => {
      const announce = await axios.get('http://localhost:8000/api/showAllannonces');
  
          console.log(announce.data)
          setAnnounceToDisplay(announce.data)
  
  
  
      }
  
      useEffect(() => {
          fetchannonces();
      }, [])
  
  

    return (
      <div className="LandingPage">
        <div className="Navbar">
          <NaviBar />
          
          
          <div className="about-display">
          {
                          announceToDisplay.map(det =>
                          <div id={det.id} > 
                          <AboutUs
                        titre={det.titre}
                        wilaya={det.localisation.wilaya}
                        prix={det.prix}
                         date={det.date}
                         imageprincip={det.imageprincip}
                          description={det.description}
                          categorie={det.categorie}
                          type={det.type}
                          surface={det.surface}
                          contact={det.contact}
                          commune={det.localisation.commune}
                           />  </div>)}
            
          </div>

          <button className="btn-more" onClick={()=>loadMore()}>More</button>
         
          
        </div>
        </div>

      );
}
 
export default LandingPage;