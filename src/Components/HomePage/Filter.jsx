import React, { useState,useEffect } from "react";
import "../HomePage/Details.css";
import devs from '../../data'
import BookData from "../../data.json";
import EsseyF from "./EsseyF";
import "../HomePage/Filter.css"
import axios from 'axios';


export const Filter=(props) =>{

  
  const [date_debut,setdate_debut]=useState("");  
  const [date_fin,setdate_fin]=useState('');  
  const [type,setType]=useState('');
  var [wilaya,setWilaya]=useState('');
  var  [Wilayaid,setWilayaid]=useState('');

  const [wilayas,setWilayas]=useState([]);
  const [Communes,setCommunes]=useState([]);

  const [Commune,setCommune]=useState('');
  // const [cityType,setCityType]=useState();

  useEffect(() => {
    // Load the wilayas from the backend
    Filtrerannonces();
    fetch("http://localhost:8000/api/wilayas")
  .then((response) => response.json())
  .then((data) => {
    // `data` is the array of wilayas returned from the server
    console.log(data);

    // You can use the data in your component by storing it in state
    setWilayas(data);
  });

  }, []);

  const  onChangeComboBox=(e)=>{
    console.log(e.target.value)
   // setWilaya(e.target.value))

    wilaya =e.target.value
    console.log(wilaya)
     getcommunes();
    //console.log(devs.cardDevs.filter((d)=>d.city==selectedId));
    // const arr = devs.cardDevs.filter((d)=>d.city==selectedId)
    // const selectedCityType = arr.length !== 0 ? arr[0]: false;
    // setCityType(selectedCityType);
  }
  useEffect(() => {
         getcommunes();

  }, [wilaya]);
  const getcommunes=async()=>{
    console.log(Wilayaid)
    fetch(`http://localhost:8000/api/communes/${wilaya}`)
    .then((response) => response.json())
    .then((data) => {
      // `data` is the array of categories returned from the server
      console.log(data);
  
      // You can use the data in your component by storing it in state
      setCommunes(data);})
  }

/*const searchText=(e)=>{
  setFilter(e.target.value )

}
let dataSearch=devs.cardDevs.filter(det=>{
 return Object.keys(det).some(key =>
  det[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
  )
});*/
const Filtrerannonces=async()=>{
  let formField = new FormData()
  formField.append('wilaya',wilaya)
  formField.append('commune',Commune)
  formField.append('date_debut',date_debut)
  formField.append('date_fin',date_fin)
  //formField.append('contact',contact)
  formField.append('type',type)
  console.log(formField)
  console.log(date_debut)
          axios({
          method: 'POST',
          url:'http://localhost:8000/api/filtrer',
          data: formField
        }).then(res => {
          console.log(res)
          console.log(res.statusText)
          console.log(res.status)

          if (res.statusText== "OK") {
          //  setAnnounceToDisplay(res.data)
          
          } else {
            alert('Something went wrong while creating annonce')
          }})

         
}
  return (
    <>
    
    <div className="Filter-dsply">
      
           <div className="Filter-type">
            <select className="slct_opt" 
       value={type} 
       onClick={(e)=>{onChangeComboBox(e);setType(e.target.value)}}>

              <option id={0} value={'all'} className='k'  >{'Type'}</option>
                  {devs.cardDevs.map((d)=>(
                          <option id={d.id} value={d.city} >{d.city}</option>))}
                          
            </select>

            <select className="slct_opt" value={wilaya} id={Wilayaid}
            onChange={(e)=>{onChangeComboBox(e);}}>

          <option id="" value=""> wilayas</option>
        {wilayas && wilayas.map && wilayas.map((cat) => (
          <option key={cat.id} id={cat.id} value={cat.wilaya}>
            {cat.wilaya}
          </option>))}
                          
            </select>

            <select className="slct_opt" 
          value={Commune} 
          onChange={(e)=>{onChangeComboBox(e);setCommune(e.target.value)}}>

              <option id={0} value={'all'} className='k' >{'Commune'}</option>
              {Communes && Communes.map && Communes.map((cat) => (
          <option key={cat.id} value={cat.Commune}>
            {cat.commune}
          </option>))}
            </select>

            <input type="date" value={date_debut} onChange={(e)=>setdate_debut(e.target.value)}/>
      <input type="date" value={date_fin} onChange={(e)=>setdate_fin(e.target.value)} />
                       
                       
            </div>
            <button className="sb-btn" onClick={Filtrerannonces}>Filtrer</button>
            </div>
            {/* <EsseyF  placeholder="..." data={BookData} /> */}
            
        
        

    

    </>
    
    
  )
}
const City = ({ name }) => <div>{name}</div>;


export default Filter;