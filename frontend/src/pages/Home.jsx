import { Box } from "@mui/material";
import Header from "../components/Header";


const Home = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    return (
    <Box >
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="HOME" subtitle="" /> 
            
        </Box>
        <div className="m-auto w-1/12 text-3xl">Welcome {loggedInUser.firstName}!!</div>
    </Box>
    );
};

export default Home; 