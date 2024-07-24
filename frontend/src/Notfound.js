import Navbar from "./Navbar";


const NotFound = () => {
    return (
        <div className='container-fluid'>
        <Navbar/>
        <div style={{ width: '300px', margin: 'auto', marginTop: '10%' }}>
            <h1 className="notfound">404 NotFound </h1>
        </div>
        </div>
    );
}

export default NotFound;