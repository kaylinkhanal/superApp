import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const DropNotification = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div className='notification'>
            <button aria-describedby={id} type="button" onClick={handleClick}>
                <NotificationsNoneOutlinedIcon /> <small className='count'>1</small>
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
                <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
                    <p>Notification Lists Here...</p>
                </Box>
            </Popper>
        </div>
    );
}
export default DropNotification