import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import Select from '../../components/dropdown/Select';
import TextAreaEditor from '../../components/textareaEditor/TextAreaEditor';

const EditCampaign = () => {
    const navigate = useNavigate();
    const { campaignID } = useParams();
    const [image, setImage] = useState(null); // State for image file
    const [campaignData, setCampaignData] = useState(null); // State for campaign data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [description, setDescription] = useState(""); // State for campaign description

    const statuses = [
        {
          name: 'Active'
        },
        {
          name: 'Inactive'}
      ]
    // Fetch campaign data on component mount
    useEffect(() => {
        const fetchCampaignData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/campaign/${campaignID}`);
                setCampaignData(response.data); // Set fetched data to state
                setDescription(response.data.Description); // Set fetched description to state
                setIsLoading(false); // Set loading to false
            } catch (error) {
                console.error('Error fetching campaign data:', error.message);
                setIsLoading(false); // Set loading to false on error
            }
        };
        
        fetchCampaignData();
    }, [campaignID]);

    // Function to handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // Set image preview
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state

        try {
            // Prepare updated data
            const updatedData = {
                image: image || campaignData.image, // Use new image if provided, otherwise current image
                title: e.target.title.value || campaignData.title, // Use new title if provided, otherwise current title
                amount: e.target.amount.value || campaignData.amount,
                Description: description || campaignData.Description, // Use updated description from TextAreaEditor
                date_created: e.target.date_created.value || campaignData.date_created,
                status: campaignData.status,
            };

            // Send PUT request to update campaign data
            await axios.put(`http://localhost:4000/campaign/${campaignID}`, updatedData);
            setIsLoading(false); // Reset loading state
            alert('Campaign updated successfully!');
            navigate('/admin/campaign');
        } catch (error) {
            console.log(error);
            console.error('Error updating campaign:', error.message);
            setIsLoading(false); // Reset loading state on error
            alert('Error updating campaign. Please try again.');
        }
    };

    const handleStatusChange = (e) => {
        setCampaignData({
            ...campaignData,
            status: e.target.value
        });
    };

    return (
        <>
            <div className="new">
                <Sidebar />
                <div className="newContainer">
                    <Navbar />
                    {isLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, bottom: 0, right: 0, left: 0 }}>
                            <Circles
                                height="80"
                                width="80"
                                color="#FFC107"
                                ariaLabel="circles-loading"
                                visible={true}
                            />
                        </div>
                    ) : (campaignData && (
                        <>
                            <div className="top">
                                <h1>Edit Campaign</h1>
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <img
                                        src={image || campaignData.image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="Campaign"
                                    />
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                    />
                                    <label htmlFor="file">Change Image</label>
                                </div>
                                <div className="right">
                                    <form onSubmit={handleSubmit}>
                                        <div className="formInput">
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                defaultValue={campaignData.title}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Amount</label>
                                            <input
                                                type="number"
                                                name="amount"
                                                defaultValue={campaignData.amount}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Description</label>
                                            <TextAreaEditor setData={setDescription} value={description} />
                                        </div>
                                        <div className="formInput">
                                            <label>Date Created</label>
                                            <input
                                                type="date"
                                                name="date_created"
                                                defaultValue={campaignData.date_created}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Status</label>
                                            <Select
                                                value={statuses}
                                                handleChange={handleStatusChange}
                                                name="status"
                                                title="Select Status"
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <button
                                                className="submit-btn"
                                                style={{ backgroundColor: '#FFC107', color: 'white' }}
                                                type="submit"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default EditCampaign;
