import { Box, TextField } from "@mui/material";
import Header from "../components/Header";
import Spinner from "react-bootstrap/esm/Spinner";
import AddNewButton from "../components/AddNewButton";
import { useState } from "react";

const Quotes = () => {
    // Declaring Constants
    const [loading, setLoading] = useState(false);

    return (
        <Box ml="20px">
            <Header title="QUOTE REQUESTS" subtitle="Select Quote" />
            <div>
                <AddNewButton destination="create" item="Quote" />
            </div>
            {!loading ? (

                <div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>
            ) : (
                <Box>
                    {/* Quote Request List will go here */}
                    
                </Box>
            )}
        </Box>
    )
}

export default Quotes;