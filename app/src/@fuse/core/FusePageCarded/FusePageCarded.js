import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, memo, useRef, useEffect, useState } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import FusePageCardedHeader from './FusePageCardedHeader';
import FusePageCardedSidebar from './FusePageCardedSidebar';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportIcon from '@mui/icons-material/Support';
import Backdrop from '@mui/material/Backdrop';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  minWidth: 0,
  minHeight: '100%',
  position: 'relative',
  flex: '1 1 auto',
  width: '100%',
  height: 'auto',
  backgroundColor: theme.palette.background.default,

  '& .FusePageCarded-innerScroll': {
    height: '100%',
  },

  '& .FusePageCarded-topBg': {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: headerHeight,
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    backgroundSize: 'cover',
    pointerEvents: 'none',
  },

  '& .FusePageCarded-contentWrapper': {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 3.2rem',
    flex: '1 1 100%',
    zIndex: 2,
    maxWidth: '100%',
    minWidth: 0,
    minHeight: 0,
    [theme.breakpoints.down('sm')]: {
      padding: '0 1.6rem',
    },
  },

  '& .FusePageCarded-header': {
    height: headerContentHeight,
    minHeight: headerContentHeight,
    maxHeight: headerContentHeight,

    display: 'flex',
    color: theme.palette.primary.contrastText,
  },

  '& .FusePageCarded-headerSidebarToggleButton': {
    color: theme.palette.primary.contrastText,
  },

  '& .FusePageCarded-contentCard': {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    minHeight: 0,
    borderRadius: '20px 20px 0px 0px'
  },

  '& .FusePageCarded-toolbar': {
    height: toolbarHeight,
    minHeight: toolbarHeight,
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  '& .FusePageCarded-content': {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '20px 20px 0px 0px',
  },

  '& .FusePageCarded-sidebarWrapper': {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 5,
    overflow: 'hidden',
    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        zIndex: 1,
        position: 'relative',
      },
    },
  },

  '& .FusePageCarded-sidebar': {
    position: 'absolute',
    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        backgroundColor: 'transparent',
        position: 'relative',
        border: 'none',
        overflow: 'hidden',
      },
    },
    width: drawerWidth,
    height: '100%',
  },

  '& .FusePageCarded-leftSidebar': {},
  '& .FusePageCarded-rightSidebar': {},

  '& .FusePageCarded-sidebarHeader': {
    height: headerHeight,
    minHeight: headerHeight,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        backgroundColor: 'transparent',
      },
    },
  },

  '& .FusePageCarded-sidebarContent': {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('lg')]: {
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
    }
  },

  '& .FusePageCarded-backdrop': {
    position: 'absolute',
  },
}));

const actions = [
  { icon: <DashboardIcon />, name: 'Incident dashboard' },
  { icon: <LibraryBooksIcon />, name: 'User Guide' },
  { icon: <SupportIcon />, name: 'Support' },
];

const drawerWidth = 240;
const headerHeight = 150;
const toolbarHeight = 64;
const headerContentHeight = headerHeight - toolbarHeight - 50;

const FusePageCarded = forwardRef((props, ref) => {
  const location = useLocation();
  const dispatch = useDispatch()

  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const rootRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [nombreUbicacionActual, setNombreUbicacionActual] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isRightSidebar = props.rightSidebarHeader || props.rightSidebarContent;
  const isLeftSidebar = props.leftSidebarHeader || props.leftSidebarContent;

  useImperativeHandle(ref, () => ({
    rootRef,
    toggleLeftSidebar: () => {
      leftSidebarRef.current.toggleSidebar();
    },
    toggleRightSidebar: () => {
      rightSidebarRef.current.toggleSidebar();
    },
  }));

  useEffect(() => {

    let moduleActual = location.pathname.split("/")

    //OBTENER NOMBRE MODULO
    switch (moduleActual[3]) {
      case "riskmanagement":
        setNombreUbicacionActual("Risk")
        break;
      case "peoplemanagement":
        setNombreUbicacionActual("People")
        break;
      case "improvementProposals":
        setNombreUbicacionActual("Improvement Proposals")
        break;
      case "kpi":
          setNombreUbicacionActual("KPI")
          break;
      case "dataKpi":
        setNombreUbicacionActual("Data KPI")
        break;
      case "divisiones":
        setNombreUbicacionActual("Divisions")
        break;
      case "logPerson":
        setNombreUbicacionActual("Movements of people")
        break;
      case "permissionsGroup":
        setNombreUbicacionActual("Permissions Group")
        break;

      default:
        setNombreUbicacionActual(moduleActual[3].charAt(0).toUpperCase() + moduleActual[3].slice(1))
        break
    }


  }, [])

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          '#fuse-main': {
            height: props.innerScroll && '100vh',
          },
        })}
      />
      <Root
        className={clsx(
          'FusePageCarded-root',
          props.innerScroll && 'FusePageCarded-innerScroll',
          props.className
        )}
        ref={rootRef}
      >
        <div className="FusePageCarded-topBg" />

        <div className="flex container w-full">
          {isLeftSidebar && (
            <FusePageCardedSidebar
              position="left"
              header={props.leftSidebarHeader}
              content={props.leftSidebarContent}
              variant={props.leftSidebarVariant || 'permanent'}
              innerScroll={props.innerScroll}
              ref={leftSidebarRef}
              rootRef={rootRef}
            />
          )}

          <div
            className={clsx(
              'FusePageCarded-contentWrapper',
              isLeftSidebar &&
              (props.leftSidebarVariant === undefined ||
                props.leftSidebarVariant === 'permanent') &&
              'lg:ltr:pl-0 lg:rtl:pr-0',
              isRightSidebar &&
              (props.rightSidebarVariant === undefined ||
                props.rightSidebarVariant === 'permanent') &&
              'lg:pr-0'
            )}
          >

            <h3 style={{color: "#FFFFFF"}}>{nombreUbicacionActual}</h3>

            <FusePageCardedHeader header={props.header} />

            <div
              className={clsx('FusePageCarded-contentCard', props.innerScroll && 'inner-scroll')}
            >
              {props.contentToolbar && (
                <div className="FusePageCarded-toolbar">{props.contentToolbar}</div>
              )}

              {props.content && (
                <FuseScrollbars
                  className="FusePageCarded-content"
                  enable={props.innerScroll}
                  scrollToTopOnRouteChange={props.innerScroll}
                >
                  {props.content}
                </FuseScrollbars>
              )}
            </div>
          </div>

          {isRightSidebar && (
            <FusePageCardedSidebar
              position="right"
              header={props.rightSidebarHeader}
              content={props.rightSidebarContent}
              variant={props.rightSidebarVariant || 'permanent'}
              innerScroll={props.innerScroll}
              ref={rightSidebarRef}
              rootRef={rootRef}
            />
          )}
        </div>

      </Root>


      {/*<SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<QuestionMarkIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => { functionDestino(action.name) }}
          />
        ))}
      </SpeedDial>
      <ModalInsertar />
      <MisIncidencias />*/}
    </>
  );
});

FusePageCarded.propTypes = {
  rightSidebarHeader: PropTypes.node,
  rightSidebarContent: PropTypes.node,
  rightSidebarVariant: PropTypes.node,
  leftSidebarHeader: PropTypes.node,
  leftSidebarContent: PropTypes.node,
  leftSidebarVariant: PropTypes.node,
  header: PropTypes.node,
  content: PropTypes.node,
  contentToolbar: PropTypes.node,
  innerScroll: PropTypes.bool,
};

FusePageCarded.defaultProps = {};

export default memo(styled(FusePageCarded)``);
