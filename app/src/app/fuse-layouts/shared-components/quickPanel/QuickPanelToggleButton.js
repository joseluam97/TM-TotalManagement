import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { toggleQuickPanel } from './store/stateSlice';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';

function QuickPanelToggleButton(props) {
  const dispatch = useDispatch();
  const listNotificactions = useSelector(state => state.fuse.peopleManagementComponente.listNotificactions)

  return (
    <Badge badgeContent={listNotificactions.length} color="primary">
      <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleQuickPanel())} size="large">
        {props.children}
      </IconButton>
    </Badge>
  );
}

QuickPanelToggleButton.defaultProps = {
  children: <Icon>notifications</Icon>,
};

export default QuickPanelToggleButton;
