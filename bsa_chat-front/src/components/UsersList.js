import React, {useState, forwardRef} from 'react';
import MaterialTable from "material-table";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { getUsers, createUser, deleteUser, editUser } from '../redux/actions'

const tableStyles = {
    marginTop: "150px"
}

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const UsersList = (props) => {
    if(props.currentUser.isAdmin) {
        console.log(props.users);
        return (
            <MaterialTable
                style={tableStyles}
                title="Administrator tool: Users list"
                icons={tableIcons}
                columns={[
                    {
                        title: 'Name', field: 'userName'//, validate: rowData => rowData.name !== '',
                    },
                    {
                        title: 'Avatar', field: 'avatar'//, validate: rowData => rowData.avatar.length > 3
                    },
                    {
                        title: 'isAdmin', field: 'isAdmin'
                    },
                    {
                        title: 'password', field: 'password'
                    }
                ]}
                data={props.users}
                editable={{
                    // onRowAdd: newData =>
                    //     new Promise((resolve, reject) => {
                    //         setTimeout(() => {
                    //             setData([...data, newData]);
                    //             resolve();
                    //         }, 1000)
                    //     }),
                    // // onRowUpdate: (newData, oldData) =>
                    // //     new Promise((resolve, reject) => {
                    // //         setTimeout(() => {
                    // //             const dataUpdate = [...data];
                    // //             const index = oldData.tableData.id;
                    // //             dataUpdate[index] = newData;
                    // //             setData(dataUpdate);
                    // //
                    // //             resolve();
                    // //         }, 1000)
                    // //     }),
                    isEditHidden: rowData => rowData.isAdmin === true,
                    isDeleteHidden: rowData => rowData.isAdmin === true,
                    onRowUpdate: newData => Promise.resolve(props.editUserProps(newData)),
                    onRowAdd: newData => Promise.resolve(props.createUserProps(newData)),
                    onRowDelete: oldData => Promise.resolve(props.deleteUserProps(oldData))
                }}
            />
        )
    }

    return (
        <Redirect to="/login" />
    )
}

const mapStateToProps = state => state

const mapDispatchToProps = {
    getUsersProps: getUsers,
    editUserProps: editUser,
    createUserProps: createUser,
    deleteUserProps: deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);