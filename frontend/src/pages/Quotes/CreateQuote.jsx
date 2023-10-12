import { Box, TextField } from "@mui/material";
import Header from "../../components/Header";


const Quotes = () => {

    return <Box m="20px">
        <Header title="QUOTE REQUESTS" subtitle="Select Quote" />
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
                    sx={{ gridColumn: "span 1" }}
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
                <TextField
                    fullWidth
                    type="text"
                    variant="filled"
                    label="Buisness Name"
                    name="businessname"
                    id=""
                    sx={{ gridColumn: "span 1" }}
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
                    sx={{ gridColumn: "span 1" }}
                />

            </Box>

    </Box>
}

export default Quotes;