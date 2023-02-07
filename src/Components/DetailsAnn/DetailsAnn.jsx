import '../DetailsAnn/DetailsAnn.css'
import List from '../NavBarr/List'
import NavBarr from '../NavBarr/NavBarr'
import house from '../../assets/house.jpg'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import devs from '../../data'
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import  { useEffect} from 'react';
import { useParams } from 'react-router';
function DetailsAnn() {
    
    const location=useLocation();
    const data=location.state?.data;
    
    const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
        currency: "DZD",
        style: "currency",
        });
        const formatCurrency = (number) => {
        return CURRENCY_FORMATTER.format(number);
        };
    const {id} = useParams();
         
   const [announce, setannounce] = useState([])
    const [localisation, setlocalisation] = useState([])     
        useEffect(() => {
           
            
            getSingleAnnonce();
        },[])
   
    var [images, setimages] = useState([])

     const getSingleAnnonce = async () => {
        console.log(`http://localhost:8000/api/${id}`)
          const res = await axios.get(`http://localhost:8000/api/${id}`)
          console.log(res);
          setannounce(res.data);
          console.log(announce);   
          setlocalisation(res.data.localisation)
          console.log(localisation);   
          fetch(`http://localhost:8000/api/getannonceimages/${id}`)
          .then((response) => response.json())
          .then((data) => {
            // `data` is the array of categories returned from the server
            console.log(data.length);
        
            // You can use the data in your component by storing it in state
         
            setimages(data);
                    
})
        
        }
        useEffect(() => {
            console.log(images);
          }, [images]);
          
 const path="http://127.0.0.1:8000/"
 const [selectedImg,setSelectedImg]=useState(announce.imageprincip);
  return (
    <>
    <div className='DetailsAnn'>
        <NavBarr/>
    <div className="det-An-1">
        <div>
        <List/>
        </div>
        <div className='INNFO'>
            <h1 className='INNFO-h'>{announce.titre}</h1>
        <div className='INFO-det'>
           <div className='info-dv-pic'><img className='dv-pic-main' src={path+announce.imageprincip}/></div>
           <div className='ic-pic'>
           <NavigateBeforeIcon />
           <div className='photo-lst'>
           {
            images.map((imag)=>(
            <img style={{border : selectedImg === imag.image ? "1px  solid black":""}}
             src={path+imag.image} 
             key={imag.id}
               alt="hell" 
               height="80"
                weidth="80"
                onClick={() =>setSelectedImg(imag.image)}/>
                
            ))}

           
           </div>
         
           <NavigateNextIcon/>
           </div>
           <div className='an-date'><span>{announce.date}</span></div>
           <div className='dv-price-info'>
           <div className='lb-info montant'>{formatCurrency(announce.prix)} </div>
            <div className='lb-info'> 
                <label>Type : </label>
                <p>{announce.type}</p>
            </div>
            <div className='lb-info'> 
                <label>Categorie : </label>
                <p> {announce.categorie}</p>
            </div>
            <div className='lb-info'> 
                <label>Surface : </label>
                <p> {announce.surface}</p>
            </div>
            <div className='lb-info'> 
                <label>Wilaya : </label>
                <p> {localisation.wilaya}</p>
            </div>
            <div className='lb-info'> 
                <label>La Commune : </label>
                <p> {localisation.commune}</p>
            </div>
            <div className='lb-info'> 
                <label> Adresse : </label>
                <p> {localisation.adresse}</p>
            </div>
            <div className='lb-info'> 
               <LocationOnIcon /><h1 className='montant lb-h'> Localisation </h1>
            </div>
            <div className='lb-info lb-dsc'> 
                <label>Description : </label>
                <p className='Lb-p'> {announce.description}</p>
            </div>
           

           </div>
           


        </div>
        </div>
        </div>
        
    </div>
    </>
  )
}

export default DetailsAnn