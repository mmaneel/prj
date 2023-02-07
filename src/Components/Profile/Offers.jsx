import React, { useState } from 'react';
import "./Offers.css";

const Offers = ({ offers, setSelectedOffer }) => {
  const [selectedOffer, handleOfferSelection] = useState(null);
  const handleClick = (offer) => {
    setSelectedOffer(offer);
    handleOfferSelection(offer);
  };
  return (
    <div className="offers-container">
      <h1 className='offers-title'>Offres actuelles</h1>
      {offers.map(offer => (
        <div className={`offer-box ${ selectedOffer === offer ? 'selected' : ''}`} key={offer.name} onClick={() => handleClick(offer)}>
          <div className="offer-name">{offer.name}</div>
          <div className="offer-price">Prix: {offer.price}</div>
        </div>
      ))}
    </div>
  );
};

export default Offers;
