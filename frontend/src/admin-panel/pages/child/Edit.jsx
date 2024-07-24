import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import Select from '../../components/dropdown/Select';

const Editchild = () => {
    const navigate = useNavigate();
    const { childID } = useParams();
    const [image, setImage] = useState(null); // State for image file
    const [childData, setChildData] = useState(null); // State for child data
    const [isLoading, setIsLoading] = useState(true); // Loading state


    const [branch, setbranch] = useState([]);

    const staff_type_id= (id)=>{
        if(id !== undefined){
        const dep_id = branch.find(dept => dept.name === id);
        childData.branch_id=dep_id.id;}
      }

    // Fetch child data on component mount
    useEffect(() => {
        const fetchChildData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/child/${childID}`);
                setChildData(response.data); // Set fetched data to state
                setIsLoading(false); // Set loading to false
            } catch (error) {
                console.error('Error fetching child data:', error.message);
                setIsLoading(false); // Set loading to false on error
            }
        };
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:4000/api/branchname_id');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              console.log(data);
              setbranch(data);
            } catch (error) {
              console.error('Error fetching departments:', error);
            }
          };
        fetchChildData();
        
    fetchData();
    }, [childID]);

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
                image: image || childData.image, // Use new image if provided, otherwise current image
                Name: e.target.Name.value || childData.Name, // Use new name if provided, otherwise current name
                date_of_birth: e.target.date_of_birth.value || childData.date_of_birth,
                register_time: e.target.register_time.value || childData.register_time,
                branch_id: childData.branch_id,
                f_name: e.target.f_name.value || childData.f_name,
                M_name: e.target.M_name.value || childData.M_name,
                Siblings: e.target.Siblings.value || childData.Siblings,
                F_cnic: e.target.F_cnic.value || childData.F_cnic,
                M_cnic: e.target.M_cnic.value || childData.M_cnic,
                cnic: e.target.cnic.value || childData.cnic,
                mailing_address: e.target.mailing_address.value || childData.mailing_address,
                emergency_contact: e.target.emergency_contact.value || childData.emergency_contact,
                DOB: e.target.DOB.value || childData.DOB
            };

            // Send PUT request to update child data
            await axios.put(`http://localhost:4000/child/${childID}`, updatedData);
            setIsLoading(false); // Reset loading state
            alert('Child updated successfully!');
            navigate('/admin/child');
        } catch (error) {
            console.log(error);
            console.error('Error updating child:', error.message);
            setIsLoading(false); // Reset loading state on error
            alert('Error updating child. Please try again.');
        }
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
                    ) : (childData && (
                        <>
                            <div className="top">
                                <h1>Edit Child</h1>
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <img
                                        src={image || childData.image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt="User"
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
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                name="Name"
                                                defaultValue={childData.Name}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Date of Birth</label>
                                            <input
                                                type="date"
                                                name="date_of_birth"
                                                defaultValue={childData.date_of_birth}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Registration Time</label>
                                            <input
                                                type="time"
                                                name="register_time"
                                                defaultValue={childData.register_time}
                                            />
                                        </div>
                                        <div className="formInput" key={'staff_type'}>
              <Select language='English' id='3' value={branch} handleChange={(e)=>{staff_type_id(e.target.value)}} name='branch' title='Branch'/></div>
           
                                        <div className="formInput">
                                            <label>Father's Name</label>
                                            <input
                                                type="text"
                                                name="f_name"
                                                defaultValue={childData.f_name}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Mother's Name</label>
                                            <input
                                                type="text"
                                                name="M_name"
                                                defaultValue={childData.M_name}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Siblings</label>
                                            <input
                                                type="text"
                                                name="Siblings"
                                                defaultValue={childData.Siblings}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Father's CNIC</label>
                                            <input
                                                type="text"
                                                name="F_cnic"
                                                defaultValue={childData.F_cnic}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Mother's CNIC</label>
                                            <input
                                                type="text"
                                                name="M_cnic"
                                                defaultValue={childData.M_cnic}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Child's CNIC</label>
                                            <input
                                                type="text"
                                                name="cnic"
                                                defaultValue={childData.cnic}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Mailing Address</label>
                                            <input
                                                type="text"
                                                name="mailing_address"
                                                defaultValue={childData.mailing_address}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Emergency Contact</label>
                                            <input
                                                type="text"
                                                name="emergency_contact"
                                                defaultValue={childData.emergency_contact}
                                            />
                                        </div>
                                        <div className="formInput">
                                            <label>Date of Birth</label>
                                            <input
                                                type="date"
                                                name="DOB"
                                                defaultValue={childData.DOB}
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

export default Editchild;
