import React from "react";
import Navbar from "../../Navbar";

const Number = () => {
    sessionStorage.setItem('previousPage', window.location.href);
    return (<div className='container-fluid'>
        <Navbar />
        Motor
    </div>)
}
export default Number;