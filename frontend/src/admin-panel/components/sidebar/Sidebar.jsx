import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Home from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate} from 'react-router-dom';
import { BedroomChildSharp, BroadcastOnHome, Campaign, CarRentalSharp, ChildCare, ChildCareTwoTone, CurrencyRupeeSharp, Person2Sharp, RouteOutlined } from "@mui/icons-material";
import { FaDollarSign } from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem('userAdmin');
    navigate('/admin/login');
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo"><img src="/Logo.jpg" alt="logo"/></span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          
          <li>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/admin/Staff" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Staff</span>
            </li>
          </Link>
          <Link to="/admin/expenses" style={{ textDecoration: "none" }}>
            <li>
              <FaDollarSign className="icon" />
              <span>Expenses</span>
            </li>
          </Link>
          <Link to="/admin/Orphanage" style={{ textDecoration: "none" }}>
            <li>
              <Home className="icon" />
              <span>Orphange</span>
            </li>
          </Link>
          <Link to="/admin/Child" style={{ textDecoration: "none" }}>
            <li>
              <ChildCare className="icon" />
              <span>Child's</span>
            </li>
          </Link>
          <Link to="/admin/Adopted_childs" style={{ textDecoration: "none" }}>
            <li>
              <ChildCare className="icon" />
              <span>Adopted Child's</span>
            </li>
          </Link>
          <Link to="/admin/Guardian" style={{ textDecoration: "none" }}>
            <li>
              <Person2Sharp className="icon" />
              <span>Guardian's</span>
            </li>
          </Link>
          <Link to="/admin/campaign" style={{ textDecoration: "none" }}>
            <li>
              <Campaign className="icon" />
              <span>Campaign's</span>
            </li>
          </Link>

          <Link to="/admin/Orphanage_branches" style={{ textDecoration: "none" }}>
            <li>
              <BroadcastOnHome className="icon" />
              <span>Orphange Branches</span>
            </li>
          </Link>
          <Link to="/admin/Rooms" style={{ textDecoration: "none" }}>
            <li>
              <BedroomChildSharp className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          <Link to="/admin/Vehicles" style={{ textDecoration: "none" }}>
            <li>
              <CarRentalSharp className="icon" />
              <span>Vehicles</span>
            </li>
          </Link>
          <Link to="/admin/Vehicle_roster" style={{ textDecoration: "none" }}>
            <li>
              <RouteOutlined className="icon" />
              <span>Vehicles Roster</span>
            </li>
          </Link>
          <Link to="/admin/donations" style={{ textDecoration: "none" }}>
            <li>
              <ChildCareTwoTone className="icon" />
              <span>Donations</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <Link to="/admin/Reports" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Report</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
