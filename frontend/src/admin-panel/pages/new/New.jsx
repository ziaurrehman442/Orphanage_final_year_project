import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { FaTimes } from 'react-icons/fa';
import English from "./English";
import Arabic from "./Arabic";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [arabicExpand, setArabicExpand] = useState(false);
  const [getDescriptionen, setGetDescriptionen] = useState('');
  const [getDescription, setGetDescription] = useState('');
  const [featureImage, setFeatureImage] = useState(null);
  const [document, setdocument] = useState(null);
  const [termsen, setGettermsen] = useState('');
  const [termsar, setGettermsar] = useState('');
  const [formData, setFormData] = useState({
    price: 0,
    previous_price: 0,
    feature_image: '',
    body_type: '',
    body_typeAr: '',
    brand: '' ,
    Vin_Number: '',
    title: '',
    titleAr: '',
    terms: termsen,
    termsar: termsar,
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
    vendor: 'Admin',
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
    otherImages: [],
    document: document
  });
  

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

  const handleDocument = (event) => {
    const file = event.target.files[0]; // Get the selected file
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // This function will be called when the reader finishes reading the file
      setdocument(reader.result); // Update state with the base64 string
    };
    reader.readAsDataURL(file); // Read the file as a data URL
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

  console.log(formData);
  const navigate = useNavigate('');
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.descriptionAr = getDescription;
    formData.description = getDescriptionen;
    formData.termsar = termsar;
    formData.terms = termsen;
    formData.feature_image = featureImage;
    formData.documents = document;
    formData.otherImages = imagesPreview;
    axios.post('https://backendauction.mydriven.ae/cars', formData)
    .then(response => {
        console.log('Response:', response.data);
        alert("Car added Successfully");
        navigate('/admin/cars');
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // Here you can access formData and perform actions like submitting to a server
    
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    setArabicExpand(!arabicExpand);
  };

  return (
    <div className="new">
      <Sidebar />
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

{/* <label>
                document
              </label>
              {featureImage ? 
                <li style={{ display: 'flex', flexWrap: 'wrap', position: 'relative', marginBottom: '10px', listStyle: 'none' }}>
                  <img
                    src={
                      document ? document
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
              } */}

              
              
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
                  <label htmlFor="Document">
                     Document: <DriveFolderUploadOutlinedIcon className="icon" /> {document ? 'Selected' : ''}
                  </label>
                  <input
                    type="file"
                    id="Document"
                    onChange={handleDocument}
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
              setGetDescription={setGetDescriptionen}
              setGetterms={setGettermsen}
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
              setGetterms={setGettermsar}
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

export default New;
