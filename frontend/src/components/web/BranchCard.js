import React from 'react';

const BranchCard = ({ branch }) => {
    return (
        <div className="card" style={{width: '400px', marginLeft:"2px"}}>
            <div className="card-body">
            <h5 className="card-title"><strong>Branch id:</strong> {branch.branch_id}</h5>
                <h5 className="card-title"><strong>City:</strong> {branch.city}</h5>
                <p className="card-text" style={{color: 'black'}}><strong>Address:</strong> {branch.Address}</p>
                <p className="card-text" style={{color: 'black'}}><strong>Capacity:</strong> {branch.Capacity}</p>
                <p className="card-text" style={{color: 'black'}}><strong>Number of Rooms:</strong> {branch.N_room}</p>
                <p className="card-text" style={{color: 'black'}}><strong>Number of Washrooms:</strong> {branch.No_washrooms}</p>
                <p className="card-text" style={{color: 'black'}}><strong>Number of Showers:</strong> {branch.No_showers}</p>
            </div>
        </div>
    );
};

export default BranchCard;
