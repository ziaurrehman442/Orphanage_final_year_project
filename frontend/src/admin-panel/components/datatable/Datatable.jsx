import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material";
import { DataGridTheme } from "../muitheme/DataGridTheme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL=`http://localhost:4000`

const Datatable = ({ data, columns, title, link }) => {

  const MuiTheme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 1,
            borderColor: '#fff',
            borderStyle: "solid",
            borderRadius: 10,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
            backgroundColor: '#fff',
            color: "#C1C2C5",
            padding: 10,
          },
        },
      },
    },
  });
  
  
  const toastNotification = () => toast.success("Successfull Deleted", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notifyError = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const handleDelete = (id) => {
    console.log(`${URL}/${link}/${id}`);
    axios.delete(`${URL}/${link}/${id}`)
      .then(response => {
        toastNotification('Successfully Deleted')
      })
      .catch(error => {
        notifyError(error.message)
      });
  };



  const naviagte = useNavigate();
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleClick = () => {
            naviagte(`/admin/${link}/view/${params.row.id}`);
        }
        return (
          <div className="cellAction">
            <div onClick={handleClick} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </div>
            <Link to={`/admin/${link}/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const actionColumn2 = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/${link}/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const actionColumn3 = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleClick = () => {
            naviagte(`/admin/${link}/view/${params.row.id}`);
      }
        return (
          <div className="cellAction">
           <div onClick={handleClick} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
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
      />
      <div className="datatable">
        <div className="datatableTitle">
          {title}
          {title == 'Donation' || title.includes('Report') ? '' :
          <Link to={`/admin/${link}/new`} className="link">
            Add New
          </Link>}
        </div>
        <ThemeProvider theme={MuiTheme}>
        <DataGrid
          className="datagrid"
          rows={data}
          columns={!(title == "Adopted Child's" || title.includes('Report')) ? (title === 'Roster' || title === 'Expenses' ? columns.concat(actionColumn2) : title === 'Donation' ? columns.concat(actionColumn3) : columns.concat(actionColumn)) : columns} 
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
        </ThemeProvider>
      </div>
    </>
  );
};

export default Datatable;
