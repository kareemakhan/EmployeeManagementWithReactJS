import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Popup(props) {
    const {title, children, openPopup, setOpenPopup} = props;
    return (
       <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div style={{display: 'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    <IconButton variant="contained" color="error" 
                        onClick={() => setOpenPopup(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
       </Dialog>
    );
}

export default Popup;