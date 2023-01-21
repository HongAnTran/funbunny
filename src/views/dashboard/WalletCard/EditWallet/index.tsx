import React from "react";
import { Wallet } from "../../../../types/main";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import PriceFormat from "../../../../ui-component/extended/PriceFormat";
import { updateDocController } from "../../../../controllers/common";

function EditWallet({ data }: { data: Wallet }) {
  const theme: any = useTheme();

  function convertPriceStringToNumber(priceString: string  | number) : number{
    if ( typeof priceString === "number"){
      return priceString
    }

      priceString.trim().replaceAll(',','')
      return Number(priceString)
  }
  
  const updateWalletController = (value: Wallet) =>{

      const cash = convertPriceStringToNumber(value.cash)
      const saving = convertPriceStringToNumber(value.saving)

      const total = cash + saving

      const dataUpdate : Wallet = {
        ...value,
        cash , 
        saving,
        total,
      }
      updateDocController("wallet",dataUpdate,dataUpdate.uid)
  }

  return (
    <div>
      <Formik
        initialValues={data}
        validationSchema={Yup.object().shape({
            cash: Yup.string().required('Vui lòng nhập trường này').max(100),
           
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
           
            updateWalletController(values)
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            // setErrors({ submit: err });
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
          <form noValidate onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(touched.cash && errors.cash)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Cash
              </InputLabel>

              <PriceFormat
                isSuffix={false}
                customInput={OutlinedInput}
                label="Cash"
                inputProps={{}}
                id="outlined-adornment-email-login"
                value={values.cash}
                
                type="input"
                name="cash"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.cash && errors.cash && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.cash}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.saving && errors.saving)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
              Saving
              </InputLabel>

              <PriceFormat
                isSuffix={false}
                customInput={OutlinedInput}
                label="saving"
                inputProps={{}}
                id="outlined-adornment-email-login"
                value={values.saving}
                type="input"
                name="saving"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.saving && errors.saving && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.saving}
                </FormHelperText>
              )}
            </FormControl>
        
            {/* {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )} */}

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
                  {isSubmitting ? <CircularProgress size={30} /> : "Save"}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditWallet;
