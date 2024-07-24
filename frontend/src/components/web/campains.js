import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';

const Campaigns = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('http://localhost:4000/campaign');
                const data = await response.json();
                setCampaigns(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
                setIsLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    return (
        <>
        <Navbar />
        <div className="auction-cat" style={{ justifyContent: 'left' }}>
            <h1 align="center" className='bg-warning' style={{ marginTop: '10px', marginBottom: '10px', color: 'black' }}>
                Campaigns
            </h1>
            <div className="row">
                {isLoading ? (
                    <div className="text-center w-100 mt-5">
                        <Circles height={80} width={80} color="#FFC107" ariaLabel="circles-loading" />
                    </div>
                ) : (
                    <>
                        {campaigns.map(campaign => (
                            <div className="col-md-4 mb-3" key={campaign.id}>
                                <div className="card shadow-sm">
                                    <img src={campaign.image} className="card-img-top img-fluid rounded-start" alt="Campaign" style={{ height: '100%' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{campaign.title} <span style={{float:'right'}}>Price: {campaign.amount}</span></h5>
                                        <p className="card-text" style={{color: 'black'}}><span className="itemValue" dangerouslySetInnerHTML={{ __html: campaign.Description }}></span></p>
                                        <Link to={`./Donation`} className="btn btn-warning">Donation</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
        </>
    );
};

export default Campaigns;
