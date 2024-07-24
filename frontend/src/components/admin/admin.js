import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import './Sidebar.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript here
import 'jquery';
import 'popper.js';


const Admin = (props) =>{
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    const { t } = useTranslation();
    const [sidebarActive, setSidebarActive] = useState(false);
    const [navbarCollapsed, setNavbarCollapsed] = useState(true);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    }

    const toggleNavbar = () => {
        setNavbarCollapsed(!navbarCollapsed);
    }
    
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('admin')) || {});

    useEffect(() => {
      const userFromSession = JSON.parse(sessionStorage.getItem('admin'));
      setUser(userFromSession || {});
    }, []);

    
    if(user === ''){
      window.location.href = "./admin";
    }
    else{
      console.log(user);
      return(
        <div className={`side row ${sidebarActive ? 'sidebar-active' : ''}`}>
          <div class="wrapper">
            <nav id="sidebar" className={sidebarActive ? 'active' : ''}>
                <div class="sidebar-header">
                    <img src="../Logo.jpg"/>
                    
                </div>

                <ul class="list-unstyled components">
                <h3>Driven Auction</h3>
                    <li class="active">
                    <div class="dropdown">
  <a class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </a>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                    <div class="dropdown">
  <a class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </a>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
                            </li>
                    <li>
                        <a href="#">Portfolio</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>

                <ul class="list-unstyled CTAs">
                    <li>
                        <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" class="download">Download source</a>
                    </li>
                    <li>
                        <a href="https://bootstrapious.com/p/bootstrap-sidebar" class="article">Back to article</a>
                    </li>
                </ul>
            </nav>

            <div id="content">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <button type="button" id="sidebarCollapse" class="btn btn-info" onClick={toggleSidebar}>
                            <i class="fas fa-align-left"></i>
                            <span>Toggle Sidebar</span>
                        </button>
                        <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" onClick={toggleNavbar}>
                            <i class="fas fa-align-justify"></i>
                        </button>
                        <div class={`collapse navbar-collapse ${navbarCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                            <ul class="nav navbar-nav ml-auto">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Page</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Page</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Page</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Page</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* contant dashboard */}
            </div>
        </div>
      </div>
      )
  }
}
export default Admin;
