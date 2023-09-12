import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotesSharpIcon from '@mui/icons-material/NotesSharp';

const vectorMio = [
  {name:'New Risk in the contract: FTC', detalles: 'Details'},
  {name:'New person request', detalles: 'Details'}
]

function ScheduleWidget(props) {
  /*const widgets = useSelector(selectWidgets);
  const { series, ranges } = widgets?.schedule;
  const [tabValue, setTabValue] = useState(0);
  const currentRange = Object.keys(ranges)[tabValue];*/

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
        Notifications
        </Typography>
        {/*<div className="mt-12 sm:mt-0 sm:ml-8">
          <Tabs
            value={tabValue}
            onChange={(ev, value) => setTabValue(value)}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="-mx-16 min-h-40"
            classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: 'text.disabled' }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            {Object.entries(ranges).map(([key, label]) => (
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                key={key}
                label={label}
              />
            ))}
          </Tabs>
        </div>*/}
      </div>
      <List className="py-0 mt-8 divide-y">
        {vectorMio.map((item, index) => (
          <ListItem key={index} className="px-0">
            <ListItemText
              classes={{ root: 'px-8', primary: 'font-medium' }}
              primary={item.name}
              secondary={
                <span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
                  {item && (
                    <span className="flex items-center">
                      <QueryBuilderIcon />
                      <Typography component="span" className="mx-6 text-md" color="text.secondary">
                        {item.detalles}
                      </Typography>
                    </span>
                  )}

                  {item && (
                    <span className="flex items-center">
                      <LocationOnIcon />
                      <Typography component="span" className="mx-6 text-md" color="text.secondary">
                        {item.detalles}
                      </Typography>
                    </span>
                  )}
                </span>
              }
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="more" size="large">
                <NotesSharpIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );

}

export default memo(ScheduleWidget);
