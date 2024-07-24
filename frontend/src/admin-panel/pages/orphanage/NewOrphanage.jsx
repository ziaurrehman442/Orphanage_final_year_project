import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios from 'axios';
import { orphanage_input } from '../../formSource';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NewOrphanage = () => {
  const navigate = useNavigate();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [featureImage, setFeatureImage] = useState(null);
  const [Licence_img, setLicence_img] = useState(null);
  const [bank_details_img, setBank_details_img] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    email: '',
    contact: '',
    web: '',
    city: '',
    address: '',
    licence_no: ''
  });

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    console.log('Selected files:', files);
  
    const newImages = [];
  
    files.forEach((file) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        console.log('File loaded:', reader.result);
        if (reader.readyState === 2) {
          newImages.push(reader.result); // Collect new images
          setImagesPreview((prevImages) => [...prevImages, reader.result]);
        }
      };
  
      reader.readAsDataURL(file);
    });
  };
  
  console.log(imagesPreview)
  

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

  const handleBank_details_img = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBank_details_img(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicence_img = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLicence_img(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...imagesPreview];
    updatedFiles.splice(index, 1);
    setImagesPreview(updatedFiles);
  };

  const handleRemoveFeatureImage = () => {
    setFeatureImage(null);
  };

  const handleRemoveBank_details_img = () => {
    setBank_details_img(null);
  };

  const handleRemoveLicence_img = () => {
    setLicence_img(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.image = featureImage;
    formData.otherImages = imagesPreview;
    formData.bank_details_img = bank_details_img;
    formData.Licence_img = Licence_img;
    axios.post('http://localhost:4000/newOrphanage', formData)
      .then(response => {
        alert('Added Successfully!');
        navigate('/admin/Orphanage');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    // Here you can access formData and perform actions like submitting to a server

  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Orphanage</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <label>Feature Image</label>
            {featureImage ? (
              <div style={{ position: 'relative', marginBottom: '10px' }}>
                <img src={featureImage} alt="" />
                <button
                  onClick={handleRemoveFeatureImage}
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
              </div>
            ) : (
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
              />
            )}

            <label>Licence Image</label>
            {Licence_img ? (
              <div style={{ position: 'relative', marginBottom: '10px' }}>
                <img src={Licence_img} alt="" />
                <button
                  onClick={handleRemoveLicence_img}
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
              </div>
            ) : (
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
              />
            )}

            <label>Bank Details Image</label>
            {bank_details_img ? (
              <div style={{ position: 'relative', marginBottom: '10px' }}>
                <img src={bank_details_img} alt="" />
                <button
                  onClick={handleRemoveBank_details_img}
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
              </div>
            ) : (
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
              />
            )}

            <label style={{ marginTop: '7%' }}>Other Images</label>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {imagesPreview.map((image, index) => (
                <li key={index} style={{ position: 'relative', marginBottom: '10px' }}>
                  <img src={image} alt="" />
                  <button
                    onClick={() => handleRemoveImage(index)}
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
            <form>
              <div className="formInput">
                <label htmlFor="featureImage">
                  Feature Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="featureImage"
                  onChange={handleFeatureImage}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="Licence_img">
                  Licence Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="Licence_img"
                  onChange={handleLicence_img}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="bank_details_img">
                  Bank Details Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="bank_details_img"
                  onChange={handleBank_details_img}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="file">
                  Other Images: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleImages}
                  style={{ display: 'none' }}
                />
              </div>

              {orphanage_input.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', justifyItems: 'center' }}>
          <button
            className="submit-btn"
            style={{ backgroundColor: '#FFC107', color: 'white' }}
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrphanage;
