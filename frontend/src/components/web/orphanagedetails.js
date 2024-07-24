import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import OrphanageCard from './OrphanageCard';
import BranchCard from './BranchCard';
import Navbar from '../../Navbar';

const OrphanageDetailsfront = () => {
    
    const { id } = useParams(); // Assuming you get the orphanage ID from URL params
    const [isLoading, setIsLoading] = useState(true);
    const [orphanage, setOrphanage] = useState(null);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchOrphanageDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/orphanages/${id}`);
                const data = await response.json();
                setOrphanage(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching orphanage details:', error);
                setIsLoading(false);
            }
        };

        const fetchBranches = async () => {
            try {
                const response = await fetch(`http://localhost:4000/orphanages/${id}/branches`);
                const data = await response.json();
                setBranches(data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        fetchOrphanageDetails();
        fetchBranches();
    }, [id]);

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Circles height={80} width={80} color="#FFC107" ariaLabel="circles-loading" />
            </div>
        );
    }

    return (
        <>
        <Navbar />
        <div className="container mt-5">
            <h2 className="mb-4">{orphanage.name} Details</h2>
            
            {/* Display Orphanage Card */}
            <OrphanageCard orphanage={orphanage} />
            
            <div className="mt-5">
                <h3 style={{marginLeft:'25px'}}>Branches</h3>
                <div className="new">
        <div className="newContainer"><div className="content">
        <div className="top">
                <div className='row'>
                {branches.length === 0 ? (
                    <p>No branches found for this orphanage.</p>
                ) : (
                    branches.map(branch => (
                        <BranchCard key={branch.branch_id} branch={branch} />
                    ))
                )}</div>
                </div></div></div></div>
            </div>
        </div>
        </>
       
    );
};

export default OrphanageDetailsfront;
