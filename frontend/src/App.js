import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./components/web/index.js";
import Seller from './components/seller/index';
import './index.css';
import "./admin-panel/pages/new/new.scss";
import Login from "./login.js";
import Signup from "./signup.js";
import LoginAdmin from './admin-panel/pages/login/LoginAdmin.jsx'
import NotFound from "./Notfound.js";
import Footer from "./components/web/footer.js";
import NewUser from "./admin-panel/pages/users/NewUser.jsx";
import Users from "./admin-panel/pages/users/Users.jsx";
import EditUser from "./admin-panel/pages/users/Edit.jsx";
import UserDetails from "./admin-panel/pages/users/UserDetails.jsx";
import Home from "./admin-panel/pages/home/Home.jsx";
import { productInputs } from "./admin-panel/formSource.js";
import { ChakraProvider } from "@chakra-ui/react";
import ComingSoonPage from "./components/web/commingsoon.js";
import AdminRoute from "./admin-panel/context/PrivateRoute.js";
import Orphanage from "./admin-panel/pages/orphanage/Orphange.jsx";
import EditOrphanage from "./admin-panel/pages/orphanage/Edit.jsx";
import OrphanageDetails from "./admin-panel/pages/orphanage/Orphanagedetails.jsx";
import NewOrphanage from "./admin-panel/pages/orphanage/NewOrphanage.jsx";
import ImageView from "./Imageview.js";
import Orphanagebranch from "./admin-panel/pages/orphanagebrance/Orphange.jsx";
import EditOrphanagebranch from "./admin-panel/pages/orphanagebrance/Edit.jsx";
import OrphanageDetailsbranch from "./admin-panel/pages/orphanagebrance/Orphanagedetails.jsx";
import NewOrphanagebranch from "./admin-panel/pages/orphanagebrance/NewOrphanage.jsx";
import Rooms from "./admin-panel/pages/Rooms/rooms.jsx";
import Addroom from "./admin-panel/pages/Rooms/New.jsx";
import EditRoom from "./admin-panel/pages/Rooms/Edit.jsx";
import Badallocation from "./admin-panel/pages/Rooms/badalsocation.js";
import RoomDetails from "./admin-panel/pages/Rooms/Details.jsx";
import Editchild from "./admin-panel/pages/child/Edit.jsx";
import Child from "./admin-panel/pages/child/child.jsx";
import ChildDetails from "./admin-panel/pages/child/childDetails.jsx";
import Newchild from "./admin-panel/pages/child/Newchild.jsx";
import Vehicles from "./admin-panel/pages/Vehicals/Vehicles.jsx";
import Edit from "./admin-panel/pages/Vehicals/Edit.jsx";
import VehiclesDetail from "./admin-panel/pages/Vehicals/vehiclesDetails.jsx";
import Newvehicles from "./admin-panel/pages/Vehicals/NewVehicles.jsx";
import AddFuelForm from "./admin-panel/pages/Vehicals/addfuelform.js";
import AddVehicleRoster from "./admin-panel/pages/Router/NewRouter.jsx";
import AddVehicleTimeInOut from "./admin-panel/pages/Vehicals/addtime.js";
import Router from "./admin-panel/pages/Router/Router.jsx";
import AddVehicleRoute from "./admin-panel/pages/Vehicals/addrouters.js";
import EditVehicleRoster from "./admin-panel/pages/Router/Edit.jsx";
import Allocate_vehicle from "./admin-panel/pages/users/allocate_vehicle.jsx";
import Guardian from "./admin-panel/pages/Guardian/Guardian.jsx";
import EditGuardian from "./admin-panel/pages/Guardian/Edit.jsx";
import GuardianDetails from "./admin-panel/pages/Guardian/GuardianDetails.jsx";
import NewGuardian from "./admin-panel/pages/Guardian/NewGuardian.jsx";
import Expenses from "./admin-panel/pages/expenses/rooms.jsx";
import EditExpenses from "./admin-panel/pages/expenses/Edit.jsx";
import ExpensesDetails from "./admin-panel/pages/expenses/Details.jsx";
import AddExpenses from "./admin-panel/pages/expenses/New.jsx";
import Donation from "./admin-panel/pages/Donation_donors/Donation.jsx";
import DonationDetails from "./admin-panel/pages/Donation_donors/donationdetails.jsx";
import Campaign from "./admin-panel/pages/Campaign/campaign.jsx";
import EditCampaign from "./admin-panel/pages/Campaign/Edit.jsx";
import CampaignDetails from "./admin-panel/pages/Campaign/campaignDetails.jsx";
import NewCampaign from "./admin-panel/pages/Campaign/NewCampaign.jsx";
import Orphanages from "./components/web/orphanages.js";
import Campaigns from "./components/web/campains.js";
import OrphanageDetailsfront from "./components/web/orphanagedetails.js";
import ChildPage from "./components/web/childs.js";
import DonorAndDonationPage from "./components/web/DonorAndDonationPage.js";
import Adoptedchild from "./admin-panel/pages/Adoptedchilds/index.js";
import ReportComponent from "./admin-panel/pages/Report/Report.js";
import ContactUs from "./components/web/contact_us.js";
import Complaints from "./components/web/comapin.js";

