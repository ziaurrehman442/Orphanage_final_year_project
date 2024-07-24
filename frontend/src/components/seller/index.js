import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { bidsColumns } from "../../admin-panel/datatablesource";
import { buyNowReqColumns } from "../../admin-panel/datatablesource";
import "./seller.css"
import List from "./List";
import Payment from "../web/payment";


const Seller = (props) => {


    const navigate = useNavigate();
    const handlePreview = (auctionId) => {
        navigate(`/auction/motors/${auctionId}`, { state: auctionId });
    };
    const wishlistcol =[
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "User_id",
          headerName: "View",
          width: 100,
          renderCell: (params) => {
            return (
                
                <button className="btn btn-warning" onClick={() => handlePreview(params.row.AuctionItems_id)}>
            <div className="cellWithImg">
                Preview
            </div>
        </button>
            );
          },
        }
      ]


    const { t } = useTranslation();
    const user = useState(JSON.parse(sessionStorage.getItem('user')) || {});
    const users = user[0].data[0];
    const name = props.name;
    const [state, setstate] = useState('My_Bids');
    const id = users.id;
    const [userBids, setUserBids] = useState(null);
    const [userBids2, setUserBids2] = useState(null);
    const [userBids1, setUserBids1] = useState(null);
    const [userrequest, setuserrequest] = useState(null);
    const [changephone , setchangephone] = useState('close');
    const [changeemail , setchangeemail] = useState('close');
    const [changepassword , setchangepassword] = useState('close');
    const [changeaddress , setchangeaddress] = useState('close');



    
    const [userData, setUserData] = useState(users);
  const [error, setError] = useState(null);

  // Function to fetch user data from the server
  const fetchUserData = async () => {
    try {
      // Make a GET request to the server endpoint to fetch user data
      const response = await axios.get(`https://backendauction.mydriven.ae/userbyid/${id}`);
     // Replace '123' with the actual user ID
      // If the request is successful, update the userData state with the response data
      setUserData(response.data.results[0]);
      
    } catch (err) {
      // If there's an error, update the error state with the error message
      setError(err.message);
    }
  };

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    // Fetch user data initially
    fetchUserData();

    // Set up interval to fetch user data every 10 seconds
    const intervalId = setInterval(fetchUserData, 100000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchUserBids = async () => {
        try {
            const response = await fetch(
                `https://backendauction.mydriven.ae/bids/${id}`
              );
              if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
              }
              let userBidsData = await response.json();
              setUserBids(userBidsData);
        } catch (error) {
         console.log(error)   
        }
    }
  
    fetchUserBids()
  }, [])



  useEffect(() => {

    const fetchUserBids = async () => {
        try {
            const response = await fetch(`https://backendauction.mydriven.ae/wishlist/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            let userBidsData = await response.json();
            console.log(1,userBids2,id);
            setUserBids2(userBidsData); // Ensure default value is an empty array if data is null
        } catch (error) {
            console.log(error);
            setUserBids2([]); // Set default value to empty array on error
        }
    }

    fetchUserBids();
}, [id]);

  useEffect(() => {
    const fetchUserBids = async () => {
        try {
            const response = await fetch(
                `https://backendauction.mydriven.ae/bids2/${id}`
              );
              if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
              }
              let userBidsData = await response.json();
              setUserBids1(userBidsData);
        } catch (error) {
         console.log(error)   
        }


        try {
            const response = await fetch(
                `https://backendauction.mydriven.ae/userrequest/${id}`
              );
              if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
              }
              let userBidsData1 = await response.json();
              setuserrequest(userBidsData1);
        } catch (error) {
         console.log(error)   
        }
    }
  
    fetchUserBids()
  }, [])
  const image = userData.image === '' ? '/profile.webp' : userData.image;

