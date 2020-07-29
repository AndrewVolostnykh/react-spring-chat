import React, {Component, useEffect, useState} from 'react';
import {connect} from "react-redux";
import { useHistory, Link } from 'react-router-dom'

import Button from "@material-ui/core/Button";
import { Container } from '@material-ui/core';

const style = {
    margin: "5px"
}

const NavigationBar = (props) => {
    const history = useHistory();
    return (
        <Container>
            <Link style={style} to="/chat">Bsa Chat!</Link>
            <Link style={style} to="/users">Admin tool</Link>
            <Link style={style} to="/login">Login page</Link>
         </Container>
    )

}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(NavigationBar);