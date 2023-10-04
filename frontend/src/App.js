import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Home from "./scenes/Home";
import Sidebar from "./scenes/global/Sidebar";
import Quotes from "./scenes/Quotes";
import WorkOrder from "./pages/workOrders";
import Form from './scenes/form/form'
import Schedule from "./scenes/Schedule";
import Employee from "./scenes/Employee";
import Reports from "./scenes/Reports";
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
            <Route path="/Quotes" element={<Quotes />} />
            <Route path="/WorkOrder" element={<WorkOrder />} />
            <Route path="/WorkOrder/Form" element={<Form />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/Employee" element={<Employee />} />
            <Route path="/Reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
