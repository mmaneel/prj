import React, { useState } from "react";

import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import '../Profile/Profile.css'
import devs from '../../data'
import  ANN from '../../annonce'

import ListP from "./ListP"
import MyAnnounce from "./MyAnnounce";


function Profile() {
   
    const [showa,setShowa]=useState(1)
  return (
    <>
    <div className="Profile">
    
        <div className="profile-list-1">
        <ListP/>
        </div>
        <div className="profile-list-id">
        <div className='all-ann'>
        <h1 className='all-ann-h'>Mes Annonce</h1>
        <div className='all-ann-display'>
           
            {ANN.annonce.map(props =>
                          <div key={props.id}> 
                          <MyAnnounce 
                           Wilaya={props.Wilaya}
                           Commune={props.Commune}
                           name={props.name} 
                           price={props.price}
                            pic={props.pic}
                            Type={props.Type}
                            time={props.time}
                            space={props.space}
                           />
                            </div>)}
        </div>
        </div>
                            
        </div>
    </div>
    </>
  )
}

export default Profile