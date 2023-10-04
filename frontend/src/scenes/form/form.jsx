import { Box, /*Button,*/ TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery"; /* Make screen Responsive */
import Header from "../../components/Header";
//import { ColorModeContext, tokens } from "../../theme";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",

}

// const phoneRegExp = 

const userSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().required("required"),
    // email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    // contact: yup.string().matches(phoneRegExp, "phone number is not valid").required("required"), validates phone number
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
})

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px"); /* Make screen Responsive */

    const handleFormSubmit = (values) => {
        console.log(values);
    }

    return <Box m="20px">
        <Header title="WORK ORDER" subtitle="Create Invoice" />

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    {/* /* allows to split the grid */}
                    <Box diplay="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}>
                        <Typography display="flex" variant="h4" justifyContent="space-between" sx={{ m: "50px 0 20px 0" }}>Customer Information</Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="First Name"
                            onBlur={handleBlur} /* changes color when clicked */
                            onChange={handleChange}
                            value={values.firstName} /* value that is changed when changed */
                            name="firstName"
                            error={!!touched.first && !!errors.firstName}
                            helperText={touched.firstName && errors.firstName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Last Name"
                            onBlur={handleBlur} /* changes color when clicked */
                            onChange={handleChange}
                            value={values.firstName} /* value that is changed when changed */
                            name="lastName"
                            error={!!touched.last && !!errors.lastName}
                            helperText={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Email"
                            onBlur={handleBlur} /* changes color when clicked */
                            onChange={handleChange}
                            value={values.email} /* value that is changed when changed */
                            name="email"
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Phone"
                            onBlur={handleBlur} /* changes color when clicked */
                            onChange={handleChange}
                            value={values.contactName} /* value that is changed when changed */
                            name="contact"
                            error={!!touched.contact && !!errors.contact}
                            helperText={touched.contact && errors.contact}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Address 1"
                            onBlur={handleBlur} /* changes color when clicked */
                            onChange={handleChange}
                            value={values.address1} /* value that is changed when changed */
                            name="address1"
                            error={!!touched.address1 && !!errors.address1}
                            helperText={touched.address1 && errors.address1}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Address 2"
                            onBlur={handleBlur} /* changes color when clicked */
                            onChange={handleChange}
                            value={values.address2} /* value that is changed when changed */
                            name="address2"
                            error={!!touched.address2 && !!errors.address2}
                            helperText={touched.address2 && errors.address2}
                            sx={{ gridColumn: "span 4" }}
                        />

                    </Box>

                </form>
            )}

        </Formik>
    </Box>

}


export default Form;