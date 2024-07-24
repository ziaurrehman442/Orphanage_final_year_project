import "../../admin-panel/pages/new/new.scss";
import Navbar from "../../Navbar";
import { useEffect } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { FaTimes } from 'react-icons/fa';
import English from "../../admin-panel/pages/new/English";
import Arabic from "../../admin-panel/pages/new/Arabic";
import { useNavigate, useNavigation } from "react-router-dom";

const Request = ({ inputs, title }) => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const userData = sessionStorage.getItem('user');
  const defaultUser = {}; // Set default user object here
  const [user, setUser] = useState(userData ? JSON.parse(userData) : defaultUser);
  const [expanded, setExpanded] = useState(true);
  const [arabicExpand, setArabicExpand] = useState(false);
  const [getDescription, setGetDescription] = useState('');
  const [getDescriptionen, setGetDescriptionen] = useState('')
  const [featureImage, setFeatureImage] = useState(null);
  const [formData, setFormData] = useState({
    price: 0,
    previous_price: 0,
    feature_image: '',
    body_type: '',
    body_typeAr: '',
    brand: '' ,
    title: '',
    titleAr: '',
    description: getDescriptionen,
    descriptionAr: getDescription,
    address: '',
    addressAr: '',
    exterior_color: '',
    interior_color: '',
    emirate: '',
    warranty: '',
    specs: '',
    power: '',
    trim: '',
    trimAr: '',
    engine_cylinders: '',
    model: '',
    category: '',
    categoryAr: '',
    fuel_type: '',
    fuel_typeAr: '',
    vendor: '',
    speed: '',
    year: '',
    mileage: '',
    is_featured: '',
    specification: '',
    status: '',
    latitude: '',
    longitude: '',
    car_condition: '',
    car_conditionAr: '',
    transmission: '',
    transmissionAr: '',
    meta_keywords: '',
    meta_keywordsAr: '',
    meta_description: '',
    meta_descriptionAr: '',
    expiry_date: Date.now(),
    otherImages: []
  });
  
  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('user'));
    setUser(userFromSession || {});
  }, []);

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

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2) {
          setImagesPreview([...imagesPreview, reader.result]);
          setImages([...images, reader.result]);
        }
      };
      reader.readAsDataURL(file)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...imagesPreview];
    updatedFiles.splice(index, 1);
    setImagesPreview(updatedFiles);
  };

  const handleRemoveFeatureImage = () => {
    setFeatureImage(null);
  };
  const navigate = useNavigate();
  console.log(formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.description = getDescription;
    formData.feature_image = featureImage;
    formData.otherImages = imagesPreview;
    formData.vendor = user.data[0]?.name;
    formData.status = 'Disable';
    axios.post('https://backendauction.mydriven.ae/cars', formData)
    .then(response => {
        console.log('Response:', response.data);
        alert("successfully Uploaded");
        navigate('/user/Profile');
    })
    .catch(error => {
        console.error('Error:', error);
        alert("error!");
    });
    // Here you can access formData and perform actions like submitting to a server
    
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    setArabicExpand(!arabicExpand);
  };

  return (
    <div className="new">
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
            <div className="left">
              <label>
                Feature Image
              </label>
              {featureImage ? 
                <li style={{ display: 'flex', flexWrap: 'wrap', position: 'relative', marginBottom: '10px', listStyle: 'none' }}>
                  <img
                    src={
                      featureImage ? featureImage
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                  <button
                    onClick={handleRemoveFeatureImage}
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '160px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <FaTimes style={{ color: 'red' }} className="icon" />
                  </button>
                </li> : 
                <img
                  src={
                    featureImage ? featureImage
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              }
              
              <label style={{ marginTop: '7%' }}>
                Other Images
              </label>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {imagesPreview.map((image, index) => (
                  <div key={index} style={{ position: 'relative', marginLeft: '7px', marginBottom: '10px', listStyle: 'none' }}>
                  <img
                    key={index}
                    src={
                      image ? image
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: 'absolute',
                        top: '0',
                        right: '125px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <FaTimes style={{ color: 'red' }} className="icon" />
                    </button>
                  </div>
                  ))}
                </li>
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
                    style={{ display: "none" }}
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
                    style={{ display: "none" }}
                  />
                </div>
                {inputs.map((input) => (
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
        <div className="expand-form-btn">
          <button 
            style={{
              backgroundColor: `${expanded ? "#FFC107" : "white"}`, 
              color: `${expanded ? "white" : "#007bff"}`, fontWeight: 600 }} 
              className="expand-button" 
              onClick={toggleExpand 
            }>
            English Language (Default)
          </button>
          {
            expanded && 
            <English 
              setData={setFormData}  
              setGetDescriptionen={setGetDescriptionen}
              handleChange={handleChange}
            />
          }
        </div>
        
        <div className="expand-form-btn">
          <button 
            style={{
              backgroundColor: `${arabicExpand ? "#FFC107" : "white"}`, 
              color: `${arabicExpand ? "white" : "#007bff"}`, fontWeight: 600 }} 
              className="expand-button" 
              onClick={toggleExpand 
            }>
            عربي Language
          </button>
          {
            arabicExpand && 
            <Arabic 
              setData={setFormData} 
              setGetDescription={setGetDescription}
              handleChange={handleChange}
            />
          }
              
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

export default Request;
