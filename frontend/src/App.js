import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/global/Topbar";
import Home from "./pages/Home";
import Sidebar from "./components/global/Sidebar";
import Quotes from "./pages/QuoteRequest";
import CreateQuote from './pages/Quotes/CreateQuote';
import EditQuote from './pages/Quotes/EditQuote';
import WorkOrder from "./pages/workOrders";
import CreateWorkOrder from './pages/workOrder/CreateWorkOrder'
import EditWorkOrder from './pages/workOrder/EditWorkOrder'
import ShowWorkOrder from './pages/workOrder/ShowWorkOrder'
import DeleteWorkOrder from './pages/workOrder/DeleteWorkOrder'
import Schedule from "./pages/Schedule";
import Employee from "./pages/Employee";
import Reports from "./pages/Reports";

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
            {/* <Route path="/workOrderform" element={<WorkOrderForm />} /> */}
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/quotes/create" element={<CreateQuote />}/>
            <Route path="/quotes/update" element={<EditQuote />}/>
            <Route path="workorder" element={<WorkOrder />} />
            <Route path="workorder/form" element={<CreateWorkOrder />} /> 
            <Route path="workorder/edit/:id" element={<EditWorkOrder />} />
            <Route path="workorder/details/:id" element={<ShowWorkOrder />} />
            <Route path="workorder/delete/:id" element={<DeleteWorkOrder />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
