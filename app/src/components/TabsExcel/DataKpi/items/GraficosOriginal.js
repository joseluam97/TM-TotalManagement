//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ComputerIcon from '@mui/icons-material/Computer';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import { Chart } from "react-google-charts";
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarExport,
  GridToolbarDensitySelector
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  obtenerDatosGraficosKpiByMisionAPIAction,
  obtenerDatosGraficosOTDKpiByMisionAPIAction,
  obtenerDatosGraficosKpiAPIAction,
  obtenerDatosGraficosOTDKpiAPIAction
} from './store/actions'

import {
  getSesionActualAPIAction,
  getPermisosSesionActualAPIAction

} from '../../../Managment/Users/store/actions'

//Modales importaciones
import { getCookie } from 'app/js/generalFunctions'
import ModalInsertar from '../modals/insertar.js'

const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});

{/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */ }



// import {
//   Chart as ChartJS,
//   CategoryScale,
//   registerables 

// } from "chart.js";
// ChartJS.register(...registerables);
// ChartJS.defaults.color = '#2C2C2C'
// ChartJS.defaults.borderColor = '#2C2C2C'
// ChartJS.defaults.defaultFontFamily = "'Roboto', sans-serif";
// ChartJS.defaults.font.size = 15 ;
// ChartJS.defaults.borderWidth= 40;
// ChartJS.register(CategoryScale)






{/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */ }


//**********************END_IMPORTACIONES ***********************/

import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export let dataChar1 = [];

const initSeries = {
  0: {
    hidden: false,
    color: "blue",
    altColor: "transparent",
    lineWidth: 2,
    type: "bars",
    isVisible: false,
  },
  1: {
    hidden: false,
    color: "orange",
    altColor: "transparent",
    lineWidth: 2,
    type: "line",
    isVisible: false
  }
};

