import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { Category, Transaction, TypeTransaction } from "types/main";
import PriceFormat from "ui-component/extended/PriceFormat";

import { toast, ToastContainer } from "react-toastify";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Select,
  MenuItem,
  TextareaAutosize,
  ListItemIcon,
  ListItemText,

} from "@mui/material";

import { expenseCategory, incomeCategory } from "constans/categories";
// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { addTransactionController, editTransactionController } from "controllers/transaction/transaction";
import { convertPriceStringToNumber } from "controllers/common";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


function FormTransaction( {typeForm , data  , id} : { typeForm: 'add' | 'edit' , data : Transaction , id? : string }  ) {
    const theme: any = useTheme();
    const [tran, setTran] = useState<TypeTransaction>("spending");
    const [categories, setCategories] = useState<Category[]>(expenseCategory);
    useEffect(() => {
      if (tran === "income") {
        setCategories(incomeCategory);
      } else {
        setCategories(expenseCategory);
      }
    }, [tran]);
  return (
    <>
          <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
  
    <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          value: Yup.string().required("vui l??ng nh???p gi?? tr???"),
          typeTransaction: Yup.string().required("Vui l??ng ch???n nh??m"),
          idCategory: Yup.string().required("Vui l??ng ch???n danh m???c"),
          wallet: Yup.string().required("Vui l??ng ch???n v??"),
        })}
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting, resetForm }
        ) => {
          try {
            values.value = convertPriceStringToNumber(values.value);

            if(typeForm ==='add'){
                await addTransactionController(values);

            }else{
                if(id){
                    await editTransactionController(values ,id );
                }

            }
            toast(typeForm === 'add' ?  "Th??m giao d???ch th??nh c??ng" : "C???p nh???p giao d???ch th??nh c??ng", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setStatus({ success: true });
            setSubmitting(false);
            resetForm();
          } catch (err: any) {
            setStatus({ success: false });
            // setErrors({ submit: err });

            setSubmitting(false);
            toast.error(typeForm === 'add' ?  `Th??m giao d???ch th???t b??i ${err} ` : `C???p nh???p giao d???ch th???t b??i ${err}` , {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
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
          setValues,
          setFieldValue,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <InputLabel htmlFor="outlined-adornment-email-login">
                  gi?? tr???
                </InputLabel>
                <FormControl
                  fullWidth
                  error={Boolean(touched.value && errors.value)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <PriceFormat
                    isSuffix={false}
                    customInput={OutlinedInput}
                    inputProps={{}}
                    id="outlined-adornment-email-login"
                    value={values.value}
                    type="input"
                    name="value"
                    onBlur={handleBlur}
                    onChange={handleChange}
                allowNegative={false}

                  />
                  {touched.value && errors.value && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.value}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <InputLabel htmlFor="outlined-adornment-email-login">
                  nh??m
                </InputLabel>
                <FormControl
                  fullWidth
                  error={Boolean(
                    touched.typeTransaction && errors.typeTransaction
                  )}
                  sx={{ ...theme.typography.customInput }}
                >
                  {/* <InputLabel id="demo-simple-select-label">Ch???n nh??m</InputLabel> */}
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="typeTransaction"
                      value={values.typeTransaction}
                      onChange={(e) => {
                        setTran(e.target.value as TypeTransaction);
                        if(e.target.value ==='income'){
                          setFieldValue("idCategory" , incomeCategory[0].id);
                        }else{
                          setFieldValue("idCategory" , expenseCategory[0].id);
                        }
                        return handleChange(e);
                      }}
                    >
                      <MenuItem value="spending">ti??u x??i</MenuItem>
                      <MenuItem value="income">thu nh???p</MenuItem>
                    </Select>
                  </FormControl>
                  {touched.typeTransaction && errors.typeTransaction && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.typeTransaction}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <InputLabel htmlFor="outlined-adornment-email-login">
                  Danh m???c
                </InputLabel>
                <FormControl
                  fullWidth
                  error={Boolean(
                    touched.typeTransaction && errors.typeTransaction
                  )}
                  sx={{ ...theme.typography.customInput }}
                >
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="idCategory"
                      value={values.idCategory ? values.idCategory : categories[0].id}
                      onChange={handleChange}
                    >
                      {categories.map((cate) => {
                        return (
                          <MenuItem key={cate.id} value={cate.id}>
                            <ListItemIcon>
                              <img width={26} src={cate.icon} alt={cate.name} />
                            </ListItemIcon>
                            <ListItemText> {cate.name}</ListItemText>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {touched.idCategory && errors.idCategory && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.idCategory}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <InputLabel htmlFor="outlined-adornment-email-login">
                  V??
                </InputLabel>
                <FormControl
                  fullWidth
                  error={Boolean(touched.wallet && errors.wallet)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <FormControl fullWidth>
               
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="wallet"
                      value={values.wallet}
                      onChange={handleChange}
                      // multiple
                    >
                

                      <MenuItem value="cash">Ti???n m???t</MenuItem>
                      <MenuItem value="saving">Ti???t ki???m</MenuItem>
                    </Select>
                  </FormControl>
                  {touched.wallet && errors.wallet && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.wallet}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
         
              <Grid item md={4}>
                <InputLabel htmlFor="outlined-adornment-email-login">
                  Ng??y th??ng
                </InputLabel>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        inputFormat="DD/MM/YYYY HH:mm a"
                        value={values?.date.time}
                      
                        onChange={(newValue : any) => {
                            setFieldValue('date',{
                              time: new Date(newValue)?.getTime(),
                              date:new Date(newValue),
                              day: new Date(newValue)?.getDate(),
                              month: new Date(newValue)?.getMonth()+1,
                              year: new Date(newValue)?.getFullYear(),
                              
                            })
                         
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <InputLabel htmlFor="outlined-adornment-email-login">
                  Gh?? ch??
                </InputLabel>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      placeholder="ghi ch??"
                      maxRows={5}
                      minRows={3}
                      value={values.note}
                      name="note"
                      onChange={handleChange}
                    />
                  </FormControl>
                </FormControl>
              </Grid>
            </Grid>
        
            <Box sx={{ mt: 2 }}>
             
              <Button
                disableElevation
                disabled={isSubmitting}
            
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                {isSubmitting ? (
                  <CircularProgress size={30} />
                ) : (
                    typeForm === 'add' ?  "Th??m giao d???ch" : "C???p nh???p giao d???ch"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </>
  )
}

export default FormTransaction