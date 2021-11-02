import { Card, Paper, Typography } from '@mui/material';
import React from 'react';

function PageHeader(props) {
    const {title, subTitle, icon} = props;
    const paperStyle = {backgroundColor:'#FF7900'}
    const pageHeader = {padding: '6px', display: 'flex', marginBottom: '6px', alignItems: 'center'};
    const pageIcon = {display: 'inline-block', padding: '3px', color: '#FF8500'};
    const pageTitle = {padding: '6px', color: 'white'}
    return (
        <Paper elevation={0} square style={paperStyle}>
            <div style={pageHeader}>
                <Card style={pageIcon}>
                    {icon}
                </Card>
                <div style={pageTitle}>
                    <Typography
                        variant="h6"
                        component="div"
                    >{title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="div"
                        style={{opacity: 0.6}}
                    >{subTitle}
                    </Typography>
                </div>
            </div>
        </Paper>
    );
}

export default PageHeader;