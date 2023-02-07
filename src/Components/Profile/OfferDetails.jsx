import React from 'react';
import "./OfferDetails.css";

const OfferDetails = ({ selectedOffer }) => {
  if (!selectedOffer) {
    return( 
    <div className="offer-details">
      <h1 className='offersDetails-title'>Détails des offres</h1>
      Veuillez sélectionner une offre
      </div>
    
  );}

  return (
    <div className="offer-details">
      <h1 className='offersDetails-title'>Détails des offres</h1>
      Nom: {selectedOffer.name}<br />
      Sender: {selectedOffer.sender}<br />
      Prixe: {selectedOffer.price}<br />
      Message: {selectedOffer.message}
    </div>
  );
};

export default OfferDetails;
