import { Grid, Paper, Select, TextField, MenuItem, InputLabel, FormControl, Button, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { connect } from "react-redux";

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: '4px'
        },
        '& .MuiOutlinedInput-root': {
            width: '80%',
            margin: '4px'
        }
    },
    pageContent: {
        margin: '8px',
        padding: '6px'
    }
})
const initialValues = {
    id: 0,
    name: '',
    email: '',
    department: ''
}
const EmployeeForm = (props) => {
    const classes = useStyles(props)
    const {addOrEdit, recordForEdit} = props
    const [values, setValues] = useState(initialValues)
    useEffect(() => {
        if(recordForEdit)
            setValues({
                ...recordForEdit
            })
    },[recordForEdit])
    const handleInputChange = e => {
        const {name, value} = e.target
        const fieldValue = {[name]: value}
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }
    const [errors, setErrors] = useState({})
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('name' in fieldValues)
            temp.name = fieldValues.name? "" : "This field is required"
        if('department' in fieldValues)
            temp.department = fieldValues.department? "" : "This field is required"
        if('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email)? "" : "Email is not Valid"
        setErrors({...temp})
        if(fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(validate()) {
            addOrEdit(values, resetForm)
        }
    }
    const resetForm = () => {
        setValues({
            ...initialValues
        })
        setErrors({})
    }
    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Paper className={classes.pageContent}>
            <Grid container>
                <Grid item sm={12}>
                    <TextField required
                        name="name"
                        variant="outlined"
                        label="Full Name"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && {error: true, helperText: errors.name})}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email Address"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {error: true, helperText: errors.email})}
                    />
                </Grid>
                <Grid item sm={12}>
                    <FormControl {...(errors.department && {error: true})}>
                    <InputLabel>Department</InputLabel>
                    <Select required
                        name="department"
                        value={values.department}
                        label="Department"
                        onChange={handleInputChange}
                    >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>IT</MenuItem>
                        <MenuItem value={2}>HR</MenuItem>
                        <MenuItem value={3}>Finance</MenuItem>
                    </Select>
                    {errors.department && <FormHelperText>{errors.department}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item sm={6} style={{margin: '8px', display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="contained" color="success" type="submit">Submit</Button>
                    <Button variant="contained" color="warning" onClick={resetForm}>Reset</Button>
                </Grid>
            </Grid>
            </Paper>
        </form>
    );
}
const mapStateToProps = state => ({
    EmployeeList: state.ReducerEmployee.list
})

export default connect(mapStateToProps)(EmployeeForm);