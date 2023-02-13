import React from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik';

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    CircularProgress 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
function AddTransactionsForm() {
    const theme : any= useTheme();


  return (
    <Formik
    initialValues={{
        email: '',
        password: '',
        submit: null
    }}
    validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
    })}
    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            console.log(values);
                setStatus({ success: true });
                setSubmitting(false);
            
        } 
        catch (err :any) {
                setStatus({ success: false });
                setErrors({ submit: err });
                setSubmitting(false)
            
        }
    }}
>
    {
    ( { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values  }) =>
     (
        <form noValidate onSubmit={handleSubmit} >
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email Address / Username"
                    inputProps={{}}
                />
                {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.email}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{ ...theme.typography.customInput }}
            >
                <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-login"
                    type="text"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                   
                    label="Password"
                    inputProps={{}}
                />
                {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.password}
                    </FormHelperText>
                )}
            </FormControl>
            {errors.submit && (
                <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
            )}

            <Box sx={{ mt: 2 }}>
                <AnimateButton>
                    <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        { isSubmitting ? <CircularProgress size={30} /> : 'Add'}
                    </Button>
                </AnimateButton>
            </Box>
        </form>
    )
    }

</Formik>
  )
}

export default AddTransactionsForm