import { Box, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
//start of Marcus' Code

//Dropdown constants for education
const education = [
    {
        value: 'journeyman',
        label: 'Journeyman'
    },
    {
        value: 'apprentice1',
        label: 'Apprentice First Year'
    },
    {
        value: 'apprentice2',
        label: 'Apprentice Second Year'
    },
    {
        value: 'apprentice3',
        label: 'Apprentice Third Year'
    }
]
//Dropdown constants for employment
const employment = [
    {
        value: 1,
        label: 'Full Time'
    },
    {
        value: 0,
        label: 'Part Time'
    }
]
//dropdown constants for status
const status = [
    {
        value: 1,
        label: 'Active'
    },
    {
        value: 0,
        label: 'Inactive'
    }
]

const Employee = () => {

    return (<Box m="20px">
        <Header title="EMPLOYEE" subtitle="NEW EMPLOYEE" />
        <Typography
            //display="flex"
            variant="h4"
            //justifyContent="space-between"
            sx={{
                m: "10px auto",
                width: '75%',
            }}>
            Employee Information
        </Typography>

        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                gridColumn: "span 4",
                margin: "auto",
                width: '75%'
            }}
        >
            <TextField
                fullWidth
                required
                type="text"
                variant='filled'
                label="First Name"
                name="firstName"
                sx={{ gridColumn: "span 1" }}
            />

            <TextField
                fullWidth
                required
                type="text"
                variant='filled'
                label="Last Name"
                name="lastName"
                sx={{ gridColumn: "span 1" }}
            />

            <TextField
                fullWidth
                required
                type="text"
                variant='filled'
                label="Email"
                name="email"
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                required
                type="text"
                variant='filled'
                label="Address"
                name="address"
                sx={{ gridColumn: "span 1" }}
            />
            <TextField
                fullWidth
                required
                type="text"
                variant='filled'
                label="Postal Code"
                name="postalCode"
                sx={{ gridColumn: "span 1" }}
            />
            <TextField
                fullWidth
                required
                type="number"
                variant='filled'
                label="Phone"
                name="phone #"
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                required
                type="text"
                variant='filled'
                label="City"
                name="city"
                sx={{ gridColumn: "span 1" }}
            />
            <TextField
                fullWidth
                required
                type="text"
                variant='filled'
                label="Province"
                name="province"
                sx={{ gridColumn: "span 1" }}
            />
        </Box>

        <Typography
            //display="flex"
            variant="h4"
            //justifyContent="space-between"
            sx={{
                m: "10px auto",
                width: '75%',
            }}>
            Education
        </Typography>

        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                gridColumn: "span 4",
                margin: "auto",
                width: '75%'
            }}
        >
            <TextField
                select
                required
                label="Education Level"
                variant='filled'
                name="educationLevel"
                sx={{ gridColumn: "span 1" }}
            >
                {education.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                fullWidth
                required
                type="number"
                variant='filled'
                label="Years of Experience"
                name="yearsofExperience"
                sx={{ gridColumn: "span 1" }}
            />
        </Box>

        <Typography
            //display="flex"
            variant="h4"
            //justifyContent="space-between"
            sx={{
                m: "10px auto",
                width: '75%',
            }}>
            Hours
        </Typography>
        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                gridColumn: "span 4",
                margin: "auto",
                width: '75%'
            }}
        >
            <TextField
                select
                required
                label="Employment Type"
                variant='filled'
                name="employmentType"
                sx={{ gridColumn: "span 1" }}
            >
                {employment.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                required
                label="Status"
                variant='filled'
                name="status"
                sx={{ gridColumn: "span 1" }}
            >
                {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

        </Box>

    </Box>
    )
}
export default CreateEmployee;
//End of Marcus' code