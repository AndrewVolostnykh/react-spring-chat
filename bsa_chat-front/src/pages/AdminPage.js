import React, {useEffect} from 'react';
import MaterialTable from "material-table";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import {getUsers} from "../redux/actions";
import UsersList from "../components/UsersList";


const AdminPage = (props) => {

    useEffect(() => {
        if(props.users.length === 0) {
            props.getUsersProps(props.currentUser.userId);
        }
    })

    return (
        <UsersList />
    )
}

const mapStateToProps = state => state

const mapDispatchToProps = {
    getUsersProps: getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);