const Table = ({ data, columns }) => {
    return (
        <List data={data} columns={columns}/>
    )
}

    return (
        <div>
        <Navbar/>
        { name === 'Dashboard' &&
             <div className="row">
             <div className="col-md-3">
                 <div className="Container-fluid"><Link to={"/"} ><span>{t("home")}</span></Link>/{t(state)}</div>
                 <div className="Container-fluid bold-cont my-3">
                     <a href="#wish" className="flex">
                         <div className="w-100" onClick={(e) => setstate('WishList')}><img src="/wishlist.png" className="svg" alt="log"/><span>{t('WishList')}</span></div>
                     </a><hr/>
                     <a href="#bids"  className="flex">
                         <div className="w-100" onClick={(e) => setstate('My_Bids')}><img src="/bid.png" className="svg" alt="log"/><span>{t('My_Bids')}</span></div>
                     </a><hr/>
                     <a href="#won" className="flex">
                         <div className="w-100" onClick={(e) => setstate('My_won')}><img src="/mywon.png" className="svg" alt="log"/><span>{t('My_won')}</span></div>
                     </a><hr/>
                     <a href="#purchases" className="flex">
                         <div className="w-100" onClick={(e) => setstate('My_purchases')}><img src="/putchases.webp" className="svg" alt="log"/><span>{t('My_purchases')}</span></div>
                     </a><hr/> 
                     
                     <a href="#My_Wallet" className="flex">
                         <div className="w-100" onClick={(e) => setstate('My_Wallet')}><img src="/wallet.png" className="svg" alt="log"/><span>{t('My_Wallet')}</span></div>
                     </a><hr/>  
                     <Link to="../user/Profile/request.js" className="flex">
                         <div className="w-100" onClick={(e) => setstate('My_Requests')}><img src="/request.jpg" className="svg" alt="log"/><span>{t("My_Requests")}</span></div>
                     </Link> 
                 </div>
             </div>
             <div className="col-md-9 my-4">
                <div className="Container-fluid" id="Phone">
                    <h3>
                        <b>
                            
                            {state=== 'WishList' && userBids2 ? <Table data={userBids2? userBids2 : null} columns={wishlistcol}/> : ''}
                            {state=== 'My_Bids' ? <Table data={userBids? userBids : {}} columns={bidsColumns}/> : ''}
                            {state=== 'My_won' ? <Table data={userBids1? userBids1 : {}} columns={bidsColumns}/> : ''}
                            {state=== 'My_purchases' ? <Table data={userrequest? userrequest : {}} columns={buyNowReqColumns}/> : ''}
                            {state=== 'My_Wallet' && <Payment />}
                        </b>
                    </h3>
                </div>
             </div>
 
             </div>
        }
        { name === 'Profile' &&
            <div className="row m-2 mt-5">
            <div className="col-md-3">
                <div className="Container-fluid"><Link to={"/"} ><span>{t("home")}</span></Link>/{t(name)}</div>
                <div className="Container-fluid bold-cont my-5">
                    <div className="row" align="center">
                        <span>
                        <img src={image} alt="profile" style={{width: "100px", height: '100px', border: "solid 2px gray", borderRadius: '50%'}} /> 
                        </span>
                        <span><b>{userData.username}</b></span>
                    </div>
                    <hr/>
                    <a href="#Phone" className="flex">
                        <div className="w-100"><img src="/mobile.png" className="svg" alt="log"/><span>{t('Mobile')}</span></div>
                    </a><hr/>
                    
                    <a href="#Email"  className="flex">
                        <div className="w-100"><img src="/email.png" className="svg" alt="log"/><span>{t('Email')}</span></div>
                    </a><hr/>
                    <a href="#Password" className="flex">
                        <div className="w-100"><img src="/Key.png" className="svg" alt="log"/><span>{t('CPassword')}</span></div>
                    </a><hr/>
                    {/* <a href="#Documents" className="flex">
                        <div className="w-100"><img src="/Document.png" className="svg" alt="log"/><span>{t('Documents')}</span></div>
                    </a><hr/> */}
                    <a href="#Address" className="flex">
                        <div className="w-100"><img src="/address.png" className="svg" alt="log"/><span>{t("Address")}</span></div>
                    </a>
                    <hr/>
                    <Link to="./request.js" className="flex">
                         <div className="w-100" onClick={(e) => setstate('My_Requests')}><img src="/request.jpg" className="svg" alt="log"/><span>{t("My_Requests")}</span></div>
                     </Link> 
                </div>
            </div>
            <div className="col-md-9 my-4">
                
        <Container state={changephone} id={id} success={()=>{setchangephone('close');}}/>
                <div className="Container-fluid bold-cont my-5" id="Phone">
                    <div className="w-100 flex">
                        <img src="/mobile.png" className="svg" alt="log"/>
                        <span>{t('Mobile')}</span>
                        </div><hr/>
                        <div className="row">
                            <div className="col-8">
                        <span style={{color: 'gray'}}>{t('Mobile')}</span><br/>
                        <b>{userData.phone}</b>
                        </div>
                        <div className="col-4" align="center">
                            <button className="btn btn-warning" onClick={()=>{setchangephone('True')}}>{t('Cnumber')}</button>
                        </div>
                    </div>
                </div>
                <Containere state={changeemail} id={id} success={()=>{setchangeemail('close');}}/>
                <div className="Container-fluid bold-cont my-5" id="Email">
                    <div className="w-100 flex">
                        <img src="/email.png" className="svg" alt="log"/>
                        <span>{t('Email')}</span>
                        </div><hr/>
                        <div className="row">
                            <div className="col-8">
                        <span style={{color: 'gray'}}>{t('Email')}</span> {userData.status === 0 && <span style={{color: 'red'}}>❗{t("NVerified")}</span>} {userData.status === 1 && <span style={{color: 'green', margin: '10px'}}>{t("Verified")}</span>}<br/>
                        <b>{userData.email}</b>
                        </div>
                        <div className="col-4" align="center">
                            <button className="btn btn-warning m-2">{t('Vemail')}</button>
                            <button className="btn btn-warning" onClick={()=>{setchangeemail('True')}} >{t('Cemail')}</button>
                        </div>
                    </div>
                </div>
                <Containerp state={changepassword} id={id} success={()=>{setchangepassword('close');}}/>
                <div className="Container-fluid bold-cont my-5" id="Password">
                    <div className="w-100 flex">
                        <img src="/key.png" className="svg" alt="log"/>
                        <span>{t('Password')}</span>
                        
                    </div><hr/>
                        <div className="row">
                            <div className="col-8">
                                <span style={{color: 'gray'}}>{t('Passwordline')}</span> 
                            </div>
                            <div className="col-4" align="center">
                                <button className="btn btn-warning"  onClick={()=>{setchangepassword('True')}} >{t('CPassword')}</button>
                            </div>
                        </div>
                    </div>
                    <Containerad state={changeaddress} id={id} success={()=>{setchangeaddress('close');}}/>
                    <div className="Container-fluid bold-cont my-5" id="Address">
                    <div className="w-100 flex">
                        <img src="/address.png" className="svg" alt="log"/>
                        <span>{t('Address')}</span>
                        
                    </div><hr/>
                        <div className="row">
                        { userData.address === null &&
                            <div className="row">
                                <div className="col-8">
                                    <span style={{color: 'gray'}}>{t('Addressline')}</span> 
                                </div>
                                <div className="col-4" align="center">
                                    <button className="btn btn-warning"  onClick={()=>{setchangeaddress('True')}} >{t('AddAddress')}</button>
                                </div>
                            </div>
                        }
                        { userData.address !== null &&
                            <div className="row">
                                <div className="col-8">
                                    <span style={{color: 'gray'}}>{userData.address}</span> 
                                </div>
                                <div className="col-4" align="center">
                                    <button className="btn btn-warning"  onClick={()=>{setchangeaddress('True')}}>{t('CAddress')}</button>
                                </div>
                            </div>
                        }
                        </div>
                    </div>
            </div>

            </div>
        }
        </div>
    );
    
}
export default Seller;




