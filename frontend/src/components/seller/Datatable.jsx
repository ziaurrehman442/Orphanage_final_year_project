import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL=`https://backendauction.mydriven.ae`

const Datatable = ({ data, columns }) => {

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
        <ThemeProvider theme={MuiTheme}>
        <DataGrid
          className="datagrid"
          rows={data}
          columns={columns}
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
