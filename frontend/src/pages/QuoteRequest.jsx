import { Box, Typography, TextField } from "@mui/material";
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

            
            <Typography
            // Jeremys code start 
                //display="flex"
                variant="h4"
                //justifyContent="space-between"
                sx={{
                    m: "10px auto",
                    width: '80%',
                    textAlign: 'center'
                }}>
                Update Quote Request
                <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    gridColumn: "span 4",
                    margin: "auto",
                    width: '75%'
                }} >
                <TextField
                    fullWidth
                    type="number"
                    variant='filled'
                    label="Phone #"
                    name="phone"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="text"
                    variant='filled'
                    label="Email"
                    name="email"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    type="text"
                    variant="filled"
                    label="Buisness Name"
                    name="businessname"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="text"
                    variant="filled"
                    label="Address"
                    name="address"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="number"
                    variant='filled'
                    label="Cost"
                    name="cost"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    multiline
                    variant="filled"
                    label="Description"
                    required
                    cols="30"
                    rows="4"
                    name="description"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
            </Box>
            

            </Typography>





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