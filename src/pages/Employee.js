import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/ActionEmployee"
import PageHeader from "../Components/PageHeader";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Paper, TableBody, TableCell, Table, TableHead, TableRow, Button, TablePagination, IconButton, Toolbar, TextField, InputBase, InputAdornment, ListItemSecondaryAction } from '@mui/material';
import EmployeeForm from "./EmployeeForm";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Popup from "../Components/Popup";
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Notification, DeleteDialog} from "../Components/Notification";
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-head': {
            fontWeight: 600,
            color: '#FF6D00'
        },
        '& .MuiTableCell-body': {
            fontWeight: 300,
            paddingTop: '6px',
            paddingBottom: '6px',
            color: '#240046',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        '& .MuiIconButton-root': {
            color: '#240046',
            marginRight: '4px'
        }
    },
    tableStyle: {
        margin: '20px'
    },
    searchInput: {
        width: '75%',
        marginTop: '10px'
    },
    newButton: {
        position: 'absolute',
        right: '20px',
        padding: '10px',
        color: 'white',
        background: 'linear-gradient(80deg, #FF9100, #240046)'
    }
})

const Employee = (props) => {
    useEffect(() => {
        props.fetchAllEmployees()
    },[])
    const classes = useStyles(props)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subtitle:''})
    const addOrEdit = (employee, resetForm) => {
        if(employee.id == 0)
            props.createEmployee(employee)
        else
            props.updateEmployee(employee.id, employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }
    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        props.deleteEmployee(id)
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
    const [filter, setFilter] = useState({fn: items => {return items}})
    const handleSearch = e => {
        let target = e.target;
        setFilter({
            fn: items => {
                if(target.value === "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }
    const len = props.EmployeeList.length
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }
    const handleonRowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    
    return(
        <div>
            <PageHeader
                title="Employees"
                subTitle="List of all Employees"
                icon = {<AccountBoxIcon fontSize="large" />}
            />
            <Paper className={classes.tableStyle}>
                <Toolbar>
                    <TextField className={classes.searchInput} onChange={handleSearch}
                        placeholder="Search Employees"
                        InputProps={{startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
                    />
                    <Button variant="contained" startIcon={<PersonAddIcon />}
                        onClick={() => {setOpenPopup(true); setRecordForEdit(null)}} className={classes.newButton}
                    >Add New
                    </Button>
                </Toolbar>
                <Table className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Id</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Email Address</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filter.fn(props.EmployeeList).slice(page*rowsPerPage, (page+1)*rowsPerPage)
                                .map((record, index) => {
                                return (
                                    <TableRow key={index} hover>
                                        <TableCell>{record.id}</TableCell>
                                        <TableCell>{record.name}</TableCell>
                                        <TableCell>{record.email}</TableCell>
                                        <TableCell>{record.department}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => {openInPopup(record)}}><EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={() => 
                                                {setConfirmDialog({
                                                    isOpen:true, title:"Are you sure you want to delete this record?",
                                                    subtitle:"You can't undo the changes",
                                                    onConfirm: () => {onDelete(record.id)} })}
                                            }>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div" page={page} count={len}
                    rowsPerPage={rowsPerPage} rowsPerPageOptions={pages}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleonRowsPerPageChange}
                />
            </Paper>
            <Popup
                title = "Employee Form"
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
            >
                <EmployeeForm
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <DeleteDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
};

const mapStateToProps = state => ({
    EmployeeList: state.ReducerEmployee.list
})
const mapActionToProps = {
    fetchAllEmployees: actions.fetchAll,
    createEmployee: actions.create,
    updateEmployee: actions.update,
    deleteEmployee: actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(Employee);