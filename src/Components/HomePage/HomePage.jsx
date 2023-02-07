import "../HomePage/HomePage.css"
import { Link } from "react-router-dom"
import React,{useEffect, useState} from "react";
import devs from '../../data'

import FilterListIcon from '@mui/icons-material/FilterList';

import {Announce} from "./Announce";
import DetailsAnn  from "../DetailsAnn/DetailsAnn";
import NavBarr from"../NavBarr/NavBarr";
import List from "../NavBarr/List"

import { Filter } from "./Filter";
import axios from 'axios';
import { BiSearch} from 'react-icons/bi';



export const HomePage = () => {
    const [show,setShow]=useState(1)
    const [data,setdata]=useState(2)
    const [hide,setHide]=useState(false)
   
    /*const [filter,setFilter]=useState('');
   
    const searchText=(e)=>{
        setFilter(e.target.value )

    }
   let dataSearch=devs.cardDevs.filter(det=>{
       return Object.keys(det).some(key =>
        det[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    });*/

const [cityType,setCityType]=useState('all');
function onFilterValueSelected(filterValue){
    setCityType(filterValue);
}


// const announceToDisplay = cityType === 'all' ? devs.cardDevs : ["devs.cardDevs.filter( (d) => { d.city === cityType } )"]
const [announceToDisplay, setAnnounceToDisplay] = useState([])
const fetchannonces = async () => {
    const announce = await axios.get('http://localhost:8000/api/showAllannonces');

        console.log(announce.data)
        setAnnounceToDisplay(announce.data)



    }

    useEffect(() => {
        fetchannonces();
    }, [])

  /*  useEffect(() => {
        let filteredByWilaya = cityType === 'all' ? devs.cardDevs :
         devs.cardDevs.filter( (d) => {
            return d.city === cityType
        } ) 

        
        setAnnounceToDisplay(filteredByWilaya);
    }, [cityType])
*/
const [date_debut,setdate_debut]=useState("");  
const [date_fin,setdate_fin]=useState('');  
const [type,setType]=useState('');
var [wilaya,setWilaya]=useState('');

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
  console.log(e.target.value);

  wilaya =e.target.value;

  console.log(wilaya);
   getcommunes();
  //console.log(devs.cardDevs.filter((d)=>d.city==selectedId));
  // const arr = devs.cardDevs.filter((d)=>d.city==selectedId)
  // const selectedCityType = arr.length !== 0 ? arr[0]: false;
  // setCityType(selectedCityType);
}

const getcommunes=async()=>{
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
    console.log(wilaya);
    console.log(Commune);
    console.log(date_debut);
    console.log(date_fin);

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
          setAnnounceToDisplay(res.data)
        
        } else {
          alert('Something went wrong while creating annonce')
        }})

       
}
const [filteredData, setFilteredData] = useState([]);
const [wordEntered, setWordEntered] = useState("");

const handleFilter = (event) => {
  const searchWord = event.target.value;
  setWordEntered(searchWord);
  
  let formField = new FormData()
  formField.append('word',searchWord)
 
  console.log(formField)   
         axios({
          method: 'post',
          url:'http://localhost:8000/api/search',
          data: formField
        }).then(res => {
          console.log(res)
          setAnnounceToDisplay(res.data)


         })

         

};


const clearInput = () => {
  setFilteredData([]);
  setWordEntered("");
};
    return ( 
        
        <div className="manel">
            <NavBarr/>
          
      
            <div className="search">
      <div className="searchInputs">
      <div className="searchIcon">
          {filteredData.length === 0 ? (
            <BiSearch />
          ) : (
            <BiSearch id="clearBtn" onClick={clearInput} />
          )}
        </div>
        <input
          type="text"
          value={wordEntered}
          onChange={handleFilter}
        />
        
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p >{value.name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
            <div className="Add">
                <div className="List-zone"><List/></div>
                <div className="right-side">
                    <div className="Ad-middle">
                        <div className="filter">
                       <p>Toutes les annonces</p>
                       <div className="flt" onClick={()=>setHide(!hide)} > <FilterListIcon className="filter-icon"/></div>
                       </div>
                      { hide?<div className="filter-type">
                      
                       
    <div className="Filter-dsply">
      
      <div className="Filter-type">
       <select className="slct_opt" 
  value={type} 
  onChange={(e)=>{setType(e.target.value)}}>

<option> Terrain</option>
            <option> Terrain_Agricole</option>
            <option>Appartement</option>
            <option>  Maison</option>
            <option> Bungalow</option>   
       </select>

       <select className="slct_opt" value={wilaya} 
       onChange={(e)=>{onChangeComboBox(e); setWilaya(e.target.value);}}>

     <option  value=""> wilayas</option>
   {wilayas && wilayas.map && wilayas.map((cat) => (
     <option key={cat.id}  value={cat.wilaya}>
       {cat.wilaya}
     </option>))}
                     
       </select>

       <select className="slct_opt" 
     value={Commune} 
     onChange={(e)=>{setCommune(e.target.value)}}>

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
       
   
   



                         </div>:null}
                      

                       <div className="Announce-list">
                          <div className="Announce-devList"  >{
                          announceToDisplay.map(det =>
                          <div key={det.id} onClick={()=>setShow(det.id)}> 

                          <Announce 
                          titre={det.titre}
                          wilaya={det.localisation.wilaya}
                          prix={det.prix}
                           date={det.date}
                           imageprincip={det.imageprincip}
                            description={det.description}
                            categorie={det.categorie}
                            type={det.type}
                            id={det.id}
                            surface={det.surface}
                            contact={det.contact}/>  </div>
                            )}
                           </div>
                       </div>
                    </div>
                    
                </div>

            </div>
        </div>
        
        
     );
}