import "./new.scss";
import { useState, useEffect } from "react";

import Select from "../../components/dropdown/Select";

import './Arabic.scss'
import TextAreaEditor from "../../components/textareaEditor/TextAreaEditor";
import {
  conditionARTypes,
  cylinderTypes, 
  emirateTypes, 
  exteriorColorTypes,
  powerTypes, 
  specsTypes, 
  transmissionARTypes, 
  warrantyTypes 
} from "../../formSource";


const Arabic = ({ handleChange, setGetDescription, setGetterms }) => {
    
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [bodyType, setBodyType] = useState([])
  const [fuelType, setFuelType] = useState([])

  
  useEffect(() => {
    const fetchDataForPosts = async () => {
      //Geting categories
      try {
        const response = await fetch(
          `https://backendauction.mydriven.ae/categoriesar`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (err) {
        console.log(err.message)
      }

      //Geting bodytypes
      try {
        const response = await fetch(
          `https://backendauction.mydriven.ae/body_typesar`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let bodyTypeData = await response.json();
        setBodyType(bodyTypeData);
      } catch (err) {
        console.log(err.message)
      }

      //Geting brands
      try {
        const response = await fetch(
          `https://backendauction.mydriven.ae/brandsen`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let brandsData = await response.json();
        setBrands(brandsData);
      } catch (err) {
        console.log(err.message)
      }

      //get models
      try {
        const response = await fetch(
          `https://backendauction.mydriven.ae/models`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let modelsData = await response.json();
        setModels(modelsData);
      } catch (err) {
        console.log(err.message)
      }

      //get fuel type
      try {
        const response = await fetch(
          `https://backendauction.mydriven.ae/fueltypear`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let fuelTypesData = await response.json();
        setFuelType(fuelTypesData);
      } catch (err) {
        console.log(err.message)
      }
    };

    fetchDataForPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    // const handleChange = (event) => {
    //     setData(event.target.value);
    //     setBrand(event.target.value);
    // };

  return (
    <>
    <div dir="rtl">
    
      {/* <TextField dir="rtl" style={{ marginTop: '2%' }} fullWidth label="Title" id="fullWidth" name="title" /> */}

      <div style={{ width: '95%', marginTop: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} className="form-group rtl text-right">
        <label for="titleAr">Title *</label>
        <input
          required
          id='titleAr'
          style={{
            width: '100%', 
            outline: 0, 
            borderWidth: '0 0 2px', 
            borderColor: 'light-black',
            padding: '8px 0px',
            marginTop: '2%',
            height: '2em',
            fontSize: '16px'
          }} 
          onChange={handleChange}
          type="text" 
          className="input-title" 
          name="titleAr" 
          placeholder="Enter Title"
        />
      </div>
    </div>
    <div dir="rtl" style={{  marginTop: '3.5%', marginBottom: '3%', display: 'flex', flexWrap: 'wrap', gap: '5%' }}>
      <Select language='Arabic' handleChange={handleChange} value={brands} name='brand' title='Brands'/>
      <Select language='Arabic' handleChange={handleChange} value={models}  name='model' title='Model'/>
      <Select language='Arabic' handleChange={handleChange} value={conditionARTypes} name='car_conditionAr' title='Condition'/>
      <Select language='Arabic' handleChange={handleChange} value={categories} name='categoryAr' title='Category'/>
      <Select language='Arabic' handleChange={handleChange} value={exteriorColorTypes} name='exterior_color' title='Exterior Color'/>
      <Select language='Arabic' handleChange={handleChange} value={bodyType} name='body_typeAr' title='Body Type'/>
      <Select language='Arabic' handleChange={handleChange} value={transmissionARTypes} name='transmissionAr' title='Transmission Type'/>
      <Select language='Arabic' handleChange={handleChange} value={fuelType} name='fuel_typeAr' title='Fuel Type'/>
      <Select language='Arabic' handleChange={handleChange} value={specsTypes} name='specs' title='Specs'/>
      <Select language='Arabic' handleChange={handleChange} value={warrantyTypes} name='warranty' title='Warranty'/>
      <Select language='Arabic' handleChange={handleChange} value={emirateTypes} name='emirate' title='Emirate'/>
      <Select language='Arabic' handleChange={handleChange} value={exteriorColorTypes} name='interior_color' title='Interior Color'/>
      <Select language='Arabic' handleChange={handleChange} value={cylinderTypes} name='engine_cylinders' title='Engine Cylinders'/>
      <Select language='Arabic' handleChange={handleChange} value={powerTypes} name='power' title='Power'/>
      <input
          required
          id='title'
          style={{
            width: '20%', 
            outline: 0, 
            borderWidth: '0 0 2px', 
            borderColor: 'light-black',
            padding: '12px 0px',
            height: '1.5em',
            fontSize: '14px'
          }} 
          onChange={handleChange}
          type="text" 
          className="input-title" 
          name="addressAr" 
          placeholder="Enter Address"
        />
        <input
          required
          id='title'
          style={{
            width: '20%', 
            outline: 0, 
            borderWidth: '0 0 2px', 
            borderColor: 'light-black',
            padding: '12px 0px',
            height: '1.5em',
            fontSize: '14px'
          }}
          onChange={handleChange}
          type="text" 
          className="input-title" 
          name="trimAr" 
          placeholder="Enter Trim"
        />
        <label for="meta_keywords">Terms & Conditions</label>
        <TextAreaEditor setData={setGetterms} />
        <label for="meta_keywords">Description</label>
        <TextAreaEditor setData={setGetDescription} />
        
        <div style={{ width: '95%', marginTop: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} className="form-group rtl text-right">
        <label for="meta_keywords">Meta Keywords *</label>
        <input
          required
          id='meta_keywords'
          style={{
            width: '100%', 
            outline: 0, 
            borderWidth: '0 0 2px', 
            borderColor: 'light-black',
            padding: '5px 0px',
            marginTop: '1%',
            height: '2em',
            fontSize: '16px'
          }}
          onChange={handleChange}
          type="text" 
          className="input-title" 
          name="meta_keywordsAr" 
          placeholder="Enter Meta Keywords"
        />
      </div>
      <label style={{ marginTop: '2%' }} for="meta_description">Meta Description *</label>
      <textarea id="meta_description" name="meta_descriptionAr" onChange={handleChange} className="meta_description">Enter Meta Description</textarea>
    </div>
  </>
);
};

export default Arabic;