const Container = (props,success) => {
    const [phone , setPhone] = useState('');
    const {t} = useTranslation();
    const id = props.id;
    const handleclose = () =>{
        props.success();
    }
    const handleChangephone = async () => {
        try {
            const response = await axios.post('https://backendauction.mydriven.ae/changephone', {phone,id});
            alert("Successfully added!");
            handleclose();
        }
        catch (error) {
            console.error(error);
            alert("Failed!")
        }
}
    const handleInputChange = (event) => {
        setPhone(event.target.value);
      };
        if(props.state === 'True' && isMobile){
        
        return(
                <div id="popup" style={{backgroundColor: "white", minWidth: "50%", minHeight: "200px", zIndex: "10",  borderRadius: "20px", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', trasform: "translate(-50%,-50%)",position: "absolute", paddingRight: "50px"}}>
                <div align="right">
                    <div className="m-3 btn btn-danger" onClick={()=>{handleclose();}}>Close</div>
                    <div className="m-3 btn btn-danger" onClick={()=>{handleChangephone();}}>Submit</div>
                </div>
                <div className="row">
                <div style={{ width: '300px', margin: 'auto', marginTop: '0px' }}>
                    <label className="form-label m-3" htmlfor="cnumber">{t('Mobile')}</label>
                    <input type="phone" className="form-control m-3 w-80" name="phone" id="cnumber" value={phone} onChange={handleInputChange}/>
                </div>
                </div>
            </div>
            
           )
        }
        if(props.state === 'True' && !isMobile){
        
            return(
                    <div id="popup" style={{backgroundColor: "white", minWidth: "50%", minHeight: "200px", zIndex: "10", left: "30%", borderRadius: "20px", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', trasform: "translate(-50%,-50%)",position: "absolute", paddingRight: "50px"}}>
                    <div align="right">
                        <div className="m-3 btn btn-danger" onClick={handleclose}>Close</div>
                        <div className="m-3 btn btn-danger" onClick={()=>{handleChangephone()}}>Submit</div>
                    </div>
                    <div className="row">
                    <div style={{ width: '300px', margin: 'auto', marginTop: '0px' }}>
                        <label className="form-label m-3" htmlfor="cnumber">{t('Mobile')}</label>
                        <input type="phone" className="form-control m-3 w-80" name="phone" id="cnumber" onChange={(e)=>{handleInputChange(e)}}/>
                    </div>
                    </div>
                </div>
                
               )
            }
}



const Containere = (props,success) => {
    const [phone , setPhone] = useState('');
    const {t} = useTranslation();
    const id = props.id;
    const handleclose = () =>{
        props.success();
    }
    const handleChangephone = async () => {
        try {
            const response = await axios.post('https://backendauction.mydriven.ae/changeemail', {phone,id});
            alert("Successfully added!");
            handleclose();
        }
        catch (error) {
            console.error(error);
            alert("Failed!")
        }
}
    const handleInputChange = (event) => {
        setPhone(event.target.value);
      };
        if(props.state === 'True' && isMobile){
        
        return(
                <div id="popup" style={{backgroundColor: "white", minWidth: "50%", minHeight: "200px", zIndex: "10", borderRadius: "20px", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', trasform: "translate(-50%,-50%)",position: "absolute", paddingRight: "50px"}}>
                <div align="right">
                    <div className="m-3 btn btn-danger" onClick={()=>{handleclose();}}>Close</div>
                    <div className="m-3 btn btn-danger" onClick={()=>{handleChangephone();}}>Submit</div>
                </div>
                <div className="row">
                <div style={{ width: '300px', margin: 'auto', marginTop: '0px' }}>
                    <label className="form-label m-3" htmlfor="cnumber">{t('email')}</label>
                    <input type="email" className="form-control m-3 w-80" name="phone" id="cnumber" value={phone} onChange={handleInputChange}/>
                </div>
                </div>
            </div>
            
           )
        }
        if(props.state === 'True' && !isMobile){
        
            return(
                    <div id="popup" style={{backgroundColor: "white", minWidth: "50%", minHeight: "200px", zIndex: "10", left: "30%", borderRadius: "20px", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', trasform: "translate(-50%,-50%)",position: "absolute", paddingRight: "50px"}}>
                    <div align="right">
                        <div className="m-3 btn btn-danger" onClick={handleclose}>Close</div>
                        <div className="m-3 btn btn-danger" onClick={()=>{handleChangephone()}}>Submit</div>
                    </div>
                    <div className="row">
                    <div style={{ width: '300px', margin: 'auto', marginTop: '0px' }}>
                        <label className="form-label m-3" htmlfor="cnumber">{t('Email')}</label>
                        <input type="phone" className="form-control m-3 w-80" name="phone" id="cnumber" onChange={(e)=>{handleInputChange(e)}}/>
                    </div>
                    </div>
                </div>
                
               )
            }
}


const Containerp = (props,success) => {
    const [phone , setPhone] = useState('');
    const {t} = useTranslation();
    const id = props.id;
    const handleclose = () =>{
        props.success();
    }
    
    const navigate = useNavigate();
    const handleChangephone = async () => {
        try {
            const response = await axios.post('https://backendauction.mydriven.ae/changepassword', {phone,id});
            if(response.data === 'Successfully added!'){
            handleclose();
            alert("Successfully added!");
    const user = {};
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('admin', JSON.stringify(user));
    navigate('/login');
}
        }
        catch (error) {
            console.error(error);
            alert("Failed!")
        }
}
    const handleInputChange = (event) => {
        setPhone(event.target.value);
      };
        if(props.state === 'True' && isMobile){
        
        return(
                <div id="popup" style={{backgroundColor: "white", minWidth: "50%", minHeight: "200px", zIndex: "10", borderRadius: "20px", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', trasform: "translate(-50%,-50%)",position: "absolute", paddingRight: "50px"}}>
                <div align="right">
                    <div className="m-3 btn btn-danger" onClick={()=>{handleclose();}}>Close</div>
                    <div className="m-3 btn btn-danger" onClick={()=>{handleChangephone();}}>Submit</div>
                </div>
                <div className="row">
                <div style={{ width: '300px', margin: 'auto', marginTop: '0px' }}>
                    <label className="form-label m-3" htmlfor="cnumber">{t('Password')}</label>
                    <input type="Password" className="form-control m-3 w-80" name="phone" id="cnumber" value={phone} onChange={handleInputChange}/>
                </div>
                </div>
            </div>
            
           )
        }
        if(props.state === 'True' && !isMobile){
        
            return(
                    <div id="popup" style={{backgroundColor: "white", minWidth: "50%", minHeight: "200px", zIndex: "10", left: "30%", borderRadius: "20px", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', trasform: "translate(-50%,-50%)",position: "absolute", paddingRight: "50px"}}>
                    <div align="right">
                        <div className="m-3 btn btn-danger" onClick={handleclose}>Close</div>
                        <div className="m-3 btn btn-danger" onClick={()=>{handleChangephone()}}>Submit</div>
                    </div>
                    <div className="row">
                    <div style={{ width: '300px', margin: 'auto', marginTop: '0px' }}>
                        <label className="form-label m-3" htmlfor="cnumber">{t('Password')}</label>
                        <input type="phone" className="form-control m-3 w-80" name="phone" id="cnumber" onChange={(e)=>{handleInputChange(e)}}/>
                    </div>
                    </div>
                </div>
                
               )
            }
}



const Containerad = (props,success) => {
    const [phone , setPhone] = useState('');
    const {t} = useTranslation();
    const id = props.id;
    const handleclose = () =>{
        props.success();
    }
    
    const handleChangephone = async () => {
        try {
            const response = await axios.post('https://backendauction.mydriven.ae/changeaddress', {phone,id});
            if(response.data === 'Successfully added!'){
            handleclose();
            alert("Successfully added!");
}
        }
        catch (error) {
            console.error(error);
            alert("Failed!")
        }
}
    const handleInputChange = (event) => {
        setPhone(event.target.value);
      };
        if(props.state === 'True' && isMobile){
        
        return(
                <div id="popup" style={{backgroundColor: "white", minWidth: "50%", minHeight: "200px", zIndex: "10", borderRadius: "20px", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', trasform: "translate(-50%,-50%)",position: "absolute", paddingRight: "50px"}}>
                <div align="right">
                    <div className="m-3 btn btn-danger" onClick={()=>{handleclose();}}>Close</div>
                    <div className="m-3 btn btn-danger" onClick={()=>{handleChangephone();}}>Submit</div>
                </div>
                <div className="row">
                <div style={{ width: '300px', margin: 'auto', marginTop: '0px' }}>
                    <label className="form-label m-3" htmlfor="cnumber">{t('Address')}</label>
                    <input type="address" className="form-control m-3 w-80" name="phone" id="cnumber" value={phone} onChange={handleInputChange}/>
                </div>
                </div>
            </div>
            
           )
        }
        if(props.state === 'True' && !isMobile){
        
            return(
                    <div id="popup" style={{backgroundColor: "white", minWidth: "50%", minHeight: "200px", zIndex: "10", borderRadius: "20px", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', trasform: "translate(-50%,-50%)",position: "absolute", paddingRight: "50px"}}>
                    <div align="right">
                        <div className="m-3 btn btn-danger" onClick={handleclose}>Close</div>
                        <div className="m-3 btn btn-danger" onClick={()=>{handleChangephone()}}>Submit</div>
                    </div>
                    <div className="row">
                    <div style={{ width: '300px', margin: 'auto', marginTop: '0px' }}>
                        <label className="form-label m-3" htmlfor="cnumber">{t('Address')}</label>
                        <input type="address" className="form-control m-3 w-80" name="phone" id="cnumber" onChange={(e)=>{handleInputChange(e)}}/>
                    </div>
                    </div>
                </div>
                
               )
            }
}
