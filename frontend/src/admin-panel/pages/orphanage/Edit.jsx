import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTimes } from 'react-icons/fa';

const EditOrphanage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();// Assuming your route parameter is orphanageId
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    web: '',
    city: '',
    address: '',
    licence_no: ''
  });
  const [featureImage, setFeatureImage] = useState('');
  const [licenceImage, setLicenceImage] = useState('');
  const [bankDetailsImage, setBankDetailsImage] = useState('');
  const [otherImages, setOtherImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrphanageData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/orphanages/${userId}`);
        const orphanageData = response.data;
        
        setFormData(orphanageData);
        setFormData({
          name: orphanageData.name,
          email: orphanageData.email,
          contact: orphanageData.contact,
          web: orphanageData.web,
          city: orphanageData.city,
          address: orphanageData.address,
          licence_no: orphanageData.licence_no
        });
        setFeatureImage(orphanageData.image); // Assuming these fields match your API response
        setLicenceImage(orphanageData.Licence_img);
        setBankDetailsImage(orphanageData.bank_details_img);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orphanage data:', error);
        setIsLoading(false);
      }
      try {
        const response = await fetch(
          `http://localhost:4000/orphanages_img/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const imagesdata = await response.json();
        setOtherImages(imagesdata || []); // Set userData into data state
        setIsLoading(false);
        
      } catch (err) {
        console.error('Fetch error:', err.message);
        setIsLoading(false);
      }
    };

    fetchOrphanageData();
  }, [userId]);

  const handleFeatureImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeatureImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFeatureImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeatureImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicenceImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLicenceImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBankDetailsImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBankDetailsImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        setOtherImages([...otherImages, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveOtherImage = (index) => {
    const updatedImages = [...otherImages];
    updatedImages.splice(index, 1);
    setOtherImages(updatedImages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedOrphanage = {
        ...formData,
        image: featureImage,
        Licence_img: licenceImage,
        bank_details_img: bankDetailsImage,
        otherImages: otherImages
      };
      console.log(updatedOrphanage);
      await axios.put(`http://localhost:4000/orphanages/${userId}`, updatedOrphanage);
      toast.success('Orphanage updated successfully!');
      navigate('/admin/Orphanage');
    } catch (error) {
      console.error('Error updating orphanage:', error);
      toast.error(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }}
          >
            <Circles color="#FFC107" height={80} width={80} ariaLabel="loading-spinner" />
          </div>
        ) : (
          <>
            <div className="top">
              <h1>Edit Orphanage</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <label>Feature Image</label>
                {featureImage ? (
                  <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <img src={featureImage} alt="Feature" />
                    <button
                      onClick={() => setFeatureImage('')}
                      style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <FaTimes style={{ color: 'red' }} className="icon" />
                    </button>
                  </div>
                ) : (
                  <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="Placeholder" />
                )}

                <label>Licence Image</label>
                {licenceImage ? (
                  <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <img src={licenceImage} alt="Licence" />
                    <button
                      onClick={() => setLicenceImage('')}
                      style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <FaTimes style={{ color: 'red' }} className="icon" />
                    </button>
                  </div>
                ) : (
                  <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="Placeholder" />
                )}

                <label>Bank Details Image</label>
                {bankDetailsImage ? (
                  <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <img src={bankDetailsImage} alt="Bank Details" />
                    <button
                      onClick={() => setBankDetailsImage('')}
                      style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <FaTimes style={{ color: 'red' }} className="icon" />
                    </button>
                  </div>
                ) : (
                  <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="Placeholder" />
                )}

                <label>Other Images</label>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {otherImages.map((image, index) => (
                <li key={index} style={{ position: 'relative', marginBottom: '10px' }}>
                  <img src={image.image} alt="" />
                  <button
                    onClick={() => handleRemoveOtherImage(index)}
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <FaTimes style={{ color: 'red' }} className="icon" />
                  </button>
                </li>
                  ))}
                </ul>
              </div>
              <div className="right">
                <form onSubmit={handleSubmit}>
                  <div className="formInput">
                    <label htmlFor="featureImage">
                      Feature Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input type="file" id="featureImage" onChange={handleFeatureImage} style={{ display: 'none' }} />
                  </div>

                  <div className="formInput">
                    <label htmlFor="licenceImage">
                      Licence Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input type="file" id="licenceImage" onChange={handleLicenceImageChange} style={{ display: 'none' }} />
                  </div>

                  <div className="formInput">
                    <label htmlFor="bankDetailsImage">
                      Bank Details Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input type="file" id="bankDetailsImage" onChange={handleBankDetailsImageChange} style={{ display: 'none' }} />
                  </div>

                  <div className="formInput">
                    <label htmlFor="otherImages">
                      Other Images: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input type="file" id="otherImages" onChange={handleOtherImagesChange} multiple style={{ display: 'none' }} />
                  </div>

                  <div className="formInput">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Contact</label>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Website</label>
                    <input type="text" name="web" value={formData.web} onChange={handleChange} />
                  </div>
                  <div className="formInput">
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                  </div>
                  <div className="formInput">
                    <label>Licence Number</label>
                    <input type="text" name="licence_no" value={formData.licence_no} onChange={handleChange} />
                  </div>

                  <button className="submit-btn" style={{ backgroundColor: '#FFC107', color: 'white' }} type="submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default EditOrphanage;
