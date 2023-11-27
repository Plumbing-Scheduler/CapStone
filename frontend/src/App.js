import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./components/global/Topbar";
import Home from "./pages/Home";
import Sidebar from "./components/global/Sidebar";
import Quotes from "./pages/QuoteRequest";
import CreateQuote from './pages/Quotes/CreateQuote';
import EditQuote from './pages/Quotes/EditQuote';
import DeleteQuote from './pages/Quotes/DeleteQuote';
import ShowQuote from './pages/Quotes/ShowQuote';
import WorkOrderList from "./pages/workOrder/workOrderList";
import CreateWorkOrder from './pages/workOrder/CreateWorkOrder'
import EditWorkOrder from './pages/workOrder/EditWorkOrder'
import ShowWorkOrder from './pages/workOrder/ShowWorkOrder'
import DeleteWorkOrder from './pages/workOrder/DeleteWorkOrder'
import Schedule from "./pages/Schedule";
import Employee from "./pages/Employee";
import CreateEmployee from './pages/EmployeeManagement/CreateEmployee';
import EmployeeDetails from './pages/EmployeeManagement/EmployeeDetails';
import EditEmployee from './pages/EmployeeManagement/EditEmployee';
import DeleteEmployee from './pages/EmployeeManagement/DeleteEmployee';
import Customer from './pages/Customer';
import CreateCustomer from './pages/CustomerManagement/CreateCustomer';
import EditCustomer from './pages/CustomerManagement/EditCustomer';
import DeleteCustomer from './pages/CustomerManagement/DeleteCustomer';
import CustomerDetails from './pages/CustomerManagement/CustomerDetails';
import Reports from "./pages/Reports";
import ServiceReports from './pages/Reports/ServiceReports';
import Login from "./pages/Login";
import Profile from './pages/Profile';
import axiosInstance from './axiosInstance';
import { useEffect } from 'react';
import MobileSidebar from './components/global/MobileSideBar';
// import WorkOrderform from "./scenes/form";

function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("ref-loguser");
  const userData = JSON.parse(loggedInUser);
  const mobileSideBar = useMediaQuery("(max-width:800px)");
  const getRefresh = () => {
    axiosInstance
      .get('/refresh')
      .then((response) => {
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + response.data.accessToken;
        // console.log(response.data.accessToken);
        // console.log(JSON.parse(loggedInUser));
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
      })
  }
  setInterval(getRefresh, 60 * 60 * 1000);

  useEffect(() => {
    getRefresh();
    navigate('/');
  }, [])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!loggedInUser ? (
          <Login />
        ) : (
          <div className="app">
            {!mobileSideBar && (
              <Sidebar role={userData.role} />
            )}

            <div className='topBar'>
              <div>
                {mobileSideBar && (
                  <MobileSidebar role={userData.role}/>
                )}
              </div>
              <Topbar mobile={mobileSideBar} role={userData.role} />
            </div>
            <main className="content">
              <div className='pages'>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />

                  <Route path='workorder'>
                    <Route index element={<WorkOrderList role={userData.role} logId={userData.id} />} />
                    <Route path="form" element={<CreateWorkOrder />} />
                    <Route path="edit/:id" element={<EditWorkOrder />} />
                    <Route path="details/:id" element={<ShowWorkOrder />} />
                    <Route path="delete/:id" element={<DeleteWorkOrder />} />
                  </Route>

                  <Route path="/schedule" element={<Schedule role={userData.role} logId={userData.id} />} >
                  </Route>
                  {(userData.role == "Management") &&
                    <Route path="/quotes" >
                      <Route index element={<Quotes />} />
                      <Route path='create' element={<CreateQuote />} />
                      <Route path='edit/:id' element={<EditQuote />} />
                      <Route path="delete/:id" element={<DeleteQuote />} />
                      <Route path="details/:id" element={<ShowQuote />} />
                    </Route>
                  }

                  <Route path="employee">
                    <Route index element={<Employee />} />
                    <Route path='details/:id' element={<EmployeeDetails />} />
                    <Route path="create" element={<CreateEmployee />} />
                    <Route path="edit/:id" element={<EditEmployee />} />
                    <Route path="delete/:id" element={<DeleteEmployee />} />
                  </Route>

                  <Route path="/customers">
                    <Route index element={<Customer />} />
                    <Route path="create" element={<CreateCustomer />} />
                    <Route path="edit/:id" element={<EditCustomer />} />
                    <Route path="delete/:id" element={<DeleteCustomer />} />
                    <Route path="details/:id" element={<CustomerDetails />} />
                  </Route>

                  <Route path="/reports">
                    <Route index element={<Reports />} />
                    <Route path="history/:filter" element={<ServiceReports />} />
                  </Route>

                </Routes>
              </div>
            </main>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
