import { styled, useTheme } from '@mui/material/styles';
import { memo, forwardRef, useState, useRef, useEffect } from 'react';

const Root = styled('div')(({ theme }) => ({

}));

function SettingsPanel() {

  return (
    <>
      {/*<Root id="fuse-settings-schemes" className="buttonWrapper">
        <Button
          className="settingsButton min-w-40 w-40 h-40 m-0"
          onClick={() => handleOpen('settings')}
          variant="text"
          color="inherit"
        >
          <Icon className="text-20">settings</Icon>
        </Button>
  </Root>*/}
    </>
  );
}

export default memo(SettingsPanel);
