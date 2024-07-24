import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import Navbar from '../../Navbar';
import './ChildPage.css'; // Ensure you create this CSS file

const ChildPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalChildren, setTotalChildren] = useState(0);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const response = await fetch('http://localhost:4000/child');
                const data = await response.json();
                setTotalChildren(data.length); // Assuming data is an array
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching children:', error);
                setIsLoading(false);
            }
        };

        fetchChildren();
    }, []);

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
                <h2 className="mb-4 text-center page-title">About Our Orphan Children</h2>

                <div className="text-center mb-4 content-section">
                    <p className="content-text">
                        We are dedicated to providing loving care to orphan children aged 0 to 20. 
                        Currently, we have <strong>{totalChildren}</strong> children under our care.
                    </p>
                    <p className="content-text">
                        Our organization is dedicated to providing a nurturing and supportive environment for orphaned children, 
                        who are among the most vulnerable members of our society. Each child in our care is treated with the utmost 
                        respect and compassion, receiving the love and attention they deserve.
                    </p>
                    
                    <p className="content-text">
                        We focus on the holistic development of each child, ensuring they have access to education, healthcare, and 
                        emotional support. Our dedicated team works tirelessly to create a safe and enriching environment where 
                        children can thrive and build a brighter future.
                    </p>
                    
                    <p className="content-text">
                        We believe every child deserves the opportunity to grow up with dignity and hope. Our mission is to ensure 
                        that these children are not only cared for but are also empowered to reach their full potential. Through 
                        various programs and initiatives, we strive to make a lasting impact on their lives and help them become 
                        confident, capable individuals ready to contribute positively to society.
                    </p>

                    <p className="content-text">
                        If you would like to learn more about our programs or how you can support our cause, please feel free 
                        to get in touch with us. Together, we can make a difference in the lives of these remarkable children.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ChildPage;
