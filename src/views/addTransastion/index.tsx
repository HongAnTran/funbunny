import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import "./style.css";
import { Category, Transaction, TypeTransaction } from "types/main";
import PriceFormat from "ui-component/extended/PriceFormat";

import { toast, ToastContainer } from "react-toastify";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useAuthContext } from "hooks";
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
  Breadcrumbs,
  Typography,
} from "@mui/material";

import { expenseCategory, incomeCategory } from "constans/categories";
// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { addTransactionController } from "controllers/transaction/transaction";
import { convertPriceStringToNumber } from "controllers/common";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { Link } from "react-router-dom";
function AddTransaction() {
  const theme: any = useTheme();
  const [tran, setTran] = useState<TypeTransaction>("spending");
  const { user } = useAuthContext();
  const [categories, setCategories] = useState<Category[]>(expenseCategory);
  const initValueTransactions = useMemo(() => {
    const initValueTransactions: Transaction = {
      uid: user.uid,
      value: 0,
      typeTransaction: "spending",
      idCategory: categories[0].id,
      wallet: "cash",
      note: "",
      imageDescription: "",
      date:{
        time: new Date().getTime(),
        date:new Date(),
        day: new Date().getDate(),
        month: new Date().getMonth()+1,
        year: new Date().getFullYear(),
      }
    };
    return initValueTransactions;
  }, [categories, user]);

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
    <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Bảng điều khiển
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Thêm giao dịch
        </Typography>
      </Breadcrumbs>
      <div>
        <h1>Thêm giao dịch</h1>
      </div>
      <Formik
        initialValues={initValueTransactions}
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

            await addTransactionController(values);
            toast("Thêm giao dịch thành công", {
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
            toast.error(`Thêm giao dịch thất bài ${err} `, {
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
                    inputProps={{}}
                    id="outlined-adornment-email-login"
                    value={values.value}
                    type="input"
                    name="value"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                        setFieldValue("idCategory", "");
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
                        value={values.date.date}
                        // name="date"
                        onChange={(newValue : any) => {
                            setFieldValue('date',{
                              time: new Date(newValue)?.getTime(),
                              date:new Date(newValue),
                              day: new Date(newValue)?.getDate(),
                              month: new Date(newValue)?.getMonth()+1,
                              year: new Date(newValue)?.getFullYear(),
                              
                            })
                          // setFieldValue("date", newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <InputLabel htmlFor="outlined-adornment-email-login">
                  Ghí chú
                </InputLabel>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      placeholder="ghi chú"
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
                  "Thêm giao dịch"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default AddTransaction;
