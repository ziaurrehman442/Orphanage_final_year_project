import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import Navbar from '../../Navbar';
import { Link } from 'react-router-dom';

const Orphanages = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [orphanages, setOrphanages] = useState([]);

    useEffect(() => {
        const fetchOrphanages = async () => {
            try {
                const response = await fetch('http://localhost:4000/orphanages');
                const data = await response.json();
                setOrphanages(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching orphanages:', error);
                setIsLoading(false);
            }
        };

        fetchOrphanages();
    }, []);

    return (
        <div className="auction-cat" style={{ justifyContent: 'left' }}>
            <Navbar />
            <h1 align="center" className='bg-warning' style={{ marginTop: '10px', marginBottom: '10px', color: 'black' }}>
                Orphanages
            </h1>
            <div className="row">
                {isLoading ? (
                    <div className="text-center w-100 mt-5">
                        <Circles height={80} width={80} color="#FFC107" ariaLabel="circles-loading" />
                    </div>
                ) : (
                    <>
                        {orphanages.map(orphanage => (
                            <div className="col-md-4 mb-3" key={orphanage.id}>
                                <div className="card shadow-sm">
                                    <img src={orphanage.image} className="card-img-top img-fluid rounded-start" alt="Orphanage" style={{ height: '100%' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{orphanage.name}</h5>
                                        <p className="card-text" style={{color: 'black'}}>{orphanage.city}</p>
                                        <a href={`mailto:${orphanage.email}`} className="btn btn-warning">Contact</a>
                                        <Link to={`/Orphanage/${orphanage.id}`} className="btn btn-warning ml-3">Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Orphanages;
