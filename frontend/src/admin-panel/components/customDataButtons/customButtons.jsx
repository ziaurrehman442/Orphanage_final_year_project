import React from 'react';
import axios from 'axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import './customDataButtons.css';

const StatusDropdown = ({ statusActive, onChange, id }) => {
    const navigate = useNavigate();
    const handleChange = async (event) => {
        const newValue = event.target.value;
        onChange(newValue);
        try {
            const response = await axios.post('https://backendauction.mydriven.ae/cars/status', {
              id,
              status: newValue,
            });
      
            if (response.status !== 200) {
              throw new Error('Failed to update');
            }
      
            console.log(response,id);
            navigate('/admin/cars')
          } catch (error) {
            console.error('Error updating featured:', error);
          }
      };
  
    return (
        <form id="featureForm124" class="d-inline-block-status" method="post">                                
            <input type="hidden" name="carId" value={statusActive.id} />
            <div className='custom-select'>
                <select class={` ${statusActive.status === 'active' ? 'bg-success' : 'bg-danger'} custom-select-dropdown`} name="is_featured" onChange={handleChange}>
                    <option>{String(statusActive.status).toUpperCase()}</option>
                    <option value="active">
                        ACTIVE
                    </option>
                    <option value="disabled" selected="">
                        DISABLE
                    </option>
                </select>
                <div >
                    <ArrowDropDownIcon className='custom-select-icon'/>
                </div>
            </div>
        </form>
    );
  };
  
  const FeaturedDropdown = ({ featured, onChange, id }) => {
    const navigate = useNavigate();
    const handleChange = async (event) => {
        const newValue = event.target.value;
        onChange(newValue);
        
        console.log(newValue)
        try {
            const response = await axios.post('https://backendauction.mydriven.ae/cars/is_featured', {
              id,
              featured: newValue,
            });
      
            if (response.status !== 200) {
              throw new Error('Failed to update');
            }
      
            console.log(response);
            navigate('/admin/cars')
          } catch (error) {
            console.error('Error updating featured:', error);
          }
      };
  
    return (
        <form id="featureForm124" class="d-inline-block" method="post">                                
            <input type="hidden" name="carId" value={featured.id} />
            <div className='custom-select'>
            <select class={` ${featured.is_featured === 'yes' ? 'bg-success' : 'bg-danger'} custom-select-dropdown`} name="is_featured" onChange={handleChange}>
                <option>{String(featured.is_featured).toUpperCase()}</option>
                <option value="yes">
                    Yes
                </option>
                <option value="no" selected="">
                    No
                </option>
            </select>
            <div >
                <ArrowDropDownIcon className='custom-select-icon'/>
            </div>
            </div>
        </form>
    );
  };

export { StatusDropdown, FeaturedDropdown };