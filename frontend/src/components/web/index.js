import React, { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import Navbar from '../../Navbar';
import SlideShow from '../slideshow/SlideShow';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

const Main = () => {
    const [isLoadingOrphanages, setIsLoadingOrphanages] = useState(true);
    const [orphanages, setOrphanages] = useState([]);
    const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        // Fetch orphanages
        const fetchOrphanages = async () => {
            try {
                const response = await fetch('http://localhost:4000/orphanages');
                const data = await response.json();
                setOrphanages(data);
                setIsLoadingOrphanages(false);
            } catch (error) {
                console.error('Error fetching orphanages:', error);
                setIsLoadingOrphanages(false);
            }
        };

        // Fetch campaigns
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('http://localhost:4000/campaign');
                const data = await response.json();
                setCampaigns(data);
                setIsLoadingCampaigns(false);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
                setIsLoadingCampaigns(false);
            }
        };

        fetchOrphanages();
        fetchCampaigns();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                {!isMobile && <SlideShow />}
            </div>
            <div className="main-site-wrap" style={{ width: '100%' }}>
                <div className="text-center mt-3">
                    <h1 align="center" className='bg-warning' style={{ marginTop: '10px', marginBottom: '10px', color: 'black' }}>
                        Orphans Details
                    </h1>
                    <div className='container'>
                    <p style={{ color: 'black', margin: '10px' }} align='left'>
                        All over the world, there are more than 200 charitable organizations that have put in place 
                        children's homes and orphanages to help accommodate homeless children and orphans. In 2024, 
                        there was an estimate of over 100 million orphans. 250,000 children are adopted annually but 
                        14,050,000 orphan children will grow up and age out of the orphan care system without ever 
                        having been part of a loving family. There are a total of 101 Orphanages in Pakistan as of January 
                        09, 2024. There are currently over 4.6 million orphaned children living in Pakistan. When a child 
                        loses one or both parents, their life is changed forever. Pakistan has one of the highest poverty 
                        rates in the world, sitting at 51.7 percent, according to the International Poverty Index. The current 
                        system for managing orphanage information relies on manual paperwork stored in files, making it 
                        inefficient and prone to errors and loss. Data entry clerks record information on paper, file it, and 
                        store it in cupboards, leading to high costs and difficulties in accessing and managing data. There 
                        is no tracking of transferred or adopted children, and the lack of data backups poses a risk of 
                        information loss in case of system failure. Efficient management systems are crucial for 
                        orphanages to address operational challenges and ensure the well-being and development of the 
                        children under their care.
                    </p>
                    <p style={{ color: 'black', margin: '10px' }} align='left'>
                        Our orphanage management system is designed to tackle these issues by providing a comprehensive and user-friendly database. With features like real-time updates, secure data storage, and easy access to information, we can significantly improve the operational efficiency of orphanages. The system allows for seamless tracking of children's progress, adoption records, and donations, ensuring that every child receives the attention and care they deserve.
                    </p>
                    <p style={{ color: 'black', margin: '10px' }} align='left'>
                        In addition to managing child data, the system also helps in organizing staff information, scheduling activities, and managing resources efficiently. This holistic approach ensures that all aspects of orphanage management are covered, from day-to-day operations to long-term planning. By reducing the reliance on manual paperwork, we can minimize errors, reduce costs, and free up valuable time for caregivers to focus on what matters most – the children.
                    </p>
                    <p style={{ color: 'black', margin: '10px' }} align='left'>
                        Our system is built with scalability in mind, allowing it to adapt to the needs of both small and large orphanages. Whether it's a local orphanage with a few dozen children or a national network of facilities, our system can handle the complexities of managing multiple locations and large amounts of data. With robust reporting tools, administrators can easily generate reports on various metrics, helping them make informed decisions and improve the overall quality of care.
                    </p>
                    <p style={{ color: 'black', margin: '10px' }} align='left'>
                        The orphanage management system also includes features for donor management, making it easier to track contributions, send acknowledgments, and maintain strong relationships with supporters. Donors can have confidence that their contributions are being used effectively, thanks to transparent and detailed reporting. By fostering a culture of accountability and transparency, we can build trust and encourage more people to support the cause of caring for orphaned children.
                    </p>
                    <p style={{ color: 'black', margin: '10px' }} align='left'>
                        If you are looking for an "orphanage near me," you might want to consider visiting one of the many reputable organizations such as the Edhi Foundation, which runs numerous orphanages across Pakistan. The Edhi Foundation has been providing shelter, education, and healthcare to orphans for decades. Another notable organization is the SOS Children's Villages, which offers a family-like environment for orphaned children.
                    </p>
                    </div>
                </div>

                <div className="site-content-top mt-5">
                    <div className="auction-cat" style={{ justifyContent: 'left' }}>
                        <h1 align="center" className='bg-warning' style={{ marginTop: '10px', marginBottom: '10px', color: 'black' }}>
                            About Us
                        </h1>
                        <div className='container'>
                        <div className="row">
                            <div className="col-12">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">About Our Organization</h5>
                                        <p className="card-text" style={{ color: 'black' }}>
                                            Our organization is dedicated to supporting orphaned children in Pakistan and around the world. We provide shelter, education, and care to ensure these children have a better future.
                                        </p>
                                        <h6 className="card-subtitle mb-2 text-muted">Statistics</h6>
                                        <p className="card-text" style={{ color: 'black' }}>
                                            <strong>Orphaned Children in Pakistan:</strong> Approximately 4.2 million<br />
                                            <strong>Orphaned Children Worldwide:</strong> Over 140 million
                                        </p>
                                        <p className="card-text" style={{ color: 'black' }}>
                                            If you are looking for an "orphanage near me," you might want to consider visiting one of the many reputable organizations such as the Edhi Foundation, which runs numerous orphanages across Pakistan. The Edhi Foundation has been providing shelter, education, and healthcare to orphans for decades. Another notable organization is the SOS Children's Villages, which offers a family-like environment for orphaned children.
                                        </p>
                                        <p className="card-text" style={{ color: 'black' }}>
                                            Our database is comprehensive and well-organized, ensuring that we can effectively manage and track all information related to the children and operations of our orphanages. By using advanced database management systems, we maintain accurate and up-to-date records, which is crucial for the safety and development of the children in our care.
                                        </p>
                                        <p className="card-text" style={{ color: 'black' }}>
                                            One of the main advantages of our database is its normalization. This ensures that data redundancy is minimized, and data integrity is maintained across all our records. With a normalized database, we can quickly retrieve information, generate reports, and ensure that our operations run smoothly.
                                        </p>
                                        <p className="card-text" style={{ color: 'black' }}>
                                            The Orphanage Management System's Entity-Relationship Diagram (ERD) reflects our commitment to efficient data management. It captures various aspects of the orphanage's operations, including detailed records of children, guardians, donors, staff, vehicles, and donations. This robust design enables seamless management of critical activities such as registration, donations, staffing, and resource allocation, ultimately contributing to the overall efficiency and effectiveness of the orphanage's operations.
                                        </p>
                                        <p className="card-text" style={{ color: 'black' }}>
                                            For more information or to find an orphanage near you, please visit our website or contact us directly. We are committed to providing the best possible care for orphaned children and appreciate your support in our mission.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
