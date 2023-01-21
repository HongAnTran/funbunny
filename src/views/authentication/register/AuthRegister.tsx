import { useState } from "react";
import { useSelector } from "react-redux";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
  CircularProgress 
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

import AnimateButton from "../../../ui-component/extended/AnimateButton";

import {
  strengthColor,
  strengthIndicator,
} from "../../../utils/password-strength";

// firebase
import { createUserWithEmailAndPassword  ,updateProfile} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { RootState } from "../../../redux/store";
import Google from '../../../assets/images/icons/social-google.svg';

// controler
import {  setDocController } from "../../../controllers/common";
import { Wallet } from "../../../types/main";
import { registerWithGoogleFirebase } from "controllers/authen";

// ===========================|| FIREBASE - REGISTER ||=========================== //

interface InitValueRegister{
  name: string
  email: string
  password: string
  submit: null
}

const FirebaseRegister = ({ ...others }) => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state: RootState) => state.custom);

  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<number>(0);
  const [level, setLevel] = useState<{label: string ; color: string}>({label:'Poor' ,color:'#f44336'});

  // const navigation = useNavigate()
  const initializeValue :  InitValueRegister = {name: "",email: "",password: "",submit: null}

  const googleHandler = async () => {
    await registerWithGoogleFirebase()

  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const changePassword = (value: any) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };


  const handleRegisterUser = async (values :InitValueRegister)=> {
    try {
      const { user } =  await createUserWithEmailAndPassword(auth, values.email, values.password)
      await updateProfile(user,{ displayName:values.name})
 
      //initialization a wallet defaul , id equal uid
      await setDocController<Wallet>('wallet',{ uid:user.uid,total : 0,cash:0,saving:0} , user.uid)
      
    } catch (error : any) {
        console.error(error.code)
        throw new Error(error)
    }
  }

  return (
    <>
      <Formik
        initialValues={initializeValue}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required").min(6, "Password must be at least 6 characters"),
          name: Yup.string().max(255).required("Full name is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            
              await  handleRegisterUser(values)
              setStatus({ success: true });
              setSubmitting(false);
           
          } catch (err: any) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.name && errors.name)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-register" required>
                Full Name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.name && errors.name&& (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
                >
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-register" required>
                Email Address / Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-register" required>
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-register"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ width: 85, height: 8, borderRadius: "7px" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            {/* <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid> */}
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
                   { isSubmitting ? <CircularProgress size={30} /> : 'Sign up'}

                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <Grid item xs={12}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`,
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
      <Grid item xs={12}>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={googleHandler}
              size="large"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign up with Google
            </Button>
          </AnimateButton>
        </Grid>
     
    </>
  );
};

export default FirebaseRegister;
