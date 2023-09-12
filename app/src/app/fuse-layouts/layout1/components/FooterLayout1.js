import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { memo } from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';

function FooterLayout1(props) {
  const footerTheme = useSelector(selectFooterTheme);

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        className={clsx('min-h-10 md:min-h-10 px-4 sm:px-6 py-0 flex items-center overflow-x-auto', props.className)}
        color="default"
        style={{ backgroundColor: footerTheme.palette.background.paper }}
      >
        <Toolbar className="min-h-10 md:min-h-10 px-4 sm:px-6 py-0 flex items-center overflow-x-auto">
          <Typography>© 2023</Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout1);
