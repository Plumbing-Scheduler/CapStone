import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/global/Topbar";
import Home from "./pages/Home";
import Sidebar from "./components/global/Sidebar";
import Quotes from "./pages/Quotes";
import WorkOrderList from "./pages/workOrder/workOrderList";
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

            <Route path="/quotes" element={<Quotes />} >
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

            <Route path="/employee" element={<Employee />} >
            </Route>

            <Route path="/reports" element={<Reports />} >
            </Route>

          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
