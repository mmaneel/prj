import React, { useState,useRef,useEffect ,component} from 'react'
import './AddAnnounce.css'
import NavBarr from '../NavBarr/NavBarr'
import List from '../NavBarr/List'
import { EmailRounded, TitleRounded } from '@mui/icons-material';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import MultiImageInput from 'react-multiple-image-input';
import axios from 'axios';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import _ from 'lodash'
function AddAnnounce(props) {

 


  const [Titre,setTitre]=useState('');
  const [imageprincip, setimage] = useState(null);
//  const [localisation, setlocalisation] = useState(0);

  const [price,setPrice]=useState('');
  const [surface,setSurface]=useState('');
  const [type,setType]=useState('');
  const [categorie,setCategorie]=useState('');
  var [wilaya,setWilaya]=useState('');
  const [Commune,setCommune]=useState('');
  const [adresse,setAdresse]=useState('');
  const [nom,setnom]=useState('');
  const [prenom,setprenom]=useState('');
  const [numero,setnumero]=useState('');
  const [adresse_contact,setAdresse_contact]=useState('');
  const [description,setdescription]=useState('');
  const [email,setemail]=useState('');
 // const [contact,setcontact]=useState(null);

  const handletitre=(e)=>{
    const getname=e.target.value; 
    setTitre(getname);
    console.log(getname)
  }
  const handleprice=(e)=>{
    const getprice=e.target.value; 
    setPrice(getprice);
  }
  const handlesurface=(e)=>{
    const getsurface=e.target.value; 
    setSurface(getsurface);
  }
  const handletype=(e)=>{
    const gettype=e.target.value; 
    setType(gettype);
  }
  const handlecategorie=(e)=>{
    const getcategorie=e.target.value; 
    setCategorie(getcategorie);
  }
  const handlewilaya=(e)=>{
    const getwilaya=e.target.value; 
    setWilaya(getwilaya);
  }
  const handlecommune=(e)=>{
    const getcommune=e.target.value; 
    setCommune(getcommune);
  }
  const handleadresse=(e)=>{
    const getadresse=e.target.value; 
    setAdresse(getadresse);
  }
  const handledescription=(e)=>{
    const getdescription=e.target.value; 
    setdescription(getdescription);
  }
  
  const handleimage=(e)=>{
   /* const getimage=e.target.files[0]; 
    setimage(getimage);*/
    setimage(e.target.files[0]);

    console.log(imageprincip)
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(`Get Name ${price} ${price}`)
    console.log('${titre}');
  }
  //*//

  const Ajoutannonce=async()=>{
    let formField = new FormData()
    formField.append('wilaya',wilaya)
    formField.append('commune',Commune)
    formField.append('adresse',adresse)
    formField.append('titre',Titre)
    formField.append('surface',surface)
    formField.append('description',description)
    formField.append('prix',price)
    formField.append('categorie',categorie)
    //formField.append('contact',contact)
    formField.append('imageprincip',imageprincip)

    formField.append('type',type)

   // formField.append('image',image)
    console.log(formField)     //create annonce
           axios({
            method: 'post',
            url:'http://localhost:8000/api/deposerannonce/2',
            data: formField
          }).then(res => {
            console.log(res)
            console.log(res.statusText)
            console.log(res.status)

            if (res.statusText== "OK") {
             var id =res.data.id ;
             for(let i=0;i<images.length;i++)
             { console.log(i);
              console.log(images[i]);
              console.log(id);
               const formData = new FormData();
              formData.append('id_annonce',id)
              formData.append('image', images[i]);
              try {
                 axios.post('http://localhost:8000/api/addimage', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });
              } catch (error) {
                console.error(error);
              }
            }
             }
             
          
             else {
              alert('Something went wrong while creating annonce')
            }})

           
  }
  const photo=[
    {id:1, src:"./Image/house.jpg", title:"house"},
    {id:2, src:"./Image/house2.jpg", title:"house2"},
    { id:3,src:"./Image/house3.jpg", title:"house3"},
    { id:4,src:"./Image/house4.jpg", title:"house4"}

]
  const [images, setImages] = useState();
  const onChange=(event)=>{
  setImages(event.target.files)
  }

