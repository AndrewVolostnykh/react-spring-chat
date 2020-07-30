import React from 'react';
import { Toolbar, Badge } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import PeopleIcon from '@material-ui/icons/People';
import {addMessage, dropUser, editMessage} from "../redux/actions";
import {connect} from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

const IconsStyle = {
    marginLeft: "30px"
}

const lastActivityStyle = {
    width: "70%",
    textAlign: "right"
}

const linkStyle = {
    color: "white",
    margin: "5px"
}

function latestFinder(messages) {
    let temp;
    for(let i = 1; i < messages.length; i++) {
        if(Date.parse(messages[i-1].createdAt) >  Date.parse(messages[i].createdAt)) {
            console.log(Date.parse(messages[i-1].createdAt))
            temp = messages[i-1].createdAt;
        }
    }
    return temp;
}

const Header = (props) => {
    let numberOfMessages = props.messages.length;
    let participants = Array.from(new Set(props.messages && props.messages.map((item) => item.userId))).length;
    let lastMessageIn = latestFinder(props.messages)

    const logout = () => {
        window.location.reload();
    }


    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography>
                    <Badge badgeContent={numberOfMessages} color="secondary" style={IconsStyle}>
                        <MailIcon />
                    </Badge>
                    <Badge badgeContent={participants} color="secondary" style={IconsStyle}>
                        <PeopleIcon />
                    </Badge>
                </Typography>
                <Typography align="right" variant="h6" style={IconsStyle}><Link style={linkStyle} to="/chat">   Bsa Chat!  </Link></Typography>
                { props.currentUser.isAdmin ? <Link style={linkStyle} to="/users">Admin tool</Link> : null }
                { props.currentUser.isLoggedIn ? <Link style={linkStyle} to="/login" onClick={logout}>Logout</Link> : null}
                <div style={lastActivityStyle}>
                    { props.currentUser.isLoggedIn && <Typography align="right" variant="h6" style={IconsStyle}>   latest: {moment(lastMessageIn).calendar()} </Typography>}
                </div>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    dropUserProps: dropUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
