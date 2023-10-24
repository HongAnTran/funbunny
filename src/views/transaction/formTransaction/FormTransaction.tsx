import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { Category, Transaction, TypeTransaction } from "types/main";
import PriceFormat from "ui-component/extended/PriceFormat";

import { toast } from "react-toastify";
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
    const [tran, setTran] = useState<TypeTransaction>(data.typeTransaction);
    const [categories, setCategories] = useState<Category[]>(()=>{
      if(data.typeTransaction === 'spending'){
        return expenseCategory
      }else if (data.typeTransaction ==='income'){
        return incomeCategory
      }
      else return expenseCategory
    });
  const dataPrev :Transaction = {...data}
    useEffect(() => {

      if (tran === "income") {
        setCategories(incomeCategory);
      } else {
        setCategories(expenseCategory);
      }
    }, [tran ]);
  return (
    <>

  
    <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          value: Yup.string().required("vui lòng nhập giá trị"),
          typeTransaction: Yup.string().required("Vui lòng chọn nhóm"),
          idCategory: Yup.string().required("Vui lòng chọn danh mục"),
          wallet: Yup.string().required("Vui lòng chọn ví"),
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
                
                    await editTransactionController(values ,id , dataPrev);
                }

            }
            toast(typeForm === 'add' ?  "Thêm giao dịch thành công" : "Cập nhập giao dịch thành công", {
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
            toast.error(typeForm === 'add' ?  `Thêm giao dịch thất bài ${err} ` : `Cập nhập giao dịch thất bài ${err}` , {
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
                  giá trị
                </InputLabel>
                <FormControl
                  fullWidth
                  error={Boolean(touched.value && errors.value)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <PriceFormat
                  
                    isSuffix={false}
                    customInput={OutlinedInput}
                    inputProps={{
                      sx:{padding : '15px'}
                    }}
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
                  nhóm
                </InputLabel>
                <FormControl
                  fullWidth
                  error={Boolean(
                    touched.typeTransaction && errors.typeTransaction
                  )}
                  sx={{ ...theme.typography.customInput }}
                >
                  {/* <InputLabel id="demo-simple-select-label">Chọn nhóm</InputLabel> */}
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
                      <MenuItem value="spending">tiêu xài</MenuItem>
                      <MenuItem value="income">thu nhập</MenuItem>
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
                  Danh mục
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
                      value={values.idCategory}
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
                  Ví
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
                

                      <MenuItem value="cash">Tiền mặt</MenuItem>
                      <MenuItem value="saving">Tiết kiệm</MenuItem>
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
                  Ngày tháng
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
                  Ghi chú
                </InputLabel>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <FormControl fullWidth>
             
                      <TextField
          id="filled-multiline-flexible"
       
          // placeholder="ghi chú"
          value={values.note}
          multiline
          maxRows={4}
          variant="filled"
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
                    typeForm === 'add' ?  "Thêm giao dịch" : "Cập nhập giao dịch"
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