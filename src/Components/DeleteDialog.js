import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import React from 'react';

export default function DeleteDialog(props) {
    const {confirmDialog, setConfirmDialog} = props;
    return(
        <Dialog>
            <DialogTitle>
                
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button color="info">No</Button>
                <Button color="error">Yes</Button>
            </DialogActions>
        </Dialog>
    )
}