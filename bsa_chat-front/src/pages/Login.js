import React, {Component, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {addMessage, deleteMessage, dropUser, getMessages, loginUser, setLike, toggleEditWindow} from "../redux/actions";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom'
import {connect} from "react-redux";

const LoginPage = (props) => {

    const [user, setUser] = useState({
        name: '',
        password: '',
        showPassword: false
    })

    const handleChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
    }

    const handleClickShowPassword = () => {
        setUser({ ...user, showPassword: !user.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const history = useHistory();

    const changePage = () => {
        if(props.isLoading) {
            return <div><CircularProgress /></div>
        }

        if(props.error != null) {
            return <div>{props.error}</div>
        }

        if(props.currentUser != null) {
            props.currentUser.isAdmin ? history.push('/users') : history.push('chat');
        }

        return null;
    }


    return (
        <Container>

            <TextField
                id="outlined-helperText"
                name="message"
                label="Name: "
                value={user.name}
                variant="outlined"
                //style={InputFieldStyle}
                onChange={handleChange('name')}
            />

            <FormControl >
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={user.showPassword ? 'text' : 'password'}
                    value={user .password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {user.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <div>
                {
                    props.isLoading ? <CircularProgress /> : props.currentUser.userName
                }
            </div>

            <Button
                variant="contained"
                color="primary"
                //style={SendButton}
                onClick={() => {
                    props.dispatch(dropUser());
                    props.dispatch(loginUser(user.name, user.password));
                }}>
                {"Send"}
            </Button>
        </Container>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(LoginPage);
