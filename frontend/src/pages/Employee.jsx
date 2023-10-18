import { Box } from "@mui/material";
import Header from "../components/Header";
import AddNewButton from "../components/AddNewButton";
export const Employee = () => {

    return (
    <Box m="20px">
        <Header title="EMPLOYEE" subtitle="NEW EMPLOYEE" />
        <div>
            <AddNewButton destination="create" item="Employee" />
        </div>
    </Box>
    )
}

export default Employee;