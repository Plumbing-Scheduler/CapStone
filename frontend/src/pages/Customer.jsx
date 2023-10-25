import React from 'react'
import { Box } from "@mui/material";
import Header from "../components/Header";
import AddNewButton from "../components/AddNewButton";

const Customer = () => {

  return (
    
    <Box>
        <Header title={"CUSTOMERS"}/>
        <div className="">
                <AddNewButton destination="create" item="Customer" />
            </div>
    </Box>
    
  )
}

export default Customer