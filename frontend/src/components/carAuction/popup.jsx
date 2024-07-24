import React, { useState } from 'react';
import Gallery from './Gallery';

const GalleryPop = ({ onClose, auctionId }) => {

    console.log(auctionId);
  return (
    <div id="popup" style={{ backgroundColor: 'white', minWidth: '90%', minHeight: '200px', zIndex: 999, borderRadius: '20px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', position: 'absolute', paddingRight: '50px' }}>
      <div align="right">
        <button onClick={onClose} className="m-3 btn btn-danger">
          Close
        </button>
      </div>
      <div className="row">
        <Gallery id={auctionId} />
      </div>
    </div>
  );
};

export default GalleryPop;
