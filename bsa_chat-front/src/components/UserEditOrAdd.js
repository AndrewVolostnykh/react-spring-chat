import React, { useState } from 'react';
import {Container} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";

const EditOrAddUser = (props) => {

    const [user, setUser] = useState({
        name: '',
        avatar: '',
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

    return(
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
            <TextField
                id="outlined-helperText"
                name="message"
                label="Avatar url: "
                value={user.avatar}
                variant="outlined"
                //style={InputFieldStyle}
                onChange={handleChange('avatar')}
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

            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    color="primary"*/}
            {/*    //style={SendButton}*/}
            {/*    onClick={() => addMessageHandler(newMessage)}*/}
            {/*>*/}
            {/*    {"Send"}*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    color="disabled"*/}
            {/*    //style={SendButton}*/}
            {/*    onClick={() => addMessageHandler(newMessage)}*/}
            {/*>*/}
            {/*    {"Cancel"}*/}
            {/*</Button>*/}

        </Container>
    );
}

export default EditOrAddUser;