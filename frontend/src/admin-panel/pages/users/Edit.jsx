import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Select from "../../components/dropdown/Select";

const EditUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [image, setImage] = useState([]);
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({
        image: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    

    const [departments, setDepartments] = useState([]);
    const [orphanage, setorphanage] = useState([]);
    const [staff_type, setstaff_type] = useState([]);
    console.log(formData);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/departments');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setDepartments(data);
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
        try {
          const response = await fetch('http://localhost:4000/api/staff_type');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setstaff_type(data);
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
        try {
          const response = await fetch('http://localhost:4000/api/Orphanage');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setorphanage(data);
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
      }
      fetchData();
    })
    useEffect(() => {
        const fetchDataForPosts = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/staff`
            );
            if (!response.ok) {
              throw new Error(`HTTP error: Status ${response.status}`);
            }
            let usersData = await response.json();
            setData(usersData);
            setIsLoading(false);
          } catch (err) {
            console.log(err.message)
            setIsLoading(false);
          }
        };
    
        fetchDataForPosts();
      }, [])

      const handleImages = (e) => {
        const files = Array.from(e.target.files);
        setImage([]);
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            if(reader.readyState === 2) {
              setImage([...image, reader.result]);
            }
          };
          reader.readAsDataURL(file)
        })
      }

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const toastNotification = (msg) => {return (
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                >
                    {msg}
                </ToastContainer>
      )}
console.log(data);
      const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        formData.image = image[0] ? image[0] : data[0].image;
formData.name = formData.name? formData.name : data[0].name;
formData.email = formData.email  ? formData.email : data[0].email;
formData.phone = formData.phone  ? formData.phone : data[0].phone;
formData.country = formData.country  ? formData.country : data[0].country;
formData.city = formData.city  ? formData.city : data[0].city;
formData.State = formData.State  ? formData.State : data[0].state;
formData.address = formData.address  ? formData.address : data[0].address;
formData.Zip = formData.Zip  ? formData.Zip : data[0].Zip;
formData.orphanage_id = formData.orphanage_id  ? formData.orphanage_id : data[0].orphanage_id;
formData.Joinning_date = formData.Joinning_date  ? formData.Joinning_date : data[0].Joinning_date;
formData.date_of_birth = formData.date_of_birth  ? formData.date_of_birth : data[0].date_of_birth;
formData.salary = formData.salary  ? formData.salary : data[0].salary;
formData.staff_type = formData.staff_type  ? formData.staff_type : data[0].staff_type;
formData.Department_id = formData.Department_id  ? formData.Department_id : data[0].Department_id;
formData.Emp_no = formData.Emp_no  ? formData.Emp_no : data[0].Emp_no;

        axios.put(`http://localhost:4000/staff/${userId}`, formData)
        .then(response => {
            alert("Updated Successfully!");
            navigate('/admin/staff');
        })
        .catch(error => {
            toastNotification(error.message);
        });
        setIsLoading(false);
        
      };

      const orphanage_id= (id)=>{
        if(id !== undefined){
        const dep_id = orphanage.find(dept => dept.name === id);
        formData.orphanage_id=dep_id.id;}
      }
      const Department_id= (id)=>{
        if(id !== undefined){
        const dep_id = departments.find(dept => dept.name === id);
        formData.Department_id=dep_id.id;}
      }
      const staff_type_id= (id)=>{
        if(id !== undefined){
        const dep_id = staff_type.find(dept => dept.name === id);
        formData.staff_type=dep_id.id;}
      }

    return (
        <>
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                {isLoading ? (
                        <div style=
                            {{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                top: 0, 
                                bottom: 0, 
                                right: 0, 
                                left: 0, 
                                position: 'fixed' 
                            }}>
                            <Circles
                            height="80"
                            width="80"
                            color="#FFC107"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />
                        </div>
                ) : (data && (<>
                <div className="top">
                <h1>Edit Staff</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                data[0].image === '' ? image : data[0].image
                            }
                            alt="User"
                        />
                    </div>
                    <div className="right">
                    <form>
                        <div className="formInput">
                        <label htmlFor="file">
                            Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleImages}
                            style={{ display: "none" }}
                        />
                        </div>
                        <div className="formInput">
                            <label>Name</label>
                            <input 
                            required
                            type='text' 
                            name='name'
                            defaultValue={data[0].name}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>Email</label>
                            <input 
                            type='email' 
                            name='email'
                            defaultValue={data[0].email}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>Phone</label>
                            <input 
                            required
                            type='text' 
                            name='phone'
                            defaultValue={data[0].phone}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>Country</label>
                            <input 
                            required
                            type='text' 
                            name='country'
                            defaultValue={data[0].country}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>City</label>
                            <input
                            required 
                            type='text' 
                            name='city'
                            defaultValue={data[0].city}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>State</label>
                            <input 
                            required
                            type='text' 
                            name='State'
                            defaultValue={data[0].state}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>Address</label>
                            <input
                            required 
                            type='text' 
                            name='address'
                            defaultValue={data[0].address}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>ZIP Code</label>
                            <input
                            required 
                            type='text' 
                            name='Zip'
                            defaultValue={data[0].Zip}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>Joinning Date</label>
                            <input
                            required 
                            type='date' 
                            name='Joinning_date'
                            defaultValue={data[0].Joinning_date}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>Date Of Birth</label>
                            <input
                            required 
                            type='date' 
                            name='date_of_birth'
                            defaultValue={data[0].date_of_birth}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>Salary</label>
                            <input
                            required 
                            type='text' 
                            name='salary'
                            defaultValue={data[0].salary}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput">
                            <label>Emp No</label>
                            <input
                            required 
                            type='text' 
                            name='Emp_no'
                            defaultValue={data[0].Emp_no}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="formInput" key={staff_type}>
              <Select language='English' value={staff_type} handleChange={(e)=>{staff_type_id(e.target.value)}} name='staff_type' title='Staff type'/></div>
              <div className="formInput" key={'orphanage_id'}>
              <Select language='English' value={departments} handleChange={(e)=>{Department_id(e.target.value)}} name='Department_id' title='Department Id'/></div><div className="formInput" key={'Department_id'}>
              <Select language='English' value={orphanage} handleChange={(e)=>{orphanage_id(e.target.value)}} name='orphanage_id' title='orphanage Id'/></div>
              
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
                </>))}
            </div>
        </div>
       
       </>
    )
}

export default EditUser