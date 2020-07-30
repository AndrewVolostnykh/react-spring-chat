import React, {useState} from 'react';
import MaterialTable from "material-table";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

import { getUsers, createUser, deleteUser, editUser } from '../redux/actions'

const tableStyles = {
    marginTop: "150px"
}

const someFunc = data => {
    console.log(data);
}

const UsersList = (props) => {
    if(props.currentUser.isAdmin) {
        console.log(props.users);
        return (
            <MaterialTable
                style={tableStyles}
                title="Administrator tool: Users list"
                columns={[
                    {
                        title: 'Name', field: 'userName', validate: rowData => rowData.name !== '',
                    },
                    {
                        title: 'Avatar', field: 'avatar', validate: rowData => rowData.avatar.length > 3
                    },
                    {
                        title: 'isAdmin', field: 'isAdmin'
                    },
                    {
                        title: 'userId', field: 'userId'
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
                    isEditHidden: rowData => rowData.name === 'admin',
                    isDeleteHidden: rowData => rowData.name === 'admin',
                    onRowUpdate: newData => Promise.resolve(someFunc(newData)),
                    onRowAdd: newData => Promise.resolve(someFunc(newData)),
                    onRowDelete: oldData => Promise.resolve(someFunc(oldData))
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