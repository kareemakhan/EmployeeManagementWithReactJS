import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import WarningIcon from '@mui/icons-material/Warning';

const useStyles = makeStyles({
    dialog: {
        padding: '10px',
        position: 'absolute',
        top: '40px'
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        color: '#c50b0b',
        '&:hover': {
            backgroundColor: '#e48787',
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '5rem'
        }
    }
})

export function Notification(props) {
    const {notify, setNotify} = props
    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }
    return (
        <Snackbar
            open={notify.isOpen} 
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            style={{marginTop: '40px'}}
            onClose={handleClose}
        >
            <Alert severity={notify.type} onClose={handleClose} variant="filled">
                {notify.message}
            </Alert>
        </Snackbar>
    );
}

export function DeleteDialog(props) {
    const {confirmDialog, setConfirmDialog} = props;
    const classes = useStyles(props)
    return(
        <Dialog open={confirmDialog.isOpen} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}><WarningIcon /></IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button color="info" onClick={() => {setConfirmDialog({ ...confirmDialog , isOpen:false})}}>No</Button>
                <Button color="error" onClick={confirmDialog.onConfirm}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}