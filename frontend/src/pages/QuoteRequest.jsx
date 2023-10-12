import { Box, TextField } from "@mui/material";
import Header from "../components/Header";
import Spinner from "react-bootstrap/esm/Spinner";
import AddNewButton from "../components/AddNewButton";
import { useState } from "react";

const Quotes = () => {
const [ loading, setLoading ] = useState(false);

    return <Box ml="20px">
        <Header title="QUOTE REQUESTS" subtitle="Select Quote" />
        {!loading ? (
            <div>
                <AddNewButton destination="create" item="Quote"/>
            </div>
        ):(
            <Box>

            </Box>
        )}
    </Box>
}

export default Quotes;