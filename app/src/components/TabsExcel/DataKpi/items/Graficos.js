//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Help from '@mui/icons-material/Help';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
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
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
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


//**********************END_IMPORTACIONES ***********************/

//  ********************CHART IMPORTS **************************/

import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Line } from "react-chartjs-2";
import { Radar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  scales
} from "chart.js";
import { width } from '@mui/system';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
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


const options = {
  horizontalBar: {
    indexAxis: 'y',
    elements: {
      point: {
        pointRadius: 3,
      },
      line: {
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
          },
        },
      }
    },
    maintainAspectRatio: false,
  },
  radar: {
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      y: {
        display: true,
        ticks: {
          display: false // Oculta los valores del eje
        },
        grid: {
          display: false // Oculta la cuadrícula del eje
        },
        title: {
          display: true,
          text: "Performance"
        }
      },
      x: {
        display: false,
        ticks: {
          display: false // Oculta los valores del eje
        },
      }
    }
  },
  verticalBar: {},
}



options.verticalBar = {
  ...options.verticalBar, ...options.horizontalBar,
  animation: false,
  indexAxis: 'x',
  scales: {
    x: { ...options.horizontalBar.scales.x },
    y: {
      display: true,
      grid: {
        display: false
      },
      title: {
        display: true,
        text: "Performance"
      }
    },
  }
};



