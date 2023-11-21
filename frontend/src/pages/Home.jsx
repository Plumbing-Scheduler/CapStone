import { Box } from "@mui/material";
import Header from "../components/Header";


const Home = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("ref-loguser"));
    return (
    <Box >
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="HOME" subtitle={"Welcome " + loggedInUser.firstName + "!"} /> 
            <div className="m-auto w-auto text-3xl"></div>
        </Box>
        
    </Box>
    );
};

export default Home; 