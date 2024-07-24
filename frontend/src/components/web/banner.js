import React from 'react';
import './Banner.css'; // Import CSS for styling
import { useTranslation } from 'react-i18next';

const Banner = ({ text }) => {
    const {t} = useTranslation();
  return (
    <div className="banner">
      <div className='container'>
        <h1>
        {t("About_Online_Auction")}
        </h1>
        <p>
          {t('about_auction')}
        </p>
      </div>
      <button className='btn btn-warning known' >
        {t('more')}
      </button>
    </div>
  );
};

export default Banner;
