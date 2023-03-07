import React from "react";
import { Alert, AlertTitle, Dialog, Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';

const DeleteAlert = (props) => {
    return (
        <Dialog
            open={props.isDeleteConfirmPopup}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="delete-alert"
        >
            <Alert severity="warning">
                <AlertTitle>Are you sure you want to Delete this item? </AlertTitle>
                Deleting this item will cause <strong> irreversible</strong> changes

            </Alert>
            <ButtonGroup style={{ justifyContent: 'flex-end', background: '#fff4e5', padding: '0 10px' }}>
                <Button variant="text" onClick={props.handleClose}>Close</Button>
                <Button variant="text" onClick={() => props.confirmDelete(props.itemId)} autoFocus> DELETE </Button>
            </ButtonGroup>
        </Dialog>
    )
}
export default DeleteAlert