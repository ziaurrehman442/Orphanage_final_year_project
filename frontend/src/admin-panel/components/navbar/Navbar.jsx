import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useState } from "react";
import Avatar from "../avatar/Avatar";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('userAdmin')) || {});
  
  //const initials = `${user.data[0].first_name[0].toUpperCase()}${user.data[0].last_name[0].toUpperCase()}`;

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-wrapper">
        <div className="admin-navbar-search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="admin-navbar-items">
          <div className="admin-navbar-item">
            <LanguageOutlinedIcon className="admin-navbar-icon" />
            English
          </div>
          <div className="admin-navbar-item">
            <FullscreenExitOutlinedIcon className="admin-navbar-icon" />
          </div>
          <div className="admin-navbar-item">
            <NotificationsNoneOutlinedIcon className="admin-navbar-icon" />
            <div className="admin-navbar-counter">1</div>
          </div>
          <div className="admin-navbar-item">
            <ChatBubbleOutlineOutlinedIcon className="admin-navbar-icon" />
            <div className="admin-navbar-counter">2</div>
          </div>
          <div className="admin-navbar-item">
            <ListOutlinedIcon className="admin-navbar-icon" />
          </div>
          <div className="admin-navbar-item">
            {user.data[0].image ? <img
              src={user.data[0].image}
              alt=""
              className="admin-navbar-avatar"
            /> :
            <Avatar 
              firstName={user.data[0].first_name} 
              lastName={user.data[0].last_name}
              fontSize={15}
              size={40}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
