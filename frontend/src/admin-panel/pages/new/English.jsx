import "./new.scss";
import { useState, useEffect } from "react";

import Select from "../../components/dropdown/Select";

import './Arabic.scss'
import TextAreaEditor from "../../components/textareaEditor/TextAreaEditor";

import { 
    transmissionTypes, 
    exteriorColorTypes, 
    emirateTypes,
    warrantyTypes,
    specsTypes,
    powerTypes,
    cylinderTypes,
    conditionTypes
  } from "../../formSource";


const English = ({ setMetaData, handleChange, setGetDescription,setGetterms }) => {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [conditions, setConditions] = useState([])
  const [exteriorColor, setExteriorColor] = useState([])
  const [bodyType, setBodyType] = useState([])
  const [transmissionType, setTransmissionType] = useState([])
  const [fuelType, setFuelType] = useState([])
  const [specs, setSpecs] = useState([])
  const [warranty, setWarranty] = useState([])
  const [emirate, setEmirate] = useState([])
  const [interiorColor, setInteriorColor] = useState([])
  const [engineCylinders, setEngineCylinders] = useState([])
  const [power, setPower] = useState([])

  useEffect(() => {
    const fetchDataForPosts = async () => {
      //Geting categories
      try {
        const response = await fetch(
          `https://backendauction.mydriven.ae/categoriesen`
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
          `https://backendauction.mydriven.ae/body_typesen`
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
          `https://backendauction.mydriven.ae/fueltypeen`
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
  

  return (
    <>
    <div>
    
      {/* <TextField dir="rtl" style={{ marginTop: '2%' }} fullWidth label="Title" id="fullWidth" name="title" /> */}

      <div style={{ width: '95%', marginTop: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} className="form-group">
        <label for="title">Title *</label>
        <input
          required
          id='title'
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
          name="title" 
          placeholder="Enter Title"
        />
      </div>
    </div>
    <div style={{  marginTop: '3.5%', marginBottom: '3%', display: 'flex', flexWrap: 'wrap', gap: '5%' }}>
      <Select language='English' value={brands} handleChange={handleChange} name='brand' title='Brands'/>
      <Select language='English' value={models} handleChange={handleChange} name='model' title='Model'/>
      <Select language='English' value={conditionTypes} handleChange={handleChange} name='car_condition' title='Condition'/>
      <Select language='English' value={categories} handleChange={handleChange} name='category' title='Category'/>
      <Select language='English' value={exteriorColorTypes} handleChange={handleChange} name='exterior_color' title='Exterior Color'/>
      <Select language='English' value={bodyType} handleChange={handleChange} name='body_type' title='Body Type'/>
      <Select language='English' value={transmissionTypes} handleChange={handleChange} name='transmission' title='Transmission Type'/>
      <Select language='English' value={fuelType} handleChange={handleChange} name='fuel_type' title='Fuel Type'/>
      <Select language='English' value={specsTypes} handleChange={handleChange} name='specs' title='Specs'/>
      <Select language='English' value={warrantyTypes} handleChange={handleChange} name='warranty' title='Warranty'/>
      <Select language='English' value={emirateTypes} handleChange={handleChange} name='emirate' title='Emirate'/>
      <Select language='English' value={exteriorColorTypes} handleChange={handleChange} name='interior_color' title='Interior Color'/>
      <Select language='English' value={cylinderTypes} handleChange={handleChange} name='engine_cylinders' title='Engine Cylinders'/>
      <Select language='English' value={powerTypes} handleChange={handleChange} name='power' title='Power'/>
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
          name="address" 
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
          name="trim" 
          placeholder="Enter Trim"
        />
        <br />
        <label style={{ marginTop: '2%' ,width: '90%'  }}>Terms & Conditions</label>
        <TextAreaEditor setData={setGetterms} />
        <label style={{ marginTop: '2%',width: '90%' }}>Description</label>
        <TextAreaEditor setData={setGetDescription} />
        <div style={{ width: '95%', marginTop: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} className="form-group">
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
          name="meta_keywords" 
          placeholder="Enter Meta Keywords"
        />
      </div>
      <label style={{ marginTop: '2%' }} for="meta_description">Meta Description *</label>
      <textarea id="meta_description" onChange={handleChange} name="meta_description" className="meta_description">Enter Meta Description</textarea>
    </div>
  </>
  );
};

export default English;
