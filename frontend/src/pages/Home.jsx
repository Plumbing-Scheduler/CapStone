import { Box } from "@mui/material";
import Header from "../components/Header";
import DeleteButton from "../components/global/DeleteButton";
import EditButton from "../components/global/EditButton";

const Home = () => {
    return (<Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="HOME" subtitle="" /> 
        </Box>
        <EditButton/> 
        <DeleteButton/>
    </Box>
    );
};

export default Home; 