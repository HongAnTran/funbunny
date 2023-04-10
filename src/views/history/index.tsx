import { useState } from 'react';



import { gridSpacing } from '../../constans/constant';
// material-ui
import {  Avatar, Breadcrumbs,   Grid, TextField, Typography, useMediaQuery, useTheme, } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Stack } from "@mui/system";

import useGetDocs from "hooks/usegGetDocs";
import { Transaction, } from "types/main";
import { calculateMillisecondDate } from "controllers/date";
import MainCard from "ui-component/cards/MainCard";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { IconDeviceAnalytics} from '@tabler/icons';
import {  deleteTransactionController } from "controllers/transaction/transaction";
import { useAuthContext } from 'hooks';
import CategoryTransaction from 'ui-component/extended/CategoryTransaction';
import FormatTime from 'ui-component/extended/FormatTime';
import PriceFormat from 'ui-component/extended/PriceFormat';
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import VisibilityIcon from '@mui/icons-material/Visibility';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MainDialog from 'ui-component/dialog/MainDialog';
// ==============================|| DEFAULT DASHBOARD ||============================== //



  

  
  interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
    sm? : boolean;
  }
  
  const headCells: readonly HeadCell[] = [
    {
      id: 'idCategory',
      numeric: false,
      disablePadding: true,
      label: 'Danh mục',
    },
    {
      id: 'date',
      numeric: true,
      disablePadding: false,
      label: 'Ngày thêm',
      sm : false
    },
    {
      id: 'value',
      numeric: true,
      disablePadding: false,
      label: 'Số tiền',
    },
    {
      id: 'xem-sua',
      numeric: true,
      disablePadding: false,
      label: 'Xem / Sửa',
    },

  ];
  
  interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
  }
  
  function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount, } = props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              <Typography variant="h5" >{headCell.label}</Typography>
       
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  

const History = () => {
    const { user } = useAuthContext();
    const [dateFrom, setDateFrom] = useState<number>(calculateMillisecondDate(1));
    const [dateTo, setDateTo] = useState<number>(new Date().getTime());
    const theme: any = useTheme();
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openView, setOpenView] = useState<boolean>(false);
    const [dataView, setDataView] = useState<Transaction>({} as Transaction);

    const matchDownsm = useMediaQuery(theme.breakpoints.down('sm'));
  const navigation = useNavigate()
    const [transactions] = useGetDocs<Transaction>(
        "transactions",
        [],
        [
          {
            fieldname: "uid",
            operation: "==",
            value: user.uid,
          },
          {
            fieldname: "date.time",
            operation: ">=",
            value: dateFrom,
          },
          {
            fieldname: "date.time",
            operation: "<=",
            value: dateTo,
          },
        ],
          25,
        {
          type: "desc",
          field: "date.time",
        }
      );

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = transactions.map((n) => n._id || '');
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event: React.MouseEvent<unknown>, name: string | undefined) => {
      if(name){
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
      }

    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  

    const isSelected = (name: string | undefined ) =>{
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if(name) { return selected.indexOf(name) !== -1; }
    }  
   
      
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

 
    return (
      <>
        <Grid container spacing={gridSpacing}>
        <Grid item md={12} sm={12} lg={12} xs={12}>
          <MainCard>
        <Breadcrumbs aria-label="breadcrumb">
            <IconDeviceAnalytics  style={{marginRight:6 , marginTop:4}} fontSize="inherit"  />
          <Typography
            variant="h3"
            textTransform="uppercase"
            > 
            Lịch sử giao dịch
          </Typography>
        </Breadcrumbs>
              </MainCard>
      </Grid>
   
          <Grid item md={12} sm={12} lg={12} xs={12}>
            <MainCard content={true}>
              <Grid container spacing={gridSpacing}>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <Stack spacing={2} direction="row">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        inputFormat="DD/MM/YYYY"
                        value={dateFrom}
                        onChange={(newValue: any) => {
                          setDateFrom(new Date(newValue)?.getTime());
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ArrowRightAltIcon />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        inputFormat="DD/MM/YYYY"
                        value={dateTo}
                        onChange={(newValue: any) => {
                          setDateTo(new Date(newValue)?.getTime());
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
           <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
       

        <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            
          </Typography>
        )}
        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={() =>{
              (async () => {
                for await (const idTransaction of selected) {
                    const tran = transactions.find((item) => item._id === idTransaction)
                    if(tran){
                      await deleteTransactionController(tran, idTransaction)
                    }
                }
                alert('Xóa thành công')
                // eslint-disable-next-line no-restricted-globals
                location.reload()
              })()
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <>
          
          </>
        )}
      </Toolbar>
        <TableContainer>
          <Table
            
            aria-labelledby="tableTitle"
            size="medium"
          >
          {matchDownsm ?  null :<EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={transactions.length}
            /> }  
            <TableBody>
              {
                transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(event) => handleClick(event, row._id)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <CategoryTransaction idCategory={row.idCategory} type={row.typeTransaction} ></CategoryTransaction>
                      </TableCell>
                      {matchDownsm ?  null : <TableCell align="right"><FormatTime time={row.date.time}  /></TableCell>}  
                      <TableCell align="right">
                        <PriceFormat value={row.value}/>
                      {row.typeTransaction === "income" ? (
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 16,
                            height: 16,
                            display:'inline-flex',
                            borderRadius: "5px",
                            backgroundColor:
                              theme.palette.success.light,
                            color: theme.palette.success.dark,
                            ml:1
                          }}
                        >
                          <KeyboardArrowUpOutlinedIcon
                            fontSize="small"
                            color="inherit"
                          />
                        </Avatar>
                      ) : (
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 16,
                            display:'inline-flex',

                            height: 16,
                            borderRadius: "5px",
                            ml:1,

                            backgroundColor:
                              theme.palette.orange.light,
                            color: theme.palette.orange.dark,
                        
                          }}
                        >
                          <KeyboardArrowDownOutlinedIcon
                            fontSize="small"
                            color="inherit"
                          />
                        </Avatar>
                      )}
                      </TableCell>
                      <TableCell align="right"> 
                      <IconButton 
                      onClick={(e) =>{
                        e.preventDefault() 
                        setDataView(row)
                        setOpenView(true)
                       
                      }
                      }
                      >
                      <VisibilityIcon />
                      </IconButton>

                      <IconButton onClick={(e) =>{
                        e.preventDefault() 
                        navigation(`/edit-transaction/${row._id}`)}}>
                      <EditIcon  />
                      </IconButton>
                       </TableCell>
               
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height:  53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    
    </Box>
                </Grid>
         
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
        <MainDialog open={openView} setOpen={setOpenView}  title="Xem giao dịch" >
                {/* <EditWallet data={walletvalue} setOpen={setOpenEdit}/> */}
                <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <CategoryTransaction  idCategory={dataView?.idCategory} type={dataView?.typeTransaction}></CategoryTransaction>
        </Typography>
    
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <FormatTime time={dataView?.date?.time} ></FormatTime>
        </Typography>
        <Typography variant="body2">
          <PriceFormat value={dataView?.value}></PriceFormat>
        </Typography>
        <Typography variant="body2">
                  {dataView?.note}
        </Typography>
      </CardContent>
    
    </Card>
             </MainDialog>   
        </>
    );
};

export default History;