export default function Graficos() {












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
  const [kpiForm, setKpiForm] = useState(null);
  const [formaCalculo, setFormaCalculo] = useState('')
  const [warningCalculo, setWarningCalculo] = useState('')
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

  }, [personLoginPermisos]);





  const [clickedChrat, setClickedChrat] = useState(false);
  const [indexStateChart, setIndexStateChart] = useState(null);

  const chartView = (index) => {
    if (indexStateChart === index && clickedChrat) {
      return 'col-12 position-relative'
    }
    else if (!clickedChrat) {
      if (index < 1) {
        return 'col-6 position-relative'
      }
      else {
        return 'col-6 mt-3 position-relative'
      }
    }
    else {
      return 'd-none'
    }
  }
  const [kpiInfoSelected, setkpiInfoSelected] = useState(null);
  const [showKpiInfo, setShowKpiInfo] = useState(null);

  // chartMaker
  useEffect(() => {
    if (contenidoGraficoOQD?.length > 0 && contenidoGraficoOTD?.length > 0) {


      let unificatedContentOQD = contenidoGraficoOQD;
      let unificatedContentOTD = contenidoGraficoOTD;
      let kpiSelected = false;
      if (Array.isArray(contenidoGraficoOQD[0]) && Array.isArray(contenidoGraficoOQD[0])) {
        unificatedContentOQD = [{ data: contenidoGraficoOQD.map(ele => ele) }]
        unificatedContentOTD = [{ data: contenidoGraficoOTD.map(ele => ele) }]
        kpiSelected = true;
      }


      const OQDComponent = unificatedContentOQD.reduce((acc, entry, index) => {
        const target = entry?.['data']?.slice(1, entry['data']?.length).map((ele, i) => {
          return ele[2];
        });
        const redSubarray = [];
        const blueSubarray = [];
        entry?.['data']?.slice(1, entry['data']?.length).map((ele, i) => {
          if (ele[1] < target[i]) {
            redSubarray.push(ele[1]);
            blueSubarray.push(0);
          } else {
            blueSubarray.push(ele[1]);
            redSubarray.push(0);
          }
        });
        acc.red.push(redSubarray);
        acc.blue.push(blueSubarray);
        return acc;
      }, { red: [], blue: [] });



      let performanceChart = unificatedContentOQD.map((itemGraficoOQD, indexItemGraficoOQD) => {
        return (

          <div style={{ height: "100%", paddingLeft: "10px", paddingTop: `${!kpiSelected ? "40px" : 0}` }} key={indexItemGraficoOQD}>
            {/* <div style={{ height: "100%", paddingLeft: "10px", paddingTop: "40px" }} key={indexItemGraficoOQD}> */}
            {!kpiSelected &&
              <div className='row d-flex justify-content-center'>
                <h3 style={{ width: "fit-content" }} className='text-center inline-block'>{"OQD data from KPI: " + itemGraficoOQD['codigo']} - {itemGraficoOQD['titulo']}</h3>
                <Help style={{ width: "fit-content" }} onClick={() => { setKpiForm(kpiListAPI.find(item => item.titulo === itemGraficoOQD['titulo'])), setShowKpiInfo(true) }} sx={{ color: 'rgb(37, 47, 62)' }} />
              </div>
            }


            <Bar

              data={
                {
                  labels:
                    itemGraficoOQD?.['data']?.slice(1, itemGraficoOQD['data']?.length).map((ele, i) => {
                      return ele[0]
                    }),
                  datasets: [
                    {

                      label: 'Target',
                      data:
                        itemGraficoOQD?.['data']?.slice(1, itemGraficoOQD['data']?.length).map((ele, i) => {
                          return ele[2]
                        }),
                      type: "line",
                      backgroundColor: 'rgb(155, 205, 101, 0.5)',
                      borderColor: 'rgb(155, 205, 101)',
                      borderWidth: 3,
                      borderSkipped: false,
                    },
                    {
                      label: 'Data over target',
                      data: OQDComponent.blue[indexItemGraficoOQD],
                      backgroundColor: "rgb(0, 56, 99, 0.5)",
                      borderColor: "rgb(0, 56, 99)",
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
                      label: 'Data under target',
                      data: OQDComponent.red[indexItemGraficoOQD],
                      backgroundColor: "rgb(255,0,0,0.5)",
                      borderColor: "rgb(255,0,0)",
                      borderWidth: 3,
                      borderRadius: {
                        topLeft: 50,
                        topRight: 50,
                        bottomLeft: 50,
                        bottomRight: 50,
                      },
                      borderSkipped: false,
                    },

                  ],
                }
              }



              options={{
                ...options.verticalBar,

                scales: {
                  x: {
                    ...options.verticalBar.scales.x,
                    stacked: true,
                  },
                  y: {
                    display: true,
                    grid: {
                      display: false
                    },
                    title: {
                      display: true,
                      text: "Performance"
                    },
                    stacked: true,
                  },
                },

              }}

            />
          </div>
        );
      });

      let gapDueDataChart = unificatedContentOTD?.map((itemGraficoOTD, indexitemGraficoOTD) => {
        return itemGraficoOTD?.['data'] && (
          <>

            <div style={{ height: "100%", paddingTop: `${!kpiSelected ? "40px" : 0}`, paddingRight: "10px" }} key={indexitemGraficoOTD}>
              {/* <div style={{ height: "100%", paddingTop: "40px", paddingRight: "10px" }} key={indexitemGraficoOTD}> */}
              {!kpiSelected &&
                <div className='row d-flex justify-content-center'>
                  <h3 style={{ width: "fit-content" }} className='text-center inline-block'>{"OQD data from KPI: " + itemGraficoOTD['codigo']} - {itemGraficoOTD['titulo']}</h3>
                  <Help style={{ width: "fit-content" }} onClick={() => { setKpiForm(kpiListAPI.find(item => item.titulo === itemGraficoOTD['titulo'])), setShowKpiInfo(true) }} sx={{ color: 'rgb(37, 47, 62)' }} />
                </div>
              }

              <Bar
                options={{
                  ...options.verticalBar,

                  scales: {
                    x: { ...options.verticalBar.scales.x },

                    y: {
                      display: true,
                      grid: {
                        display: true,

                        color: function (context) {
                          if (context?.tick?.value === 0) {
                            return 'rgb(224, 224, 224)';
                          }
                        },

                      },
                      title: {
                        display: true,
                        text: "Gap with due date"
                      }
                    },
                  }
                }}


                data={
                  {
                    labels:
                      itemGraficoOTD?.['data']?.slice(1, itemGraficoOTD?.['data']?.length).map((ele, i) => {
                        return ele[0];
                      }),
                    datasets: [
                      {
                        label: 'Data',
                        data:
                          itemGraficoOTD?.['data']?.slice(1, itemGraficoOTD?.['data']?.length).map((ele, i) => {
                            return ele[1];
                          }),

                        backgroundColor: (context) => {
                          const value = context.dataset.data[context.dataIndex];
                          return value < 0 ? "rgb(255,0,0,0.5)" : 'rgb(0, 56, 99, 0.5)';

                        },
                        borderColor: (context) => {
                          const value = context.dataset.data[context.dataIndex];
                          return value < 0 ? "rgb(255,0,0)" : 'rgb(0, 56, 99)';

                        },
                        borderWidth: 3,
                        borderRadius: {
                          topLeft: 50,
                          topRight: 50,
                          bottomLeft: 50,
                          bottomRight: 50,
                        },
                        borderSkipped: false,


                      },
                    ],
                  }
                }

              />
            </div>


          </>
        );
      });

      const mergedArray = performanceChart.flatMap((value, index) => [value, gapDueDataChart[index]]);
      setchartComponent(mergedArray);



    }
  }, [contenidoGraficoOQD, contenidoGraficoOTD])

  const [chartComponent, setchartComponent] = useState(null);

  useEffect(() => {
    if (kpiForm) {
      let modoDeCalculo = ""
      switch (kpiForm.modoCalculo) {
        case 1:
          modoDeCalculo = "<" + kpiForm.objetivo + " " + kpiForm.unidad
          break
        case 2:
          modoDeCalculo = "≤" + kpiForm.objetivo + " " + kpiForm.unidad
          break
        case 3:
          modoDeCalculo = "=" + kpiForm.objetivo + " " + kpiForm.unidad
          break
        case 4:
          modoDeCalculo = "≥" + kpiForm.objetivo + " " + kpiForm.unidad
          break
        case 5:
          modoDeCalculo = ">" + kpiForm.objetivo + " " + kpiForm.unidad
          break
      }

      setFormaCalculo(modoDeCalculo);
      let cadenaWarning = ""
      switch (kpiForm.modoCalculo) {
        case 1:
          cadenaWarning = ">" + kpiForm.valor_aviso + " " + kpiForm.unidad
          break
        case 2:
          cadenaWarning = ">" + kpiForm.valor_aviso + " " + kpiForm.unidad
          break
        case 3:
          cadenaWarning = ""
          break
        case 4:
          cadenaWarning = "<" + kpiForm.valor_aviso + " " + kpiForm.unidad
          break
        case 5:
          cadenaWarning = "<" + kpiForm.valor_aviso + " " + kpiForm.unidad
          break
      }

      setWarningCalculo(cadenaWarning)
    }
  }, [kpiForm]);






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

          <div className="row">
            {chartComponent && (
              chartComponent.map((ele, index) => (
                <div
                  style={!clickedChrat ? { height: "38vh" } : { minHeight: "50vh", height: "66vh" }}
                  key={index}
                  className={chartView(index)}

                >
                  {
                    clickedChrat ? <FullscreenExitIcon className="position-absolute" onClick={() => { setClickedChrat(!clickedChrat); setIndexStateChart(index) }} style={{ top: "40px", left: "20px" }} /> : <FullscreenIcon className="position-absolute" onClick={() => { setClickedChrat(!clickedChrat); setIndexStateChart(index) }} style={{ top: "40px", left: "20px" }} />
                  }
                  {chartComponent[index]}
                </div>
              ))
            )}
          </div>

        </Box>



        {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}




        <div style={verContenido == true && loading == false && kpiSeleccionado != '' && kpiSeleccionado != undefined && kpiSeleccionado != null ? { display: "block", height: "50vh", padding: "12px", } : { display: "none" }}>

          <div className="row">





            {
              chartComponent && (
                chartComponent.map((e, index) => {
                  return (

                    <div
                      style={{ height: "38vh", marginBottom: "6%" }}
                      key={index}
                      className='col-12'

                    >
                      {
                        (index + 1) % 2 !== 0 ?
                          <div className='row d-flex justify-content-center'>
                            <h3 style={{ width: "fit-content" }} className='text-center inline-block'>{`oqd data from KPI: ` + kpiSeleccionado['codigo']} - {kpiSeleccionado['titulo']}</h3>

                            <Help style={{ width: "fit-content" }} onClick={() => { setKpiForm(kpiListAPI.find(item => item.titulo === kpiSeleccionado['titulo'])), setShowKpiInfo(true) }} sx={{ color: 'rgb(37, 47, 62)' }} />
                          </div>
                          :

                          <div className='row d-flex justify-content-center'>
                            <h3 style={{ width: "fit-content" }} className='text-center inline-block'>{`OTD data from KPI: ` + kpiSeleccionado['codigo']} - {kpiSeleccionado['titulo']}</h3>

                            <Help style={{ width: "fit-content" }} onClick={() => { setKpiForm(kpiListAPI.find(item => item.titulo === kpiSeleccionado['titulo'])), setShowKpiInfo(true) }} sx={{ color: 'rgb(37, 47, 62)' }} />
                          </div>

                      }
                      {chartComponent[index]}
                    </div>
                  )

                })
              )
            }

          </div>
        </div>



        <Dialog open={showKpiInfo} onClose={() => setShowKpiInfo(false)} fullWidth maxWidth="md" >
          <DialogTitle>Associated KPI</DialogTitle>
          <List sx={{ pt: 0 }} style={{ margin: '20px' }}>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">

                <TableBody>
                  <>
                    <TableRow
                      // key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.titulo : ''}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Title:</b></TableCell>
                      <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.titulo : ''}</TableCell>

                    </TableRow>

                    <TableRow
                      // key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.codigo : ''}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Code:</b></TableCell>
                      <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.codigo : ''}</TableCell>

                    </TableRow>

                    <TableRow
                      // key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.tipo : ''}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Type:</b></TableCell>
                      <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.tipo : ''}</TableCell>

                    </TableRow>
                    <TableRow
                      // key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.descripcion : ''}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Description:</b></TableCell>
                      <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.descripcion : ''}</TableCell>

                    </TableRow>

                    <TableRow
                      // key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.datos_usados : ''}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Data used:</b></TableCell>
                      <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.datos_usados : ''}</TableCell>

                    </TableRow>

                    <TableRow
                      // key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.tipoFrecuencia : ''}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Type of delivery:</b></TableCell>
                      <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.tipoFrecuencia : ''}</TableCell>

                    </TableRow>

                    <TableRow
                      // key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.frecuencia : ''}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Annual deliveries:</b></TableCell>
                      <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.frecuencia : ''}</TableCell>

                    </TableRow>

                    <TableRow
                      // key={formaCalculo}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Calculation mode:</b></TableCell>
                      <TableCell align="left">{formaCalculo}</TableCell>

                    </TableRow>

                    <TableRow
                      // key={warningCalculo}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Notification of a warning:</b></TableCell>
                      <TableCell align="left">{warningCalculo}</TableCell>

                    </TableRow>

                    <TableRow
                      // key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.mision_name : ''}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"><b>Mission:</b></TableCell>
                      <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.mision_name : ''}</TableCell>

                    </TableRow>

                  </>

                </TableBody>
              </Table>
            </TableContainer>

          </List>
          <DialogActions>

            <Button onClick={() => setShowKpiInfo(false)}>Close</Button>

          </DialogActions>
        </Dialog>





      </Box>

    </>
  );
}

