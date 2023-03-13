import React from "react";
import { Transaction, Wallet } from "types/main";
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
import AnimateButton from "ui-component/extended/AnimateButton";
import PriceFormat from "ui-component/extended/PriceFormat";
import { convertPriceStringToNumber } from "controllers/common";
import { addTransactionController } from "controllers/transaction/transaction";
import { useAuthContext } from "hooks";
import { useTranslation } from "react-i18next";

function EditWallet({ data , setOpen }: { data: Wallet ,setOpen : React.Dispatch<React.SetStateAction<boolean>> }) {
  const theme: any = useTheme();
  const { user } =  useAuthContext()
  const { t } = useTranslation()
  return (
    <div>
      <Formik
        initialValues={data}
        validationSchema={Yup.object().shape({
            cash: Yup.string().required(t('validate.required') || 'Vui lòng nhập trường này').max(100),
            saving: Yup.string().required(t('validate.required') || 'Vui lòng nhập trường này').max(100),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const cash = convertPriceStringToNumber(values.cash)
            const saving = convertPriceStringToNumber(values.saving)
            if(cash !== data.cash){
              let dataTran : Transaction = {
        
                uid:user.uid,
                value :cash - data.cash,
                typeTransaction : 'income',
                idCategory :"thu-nhap-khac",
                wallet : 'cash',
                note : 'Chỉnh sửa ví',
                imageDescription : '',               
                date :{
                  date : new Date(),
                  day : new Date().getDate(),
                  year : new Date().getFullYear(),
                  month : new Date().getMonth() + 1,
                  time : new Date().getTime()
                }
              }
  
           if ( cash < data.cash){
                dataTran.typeTransaction = 'spending'
                 dataTran.idCategory = "chi-phi-khac"
                dataTran.value  = data.cash - cash

             }
             await addTransactionController(dataTran)
            }

            if(saving !== data.saving){
              let dataTran : Transaction = {
             
                uid:user.uid,
                value :saving - data.saving,
                typeTransaction : 'income',
                idCategory :"thu-nhap-khac",
                wallet : 'saving',
                note : 'Chỉnh sửa ví',
                imageDescription : '',               
                date :{
                  date : new Date(),
                  day : new Date().getDate(),
                  year : new Date().getFullYear(),
                  month : new Date().getMonth() + 1,
                  time : new Date().getTime()
                }
              }
  
           if ( saving < data.saving){
                dataTran.typeTransaction = 'spending'
                dataTran.idCategory = "chi-phi-khac"
                dataTran.value  = data.saving- saving
             }
            await  addTransactionController(dataTran)
            }
    
            setOpen(false)
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
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
                {t('common.cash')}
              </InputLabel>

              <PriceFormat
                isSuffix={false}
                customInput={OutlinedInput}
                label="Cash"
                inputProps={{}}
                id="outlined-adornment-email-login"
                value={values.cash}
                allowNegative={false}
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
              {t("common.saving")}
                
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
                allowNegative={false}

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
                  {isSubmitting ? <CircularProgress size={30} /> : t('common.save')}
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