const [wilayas,setWilayas]=useState([]);
  useEffect(() => {
    // Load the wilayas from the backend
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
const [Communes,setCommunes]=useState([]);

const getcommunes=async()=>{
  fetch(`http://localhost:8000/api/communes/${wilaya}`)
  .then((response) => response.json())
  .then((data) => {
    // `data` is the array of categories returned from the server
    console.log(data);

    // You can use the data in your component by storing it in state
    setCommunes(data);})
}


  return (
    <>
    <NavBarr/>
    <div className='ann'>
        <List/>
        <div className='add-ann-steps'>
          <form className='add-ann-steps-display' onSubmit={handleSubmit}>
          <div className='dv-name'>
          <label htmlFor='nom'>Titre :</label>
          <input   value={Titre}  className="name-step" placeholder='Name' type="text" onChange={(e)=>handletitre(e)}/>
          </div>
          <div className='dv-name'>
          <label>Price :</label>
          <input value={price}  className="name-step" placeholder='Price DA' type="text" onChange={(e)=>handleprice(e)}/>
          </div>
          <div className='dv-name'>
          <label> La Surface:</label>
          <input value={surface}  className="name-step" placeholder='La Surface m' type="text" onChange={(e)=>handlesurface(e)}/>
          </div>
          <div className='dv-name'>
          <label>Type :</label>
          <select className="slct_opt" 
  value={type} 
  onChange={(e)=>{setType(e.target.value)}}>
                <option> </option>

            <option> Terrain</option>
            <option> Terrain_Agricole</option>
            <option>Appartement</option>
            <option>  Maison</option>
            <option> Bungalow</option>
          </select>
          </div>
          <div className='dv-name'>
          <label>Categorie:</label>
          <select className="slct_opt" 
  value={categorie} 
  onChange={(e)=>{setCategorie(e.target.value)}}> 
           <option> </option>

            <option> Vente</option>
            <option> Echange</option>
            <option> Location</option>
            <option>Location_vacances</option>
          </select>
          </div>

          <div className='dv-name'>
          <label>La Wilaya:</label>
          <select className="slct_opt" value={wilaya} 
       onChange={(e)=>{onChangeComboBox(e); setWilaya(e.target.value);}}>

     <option  ></option>
   {wilayas && wilayas.map && wilayas.map((cat) => (
     <option key={cat.id}  value={cat.wilaya}>
       {cat.wilaya}
     </option>))}
                     
       </select>

          </div>
          <div className='dv-name'>
          <label>La Commune:</label>
          <select className="slct_opt" 
     value={Commune} 
     onChange={(e)=>{setCommune(e.target.value)}}>

         <option  className='k' ></option>
         {Communes && Communes.map && Communes.map((cat) => (
     <option key={cat.id} value={cat.Commune}>
       {cat.commune}
     </option>))}
       </select>
          </div>
          <div className='dv-name'>
          <label> L'Adresse:</label>
          <input value={adresse}   className="name-step" placeholder='Adresse' type="text" onChange={(e)=>handleadresse(e)}/>
          </div>
          <div className='dv-name'>
          <label> Description:</label>
          <input  value={description}  className="description-step" placeholder='Description' type="text" onChange={(e)=>handledescription(e)}/>
          </div>
        
          <div className='dv-name'>
          <label> Photo principale</label>
          <input type="file" src={imageprincip} className="form-control" onChange={(e)=>handleimage(e)}/>
          </div>
<div className='dv-name'>
          <label 
          >photos:</label>
          <div className='d-flex'>
          <div>
          <input
           type="file" multiple  onChange={(e)=>onChange(e)}
            className="photo-step uploader-input" />

          </div>

          </div>
              
          </div>

          <button  onClick={Ajoutannonce} className='add-btn'>Ajouter</button>
        </form>
                </div>
   
    </div>
    </>
  )
}

export default AddAnnounce