import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
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
import CustomerReports from './pages/Reports/CustomerReports';
import WorkOrderReports from './pages/Reports/WorkOrderReports';
import EmployeeReports from './pages/Reports/EmployeeReports';
// import QuoteHistoryReports from './pages/Reports/QuoteHistoryReports';
import TransactionReports from './pages/Reports/TransactionReports';

// import WorkOrderform from "./scenes/form";

function App() {

  const [theme, colorMode] = useMode();
  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/quotes" >
              <Route index element={<Quotes />} />
              <Route path='create' element={<CreateQuote />} />
              <Route path='edit/:id' element={<EditQuote />} />
              <Route path="delete/:id" element={<DeleteQuote />} />
              <Route path="details/:id" element={<ShowQuote />} />
            </Route>

            <Route path='workorder'>
              <Route index element={<WorkOrderList />} />
              <Route path="form" element={<CreateWorkOrder />} />
              <Route path="edit/:id" element={<EditWorkOrder />} />
              <Route path="details/:id" element={<ShowWorkOrder />} />
              <Route path="delete/:id" element={<DeleteWorkOrder />} />
            </Route>

            <Route path="/schedule" element={<Schedule />} >
            </Route>

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

            <Route path="/reports" element={<Reports />}>
              <Route path="" element={<WorkOrderReports />} />
              <Route path="customerreports" element={<CustomerReports />} />
              <Route path="employeereports" element={<EmployeeReports />} />
              <Route path="transactionreports" element={<TransactionReports />} /> 
              {/* <Route path="quotehistoryreports" element={<QuoteHistoryReports />} />  */}
              
            </Route>

          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
