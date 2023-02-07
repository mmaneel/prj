import React, { useState } from 'react'
import'../Profile/Chat.css'
import Profile from './Profile'
import avatar from'../../assets/avatar.jpg';
import SendIcon from '@mui/icons-material/Send';
import ListP from './ListP';
import OfferDetails from './OfferDetails';
import Offers from './Offers';


  const Chat = () => {
    const [offers, setOffers] = useState([
       { name: 'Offer 1', sender: 'John Doe', price: 100, message: 'This is a great offer!' },
       { name: 'Offer 2', sender: 'Jane Doe', price: 200, message: 'Take advantage of this offer now!' },
       { name: 'Offer 3', sender: 'John Smith', price: 300, message: 'Limited time only!' },
       { name: 'Offer 4', sender: 'Jane Smith', price: 400, message: 'Don\'t miss out!' },
       { name: 'Offer 5', sender: 'John Doe', price: 500, message: 'Hurry!' },
    ]);
    const [selectedOffer, setSelectedOffer] = useState(null);
  
  return (
    <>
    <div className="Chat">
        <ListP/> 
    {/* <div className='chat-dv'>
        <h1 className='chat-dv-h'>Chat</h1>
        <div className='chat-display'>
            <div className='offers'>
                <div className='off'>
                    <div className='off-img'><img src={avatar}/></div>
                    <div className='off-name'>
                        <h6>Courtney Henry</h6>
                        <span>1 offer</span>
                    </div>
                    <div className='off-time'>
                        <span>02 Feb</span>
                        <div className='crcl'></div>
                    </div>
                </div>
               
            </div>
            <div className='off-msg'>
                <div className='off-msg-name'>
                <h6>Courtney Henry</h6>

                </div>
                <div className='off-dsc'>
                    <div className='dsc-left'>
                    <img  className='img-dsc' src={avatar}/>
                    <div className='msg-left'>Lorem ipsum dolor sit a consectetuer </div>
                    </div>
                    <div className='dsc-right'>
                    <div className='msg-right'>Lorem ipsum dolor sit a consectetuer </div>
                    <img  className='img-dsc' src={avatar}/>
                    </div>
                </div>
                <div className='off-text'>
                    <input className='msg-input' placeholder='Type a message'></input>
                    <div  className='msg-icon'><SendIcon/></div>
                </div>
            </div>
        </div>
   
    
    </div>
     */}
     {offers.length > 0 ? (
        <>
          <Offers offers={offers} setSelectedOffer={setSelectedOffer} />
          <OfferDetails selectedOffer={selectedOffer} />
        </>
      ) : (
        <div className="no-offers-message">
          No Offers to Display
        </div>
      )}

    </div>
    </>
  )
}

export default Chat