export default function Graficos() {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


  const DISPLAY = true;
  const BORDER = true;
  const CHART_AREA = true;
  const TICKS = true;

  const options = {
    elements: {
      point: {
        pointRadius: 3,
        // borderWidth:10
      },
      line: {
        // borderWidth:10,
        tension: 0.5,
      },
    },

    responsive: true,

    options: {
      plugins: {},
    },
    plugins: {
      legend: {
        display: "none",
        position: "top",
        align: "center",
        labels: {
          // This more specific font property overrides the global property
          font: {
            // size: 14,
            // family: "'Roboto', sans-serif",
          },
        },
      },
      paddingBelowLegends: true,
    },

    scales: {
      x: {
        border: {
          display: true
        },
        grid: {
          color: function (context) {
            if (context?.tick?.value === 0) {
              return 'rgb(224, 224, 224)';
            }
            // console.log(context?.tick?.value);
            // return 
          },
        },
      },
      y: {
        border: {
          display: true
        },
        grid: {
          color: function (context) {
            if (context?.tick?.value === 0) {
              return 'rgb(224, 224, 224)';
            }

            console.log("🚀 ~ file: Graficos.js:228 ~ Graficos ~ context?.tick?.index:", context?.tick?.value)
          },
        },

      },

    },
    maintainAspectRatio: false,
  };








  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!







  const dispatch = useDispatch()
  const navigate = useNavigate();
  const classes = useStyles();

  const [series, setSeries] = useState(initSeries);

  const optionsCharOTD = {
    title: "OTD KPI data",
    vAxis: { title: "Gap with due date" },
    //hAxis: { title: "Month" },
    //seriesType: "bars",
    series: series,
    legend: { position: 'bottom' },
    bar: { groupWidth: "50%" }
  };

  const optionsCharOQD = {
    title: "OQD KPI data",
    vAxis: { title: "Performance" },
    //hAxis: { title: "Month" },
    //seriesType: "bars",
    series: series,
    legend: { position: 'bottom' },
  };

  const [verContenido, setVerContenido] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingOTD, setLoadingOTD] = useState(false);
  const [loadingOQD, setLoadingOQD] = useState(false);

  const [visibleGraficosKPI, setVisibleGraficosKPI] = useState(false);

  const [contenidoGraficoOQD, setContenidoGraficoOQD] = useState([])
  const [contenidoGraficoOTD, setContenidoGraficoOTD] = useState([])

  const [disabledNewDataKpi, setDisabledNewDataKpi] = useState(true)
  const [disabledEditDataKpi, setDisabledEditDataKpi] = useState(true)
  const [disabledRemoveDataKpi, setDisabledRemoveDataKpi] = useState(true)

  //Obtener los states de Redux
  const valorTab = useSelector(state => state.fuse.gestionDataKpiComponent.valorTab)
  const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
  const kpiListAPI = useSelector(state => state.fuse.kpiComponent.kpiListAPI)
  const dataKpiListAPI = useSelector(state => state.fuse.dataKpiComponent.dataKpiListAPI)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.dataKpiComponent.filaSeleccionadaGrid)
  //DATOS GENERALES DE LOS GRAFICOS DE MISION
  const datosGraficosOTD = useSelector(state => state.fuse.dataKpiComponent.datosGraficosOTD)
  const datosGraficosOQD = useSelector(state => state.fuse.dataKpiComponent.datosGraficosOQD)

  const visibilidadModalInsertar = useSelector(state => state.fuse.dataKpiComponent.visibilidadModalInsertar)
  const insertadoDataKpi = useSelector(state => state.fuse.dataKpiComponent.insertadoDataKpi)

  const kpiSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.kpiSeleccionado)
  const misionSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.misionSeleccionado)
  const anoSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.anoSeleccionado)

  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  const obtenerDatosGraficosKpi = (mision, anoSelect) => dispatch(obtenerDatosGraficosKpiAPIAction(mision, anoSelect))
  const obtenerDatosGraficosOTDKpi = (mision, anoSelect) => dispatch(obtenerDatosGraficosOTDKpiAPIAction(mision, anoSelect))

  const obtenerDatosGraficosKpiByMision = (mision, anoSelect) => dispatch(obtenerDatosGraficosKpiByMisionAPIAction(mision, anoSelect))
  const obtenerDatosGraficosOTDKpiByMision = (mision, anoSelect) => dispatch(obtenerDatosGraficosOTDKpiByMisionAPIAction(mision, anoSelect))

  const handleClickLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  useEffect(() => {

    if (misionSeleccionado != '' && misionSeleccionado != null && misionSeleccionado != undefined && anoSeleccionado != '') {
      setVisibleGraficosKPI(true)

      setLoading(true)
      setLoadingOQD(true)
      setLoadingOTD(true)
      setVerContenido(false)
      if (kpiSeleccionado != '') {
        obtenerDatosGraficosKpi(kpiSeleccionado.id, anoSeleccionado)
        obtenerDatosGraficosOTDKpi(kpiSeleccionado.id, anoSeleccionado)
      }
      else {
        obtenerDatosGraficosKpiByMision(misionSeleccionado.id, anoSeleccionado)
        obtenerDatosGraficosOTDKpiByMision(misionSeleccionado.id, anoSeleccionado)
      }
    }
    else {
      setVisibleGraficosKPI(false)
    }

  }, [misionSeleccionado, kpiSeleccionado, dataKpiListAPI, anoSeleccionado])

  useEffect(() => {

    if (datosGraficosOTD.length != 0) {
      setContenidoGraficoOTD(datosGraficosOTD)
      setLoadingOTD(false)
      if (loadingOQD == false) {
        setLoading(false)
        setVerContenido(true)
      }
    }

  }, [datosGraficosOTD])

  useEffect(() => {

    if (datosGraficosOQD.length != 0) {
      setContenidoGraficoOQD(datosGraficosOQD)
      setLoadingOQD(false)
      if (loadingOTD == false) {
        setLoading(false)
        setVerContenido(true)
      }
    }

  }, [datosGraficosOQD])

  useEffect(() => {


    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view data kpi") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add data kpi") == undefined) {
        setDisabledNewDataKpi(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change data kpi") == undefined) {
        setDisabledEditDataKpi(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete data kpi") == undefined) {
        setDisabledRemoveDataKpi(false)
      }

    }

  }, [personLoginPermisos])




  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!






  //   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (
    <>
      <Box sx={{ width: '100%' }} style={valorTab == 'graficos' && visibleGraficosKPI == true ? { display: "block" } : { display: "none" }}>


        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
          sx={{ height: 40 }}
          style={loading == true ? {} : { display: "none" }}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </Box>

        <Box sx={{ width: '100%' }} style={verContenido == true && loading == false && (kpiSeleccionado == '' || kpiSeleccionado == undefined || kpiSeleccionado == null) ? { display: "block" } : { display: "none" }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
              gridTemplateRows: 'auto',
              gridTemplateAreas: `"bloqueOQD bloqueOTD"`,
            }}
          >
            <Box sx={{ gridArea: 'bloqueOQD' }}>
              {contenidoGraficoOQD.map((itemGraficoOQD) => {
                return (
                  <>
                    <Chart
                      chartType="ComboChart"
                      height="400px"
                      data={itemGraficoOQD['data']}
                      options={{
                        title: "OQD data from KPI: " + itemGraficoOQD['titulo'],
                        vAxis: { title: "Performance" },
                        seriesType: "bars",
                        series: series,
                        legend: { position: 'bottom' },
                      }}
                      chartEvents={[
                        {
                          eventName: "select",
                          callback: ({ chartWrapper }) => {
                            const chart = chartWrapper.getChart();
                            const selection = chart.getSelection();

                            if (selection.length === 1) {
                              const [selectedItem] = selection;
                              const { column } = selectedItem;

                              if (selection[0].row === null) {
                                // Legent is pressed

                                if (series[column - 1].isVisible) {
                                  setSeries({
                                    ...series,
                                    [column - 1]: {
                                      ...series[column - 1],
                                      lineWidth: 0, // fake hide
                                      tooltip: false, // disable tooltips so you can't get tooltip when you hover the area where one point of "inivisibe" line is
                                      isVisible: false, // our internal flag
                                    }
                                  });
                                } else {
                                  setSeries({
                                    ...series,
                                    [column - 1]: {
                                      ...series[column - 1],
                                      lineWidth: 2,
                                      tooltip: true,
                                      isVisible: true,
                                    }
                                  });
                                }
                              }
                            }
                          }
                        }
                      ]}
                    />




                    {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

                    <div style={{ height: "50vh" }}>

                      <h1 style={{ transform: 'rotate(270deg)' }}>{"OQD data from KPI: " + itemGraficoOQD?.['titulo']}</h1>

                      <Bar
                        data={
                          {
                            labels:
                              itemGraficoOQD?.['data']?.slice(1, itemGraficoOQD['data'].length).map((ele, i) => {
                                return ele[0]
                              }),
                            datasets: [
                              {
                                label: 'Data',
                                data:
                                  itemGraficoOQD?.['data']?.slice(1, itemGraficoOQD['data'].length).map((ele, i) => {
                                    return ele[1]
                                  }),
                                backgroundColor: 'rgb(0, 56, 99, 0.5)',
                                borderColor: 'rgb(0, 56, 99)',
                                borderWidth: 3,
                                borderRadius: {
                                  topLeft: 50,
                                  topRight: 50,
                                  bottomLeft: 50,
                                  bottomRight: 50,
                                },
                                borderSkipped: false,
                              },
                              {
                                label: 'Target',
                                data:
                                  itemGraficoOQD?.['data']?.slice(1, itemGraficoOQD['data'].length).map((ele, i) => {
                                    return ele[2]
                                  }),
                                type: "line",
                                backgroundColor: 'rgb(155, 205, 101, 0.5)',
                                borderColor: 'rgb(155, 205, 101)',
                                borderWidth: 3,
                                borderRadius: {
                                  topLeft: 50,
                                  topRight: 50,
                                  bottomLeft: 50,
                                  bottomRight: 50,
                                },
                                borderSkipped: false,
                              }

                            ],
                          }
                        }
                        options={options} />
                    </div>







                    {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}




                  </>
                );
              })}
            </Box>
            <Box sx={{ gridArea: 'bloqueOTD' }}>
              {contenidoGraficoOTD.map((itemGraficoOTD) => {
                return (
                  <>

                    <Chart
                      chartType="ComboChart"
                      height="400px"
                      data={itemGraficoOTD['data']}
                      options={{
                        title: "OTD data from KPI: " + itemGraficoOTD['titulo'],
                        vAxis: { title: "Gap with due date" },
                        seriesType: "bars",
                        series: series,
                        legend: { position: 'bottom' },
                      }}
                    />
                  </>
                );
              })}
            </Box>
          </Box>
        </Box>

        <div style={verContenido == true && loading == false && kpiSeleccionado != '' && kpiSeleccionado != undefined && kpiSeleccionado != null ? { display: "block" } : { display: "none" }}>

          <Chart
            chartType="ComboChart"
            width="100%"
            height="400px"
            data={contenidoGraficoOQD}
            options={optionsCharOQD}
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();

                  if (selection.length === 1) {
                    const [selectedItem] = selection;
                    const { column } = selectedItem;

                    if (selection[0].row === null) {
                      // Legent is pressed

                      if (series[column - 1].isVisible) {
                        setSeries({
                          ...series,
                          [column - 1]: {
                            ...series[column - 1],
                            lineWidth: 0, // fake hide
                            tooltip: false, // disable tooltips so you can't get tooltip when you hover the area where one point of "inivisibe" line is
                            isVisible: false, // our internal flag
                          }
                        });
                      } else {
                        setSeries({
                          ...series,
                          [column - 1]: {
                            ...series[column - 1],
                            lineWidth: 2,
                            tooltip: true,
                            isVisible: true,
                          }
                        });
                      }
                    }
                  }
                }
              }
            ]}
          />


          <Chart
            chartType="ComboChart"
            width="100%"
            height="400px"
            data={contenidoGraficoOTD}
            options={optionsCharOTD}
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();

                  if (selection.length === 1) {
                    const [selectedItem] = selection;
                    const { column } = selectedItem;

                    if (selection[0].row === null) {
                      // Legent is pressed

                      if (series[column - 1].isVisible) {
                        setSeries({
                          ...series,
                          [column - 1]: {
                            ...series[column - 1],
                            lineWidth: 0, // fake hide
                            tooltip: false, // disable tooltips so you can't get tooltip when you hover the area where one point of "inivisibe" line is
                            isVisible: false, // our internal flag
                          }
                        });
                      } else {
                        setSeries({
                          ...series,
                          [column - 1]: {
                            ...series[column - 1],
                            lineWidth: 2,
                            tooltip: true,
                            isVisible: true,
                          }
                        });
                      }
                    }
                  }
                }
              }
            ]}
          />



        </div>

      </Box>

    </>
  );
}

