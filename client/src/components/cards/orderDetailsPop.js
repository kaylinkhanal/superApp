import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const OrderDetailsPop = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button className='view_more' aria-describedby={id} variant="contained" onClick={handleClick}>
                <MoreVertIcon />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography sx={{ p: 2 }}>
                    {props.item.ordersImageName && <img src={require('../../uploads/' + props.item.ordersImageName)} style={{ maxHeight: '59px' }} />}<br />
                    <strong>_id</strong>: {props.item._id}<br />
                    <strong>Item Name</strong>: {props.item.itemName}<br />
                    <strong>Category</strong>: {props.item.category}<br />
                    <strong>Item Description</strong>: {props.item.itemDescription}<br />
                    <strong>PickUp Time</strong>: {props.item.pickUpTime}<br />
                    <strong>Pickup Date</strong>: {props.item.pickupDate}<br />
                    <strong>Receiver Address</strong>: {props.item.receiverAddress}<br />
                    <strong>Receiver Name</strong>: {props.item.receiverName}<br />
                    <strong>Receiver Phone Number</strong>: {props.item.receiverPhoneNumber}<br />
                    <strong>Sender Address</strong>: {props.item.senderAddress}<br />
                    {/* <strong>Sender Details</strong>: {JSON.stringify(props.item.senderDetails)}<br /> */}
                    <strong>Weight</strong>: {props.item.weight}<br />
                </Typography>
            </Popover>
        </div>
    );
}
export default OrderDetailsPop