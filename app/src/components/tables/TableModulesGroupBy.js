import React, { useEffect, useMemo, useState } from "react";
import { useTable, useFilters, useGroupBy, useExpanded, usePagination, useRowSelect, useSortBy } from "react-table";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Autocomplete from '@mui/material/Autocomplete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux'
import FuseLoading from '@fuse/core/FuseLoading';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import InputLabel from '@mui/material/InputLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Table = ({ rowsProp, columnsProp, loading, funcionSetValue }) => {

  const [selectedRow, setSelectedRow] = useState('')
  const [valorSelect, setValorSelect] = useState('')
  const [valorDateStart, setValorDateStart] = useState('')
  const [valorDateEnd, setValorDateEnd] = useState('')

  const data = useMemo(
    () => rowsProp,
    [rowsProp]
  );

  const columns = useMemo(
    () => columnsProp
    ,
    [columnsProp]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    setData,
    prepareRow,
    setFilter,
    footerGroups,
    page,
    state: { pageIndex, pageSize, filters },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Puedes ajustar el tamaño de página inicial aquí
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );



  function funcionSeleccionaRow(row) {
    //SELECCION DE LA FILA
    setSelectedRow(row)
    //FUNCION QUE SELECCIONA LA FILA EN EL COMPONENTE PADRE
    if (funcionSetValue != undefined) {
      funcionSetValue(row.original?.id)
    }

  }

  function deleteFilterTable() {
    //SET VALORES VACIOS A LOS VARIABLES
    setValorSelect('')
    setValorDateStart('')
    setValorDateEnd('')
    //SET VACIO A LOS FILTERS
    columns.map(elemento => {
      setFilter(elemento['accessor'], "");
    })

    var autocompleteField = document.getElementById('select_list_table');
    autocompleteField.value = '';
  }

  const handleFilterChange = (e, columnId) => {
    setFilter(columnId, e);
  };

  const handleFilterChangeDate = (filterValue, columnId, tipoRegistro) => {
    if (filterValue != "") {
      if (tipoRegistro == "start") {
        setFilter(columnId, filterValue);
      }
      if (tipoRegistro == "end") {
        setFilter(columnId, filterValue);
      }
    }

  };

  const headerStyles = {
    fontWeight: 500,
    fontSize: "1.3rem",
    textAlign: "center",

    //width: "20px",
    //maxWidth: "20px",
    width: "12%",
    maxWidth: "12%",
  };

  const headerStylesText = {
    fontWeight: 500,
    fontSize: "1.3rem",
    textAlign: "center",

    //width: "1000px",
    //minWidth: "1000px"
    width: "64%",
    minWidth: "64%"
  };

  const rowStyles = {
    background: '#FFFFFF',
    cursor: 'pointer',
    height: "52px",
    maxHeight: "52px",
    verticalAlign: "middle",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  };

  const rowStylesSelected = {
    backgroundColor: "#FFE5E5",
    cursor: 'pointer',
    height: "52px",
    maxHeight: "52px",
    verticalAlign: "middle",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  }

  const containerStyles = {
    height: "60vh",
    overflow: "auto",
  };

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const headStyles = {
    height: "52px",
    maxHeight: "52px",
    position: "sticky",
    top: 0,
    zIndex: 1,
    background: "white",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  };

  const cellStyles = {
    width: "200px",
    maxWidth: "200px",
    overflow: "auto",
  };

  const cellStylesText = {
    width: "1px",
    maxWidth: "30px",
    overflow: "auto",
  };

  const footerStyles = {
    position: "sticky",
    bottom: 0,
    zIndex: 1,
    background: "white",
  };

  function CustomPagination() {
    const pageActual = pageIndex
    const pageCount = Math.ceil(rows.length / pageSize)

    return (
      <>
        <div style={{ display: "inline", float: "left", position: "relative" }}>
          <p>Records {(pageActual * pageSize) + 1} to {(pageActual * pageSize) + page.length} of {data.length}
            {filters && filters.length > 0 ? ' (filtered from ' + data.length + ' total entries)' : ''}</p>

          <Button style={filters && filters.length > 0 ? {} : { display: "none" }} size="small" variant="outlined" onClick={() => { deleteFilterTable(); }}>Delete filter</Button>
        </div>

        <div style={{ display: "inline", float: "right", position: "relative" }}>

          <FormControl variant="standard" >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageSize}
              label="Size"
              style={{ float: "right", position: "relative" }}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>

          <div style={{ display: "inline", float: "right", position: "relative" }}>
            <Pagination
              color="primary"
              count={pageCount}
              page={pageIndex + 1}
              onChange={(event, value) => {
                gotoPage(value - 1)
              }}
            />
          </div>
        </div>

      </>
    );
  }

  return (
    <>
      {/*loading == true ?
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
          sx={{ height: 40 }}
          style={loading == true ? {} : { display: "none" }}>
          <CircularProgress />
        </Box>
        :*/}
      <>
        <div style={containerStyles}>
          <table {...getTableProps()} style={tableStyles}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()} style={headStyles}>
                  {headerGroup.headers.map((column, i) => (
                    < th key={i} {...column.getHeaderProps(column.getSortByToggleProps())} style={column.render("type") != "array" ? headerStyles : headerStylesText}
                      className={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : ''}
                    >
                      {column.render("Header")}{column.isSorted ? (column.isSortedDesc ? <ExpandMoreIcon /> : <ExpandLessIcon />) : ''}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody
              {...getTableBodyProps()}
              style={rows.length < 10 ? { height: "60vh", overflowY: "auto" } : { height: "60vh", overflowY: "hidden" }}
              className="border-white"
            >
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: "center" }}>
                    No data
                  </td>
                </tr>
              ) : (
                <>
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        key={i}
                        {...row.getRowProps()}
                        onClick={() => funcionSeleccionaRow(row)}
                        style={row?.id == selectedRow?.id ? rowStylesSelected : rowStyles}>
                        {row.cells.map((cell, i) => {
                          const { column } = cell; // Obtener la columna a la que pertenece la celda

                          if (column?.type == "array") {

                            return (
                              <td {...cell.getCellProps()} style={cellStyles} className={"text-center"}>
                                <tr>
                                  {cell.value.map((value, i) => {
                                    return (
                                      <>
                                        <Tooltip title={value['aplication_name']} placement="top" key={i}>
                                          <th key={i}>{value['aplication_code']}</th>
                                        </Tooltip>
                                      </>
                                    );
                                  })}
                                </tr>
                                <tr>
                                  {cell.value.length == 0 ?
                                    <td>There aren´t requirements</td> :
                                    cell.value.map((value, i) => {

                                      if (value['cumplimiento'] == true) {
                                        return (
                                          <Tooltip title="Requirement fulfilled" placement="top" key={i}>
                                            <td {...cell.getCellProps()} style={cellStyles} className={"text-center"}>
                                              <CheckCircleIcon color="primary" />
                                            </td>
                                          </Tooltip>
                                        );
                                      }

                                      if (value['cumplimiento'] == false && value['cumplimientoSinValorExtra'] == true) {
                                        return (
                                          <Tooltip title="The requirement is in place but the target is not reached." placement="top" key={i}>
                                            <td {...cell.getCellProps()} style={cellStyles} className={"text-center"}>
                                              <InfoIcon color="primary" />
                                            </td>
                                          </Tooltip>
                                        );
                                      }

                                      if (value['cumplimiento'] == false && value['cumplimientoSinValorExtra'] == false) {
                                        return (
                                          <Tooltip title="Requirement is not met." placement="top" key={i}>
                                            <td {...cell.getCellProps()} style={cellStyles} className={"text-center"}>
                                              <CancelIcon color="primary" />
                                            </td>
                                          </Tooltip>
                                        );
                                      }
                                    })}
                                </tr>

                              </td>
                            );
                          }
                          else {
                            return (
                              <Tooltip title={cell.render("Cell")} key={i}>
                                <td {...cell.getCellProps()} style={cellStylesText} className={"text-center"}>
                                  {cell.value?.toString()?.length > 100 ? cell.value?.toString()?.substring(0, 100) + "..." : cell.render("Cell")}
                                </td>
                              </Tooltip>
                            );
                          }

                        })}
                      </tr>
                    );
                  })}
                  {page.length < pageSize && (
                    /*<tr style={rows.length > 10 ? { height: `${52 * (pageSize - page.length)}px` } : { height: `${52 * (10 - rows.length)}px` } }>*/
                    <tr style={page.length > 10 ? { height: '52px' } : { height: `${52 * (10 - page.length)}px` }}>
                      <td colSpan={columns.length}></td>
                    </tr>
                  )}
                </>
              )}
            </tbody>

            <tfoot>
              {footerGroups?.map((group, i) => (
                <tr {...group.getFooterGroupProps()} key={i}>
                  {group.headers.map(column => (
                    <td {...column.getFooterProps()} className={"text-center"}>{column.render('Footer')}</td>
                  ))}
                </tr>
              ))}
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={footerStyles} key={i}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className={"text-center"}>
                      <div style={column.type == "string" ? {} : { display: 'none' }}>
                        <TextField
                          label={column.render("Header")}
                          id={column.render("Header")}
                          value={column.filterValue || ""}
                          size="small"
                          fullWidth
                          onChange={(e) => handleFilterChange(e.target.value, column.id)}
                        />
                      </div>

                      <div style={column.type == "list" ? {} : { display: 'none' }}>

                        <Autocomplete
                          id="select_list_table"
                          imputValue={filters.length <= 0 ? '' : {}}
                          options={[...new Set(data.map(obj => obj[column.render("id")]))]}
                          getOptionLabel={(option) =>
                            option != '' ? option : ''
                          }
                          //onChange={(event, value) => setSubMisionNuevaPermanente(value)}
                          onChange={(event, value) => { handleFilterChange(value, column.id), setValorSelect(value) }}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              id="select_list_table"
                              label={column.render("Header")}
                              placeholder={column.render("Header")}
                              size="small"
                              fullWidth
                            />
                          )}
                        />
                      </div>

                      <div style={column.type == "date" ? {} : { display: 'none' }}>
                        <FormControl variant="outlined" size="small" style={{ width: '100%' }}>
                          <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Date"
                              size="small"
                              fullWidth
                              id="date"
                              inputFormat="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              value={valorDateStart}
                              onChange={(newValue) => {
                                if (newValue != "Invalid Date" && newValue != null) {
                                  let fechaseleccionada = newValue.toISOString()
                                  let arrayFecha = fechaseleccionada.split("T")
                                  handleFilterChangeDate(arrayFecha[0], column.id, "start");
                                  setValorDateStart(arrayFecha[0])
                                }
                                else {
                                  handleFilterChangeDate("", column.id, "start");
                                }
                              }}
                              renderInput={(params) =>
                                <TextField
                                  {...params}
                                  size="small"
                                  fullWidth
                                />
                              }
                            />
                          </LocalizationProvider>

                        </FormControl>


                      </div>
                    </th>
                  ))}
                </tr>
              ))}

            </tfoot>
          </table>
        </div>

        <div style={{ marginTop: '5px' }}>
          {CustomPagination()}
        </div>
      </>

    </>
  );
};

export default Table;
