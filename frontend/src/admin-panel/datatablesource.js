import { useNavigate } from "react-router-dom"
// export const carsData = [];
// // const fetchCarData = async () => {
// //   try {
// //     const response = await axios.get(URL).then(res => res.data);
// //     console.log(response);
// //     //carsData.push(response);
// //       response?.forEach(car => {
// //         carsData.push({
// //           CarID: car.id,
// //           CarImage: car.feature_image,
// //           CarPrice: car.price,
// //           Mileage: car.mileage,
// //           Speed: car.speed,
// //           Status: car.status,
// //           CreatedAt: car.created_at,
// //         })
// //       });
// //   } catch (error) {
// //     console.log(error)
// //   }
// // }


// import PdfViewer from "./pages/catelog/preview"


// //fetchCarData();

// const fetchDataForPosts = async () => {
//   try {
//     const response = await fetch(URL);
//     if (!response.ok) {
//       throw new Error(`HTTP error: Status ${response.status}`);
//     }
//     let postsData = await response.json();
//     console.log(postsData);
//     carsData.push(postsData);
//   } catch (err) {
//     console.log(err.message)
//   }
// };

// fetchDataForPosts();
// const [rows, setRows] = useState();
// const handleFeaturedChange = (id, newValue) => {
//   setRows(rows.map(row => (row.id === id ? { ...row, featured: newValue } : row)));
// };


// const carsColumns = [
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "title",
//     headerName: "Title",
//     width: 230,
//     renderCell: (params) => {
//       return (
//         <div className="cellWithImg">
//           <img className="cellImg" src={params.row.feature_image} alt="avatar" />
//           {params.row.title}
//         </div>
//       );
//     },
//   },
//   {
//     field: "model",
//     headerName: "Model",
//     width: 230,
//   },

//   {
//     field: "brand",
//     headerName: "Brand",
//     width: 100,
//   },
//   {
//     field: "vendor",
//     headerName: "Vendor",
//     width: 160
//   },
//   {
//     field: "is_featured",
//     headerName: "Featured",
//     width: 160,
//     renderCell: (params) => (
//       <FeaturedDropdown
//         featured={params.row.is_featured}
        
//       />
//     ),
//   },
// ];



// const userColumns = [
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "name",
//     headerName: "Name",
//     width: 230,
//     renderCell: (params) => {
//       return (
//         <div className="cellWithImg">
//           <img className="cellImg" src={params.row.image} alt="avatar" />
//           {params.row.name}
//         </div>
//       );
//     },
//   },
//   {
//     field: "username",
//     headerName: "Username",
//     width: 100,
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     width: 100,
//   },
//   {
//     field: "phone",
//     headerName: "Phone",
//     width: 100,
//   },
//   {
//     field: "country",
//     headerName: "Country",
//     width: 100,
//   },
//   {
//     field: "payment",
//             headerName: "Payment",
//             width: 150,
//             renderCell: (params) => (
//                 <PaymentInputField
//                     id={params.row.id}
//                     initialPrice={params.row.payment}
//                     onUpdate={(userId, newPrice) => {
//                         // Handle update logic here
//                         console.log(`Updated payment for user ${userId} to ${newPrice}`);
//                     }}
//                 />
//             ),
//   }
// ]

const bidsColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "BidAmount",
    headerName: "Bid Amount",
    width: 100,
  },
  {
    field: "BidStartTime",
    headerName: "Bid Start Time",
    width: 100,
  },
  {
    field: "BidEndTime",
    headerName: "Bid End Time",
    width: 100,
  },
  {
    field: "ItemType",
    headerName: "Item Type",
    width: 100,
  },
]



// const wishlistcol =[
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "User_id",
//     headerName: "View",
//     width: 100,
//     renderCell: (params) => {
//       const navigate = useNavigate();
//       return (
//         <div className="cellWithImg">
//           {/* <button className="cellImg" onclick={()=>{navigate())}} alt="avatar" >
//             Preview
//           </button> */}
//         </div>
//       );
//     },
//   }
// ]

// const handlep = (e) => {
//   <PdfViewer pdfUrl={e} />
// }

// const Catelogcol = [
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "Catelog",
//     headerName: "Catelog",
//     width: 100,
//     renderCell: (params) => {
//             return (
//               <div className="cellWithImg">
//                 <button className="cellImg" onclick={()=>{handlep(params.row.catelog)}} alt="avatar" >
//                   Preview
//                 </button>
//               </div>
//             );
//           },
//   }
// ]


export const buyNowReqColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "ItemType",
    headerName: "Item Type",
    width: 100,
  },
  {
    field: "ItemID",
    headerName: "Item ID",
    width: 100,
  },
  {
    field: "RequestedPrice",
    headerName: "Requested Price",
    width: 100,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 100,
  },
  {
    field: "RequestTime",
    headerName: "Request Time",
    width: 100,
  },{
    field: "BuyerUserID",
    headerName: "User Id",
    width: 100,
  }
]

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

export {
  bidsColumns
}