function App() {
  sessionStorage.setItem('previousPage', window.location.href);
  return (
    <div className="App">
      <ChakraProvider>
      <BrowserRouter>
        <Routes >
          <Route path='/commingsoon' element={ <ComingSoonPage/> }></Route>
          <Route path='/' element={ <Main/> }></Route>
          <Route path='/contact_us' element={ <ContactUs /> }></Route>
          <Route path='/Complaint' element={ <Complaints /> }></Route>
          <Route path='/Orphanages' element={ <Orphanages/> }></Route>
          <Route path='/Orphanage/:id' element={<OrphanageDetailsfront />} />
          <Route path='/Childs' element={<ChildPage />} />
          <Route path='/Donation' element={<DonorAndDonationPage />} />
          <Route path='/Campaigns' element={ <Campaigns/> }></Route>
          <Route path='/image/:id' element={ <ImageView /> }></Route>
          <Route path='/user/Profile' element={ <Seller name={"Profile"}/> }></Route>
          <Route path='/user/Dashboard' element={ <Seller name={"Dashboard"}/> }></Route>
          <Route path='/admin/login' element={ <LoginAdmin /> }></Route>
          <Route path='/login' element={ <Login /> }></Route>
          <Route path='/signup' element={ <Signup /> }></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/admin">
            <Route index element={<AdminRoute><Home /></AdminRoute>} />
            <Route path="Staff">
              <Route index element={<AdminRoute><Users /></AdminRoute>} />
              <Route path="edit/:userId" element={<AdminRoute><EditUser /></AdminRoute>} />
              <Route path="view/:userId" element={<AdminRoute><UserDetails /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><NewUser title="Add New User" /></AdminRoute>}
              />
              <Route
                path="allocation_vehicle/:id"
                element={<AdminRoute><Allocate_vehicle title="Allocating Vehicle" /></AdminRoute>}
              />
            </Route>

            <Route path="Adopted_childs">
              <Route index element={<AdminRoute><Adoptedchild /></AdminRoute>} />
            </Route>
            <Route path="Orphanage">
              <Route index element={<AdminRoute><Orphanage /></AdminRoute>} />
              <Route path="edit/:userId" element={<AdminRoute><EditOrphanage /></AdminRoute>} />
              <Route path="view/:userId" element={<AdminRoute><OrphanageDetails /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><NewOrphanage title="Add New Orphanage" /></AdminRoute>}
              />
            </Route>
            <Route path="Orphanage_branches">
              <Route index element={<AdminRoute><Orphanagebranch /></AdminRoute>} />
              <Route path="edit/:userId" element={<AdminRoute><EditOrphanagebranch /></AdminRoute>} />
              <Route path="view/:userId" element={<AdminRoute><OrphanageDetailsbranch /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><NewOrphanagebranch title="Add New Orphanage Branch" /></AdminRoute>}
              />
            </Route>
            <Route path="expenses">
              <Route index element={<AdminRoute><Expenses /></AdminRoute>} />
              <Route path="edit/:id" element={<AdminRoute><EditExpenses /></AdminRoute>} />
              <Route path="view/:id" element={<AdminRoute><ExpensesDetails /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><AddExpenses title="Add New Expenses" /></AdminRoute>}
              />
            </Route>
            <Route path="Rooms">
              <Route index element={<AdminRoute><Rooms /></AdminRoute>} />
              <Route path="edit/:id" element={<AdminRoute><EditRoom /></AdminRoute>} />
              <Route path="update_allocation/:id" element={<AdminRoute><Badallocation /></AdminRoute>} />
              <Route path="view/:roomId" element={<AdminRoute><RoomDetails /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><Addroom inputs={productInputs} title="Add New Room" /></AdminRoute>}
              />
            </Route>
            <Route path="Reports">
              <Route index element={<AdminRoute><ReportComponent /></AdminRoute>} />
            </Route>
            <Route path="Vehicles">
              <Route index element={<AdminRoute><Vehicles /></AdminRoute>} />
              <Route path="edit/:id" element={<AdminRoute><Edit /></AdminRoute>} />
              <Route path="add_feul/:id" element={<AdminRoute><AddFuelForm /></AdminRoute>} />
              <Route path="add_rout/:id" element={<AdminRoute><AddVehicleRoute /></AdminRoute>} />
              <Route path="add_time_in_out/:id" element={<AdminRoute><AddVehicleTimeInOut /></AdminRoute>} />
              <Route path="view/:id" element={<AdminRoute><VehiclesDetail /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><Newvehicles inputs={productInputs} title="Add New Vehicle" /></AdminRoute>}
              />
            </Route>
            <Route path="Vehicle_roster">
              <Route index element={<AdminRoute><Router /></AdminRoute>} />
              <Route path="edit/:id" element={<AdminRoute><EditVehicleRoster /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><AddVehicleRoster inputs={productInputs} title="Add New Router" /></AdminRoute>}
              />
            </Route>
            <Route path="Child">
              <Route index element={<AdminRoute><Child /></AdminRoute>} />
              <Route path="edit/:childID" element={<AdminRoute><Editchild /></AdminRoute>} />
              <Route path="view/:childID" element={<AdminRoute><ChildDetails /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><Newchild inputs={productInputs} title="Add New Child" /></AdminRoute>}
              />
            </Route><Route path="campaign">
              <Route index element={<AdminRoute><Campaign /></AdminRoute>} />
              <Route path="edit/:campaignID" element={<AdminRoute><EditCampaign /></AdminRoute>} />
              <Route path="view/:campaignID" element={<AdminRoute><CampaignDetails /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><NewCampaign inputs={productInputs} title="Add New Child" /></AdminRoute>}
              />
            </Route>
            <Route path="donations">
              <Route index element={<AdminRoute><Donation /></AdminRoute>} />
              <Route path="view/:donation_id" element={<AdminRoute><DonationDetails /></AdminRoute>} />
            </Route>
            <Route path="Guardian">
              <Route index element={<AdminRoute><Guardian /></AdminRoute>} />
              <Route path="edit/:id" element={<AdminRoute><EditGuardian /></AdminRoute>} />
              <Route path="view/:guardianId" element={<AdminRoute><GuardianDetails /></AdminRoute>} />
              <Route
                path="new"
                element={<AdminRoute><NewGuardian inputs={productInputs} title="Add New Guardian" /></AdminRoute>}
              />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
