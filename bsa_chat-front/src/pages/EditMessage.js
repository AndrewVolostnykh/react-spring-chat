import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {editMessage, getMessages, toggleEditWindow} from "../redux/actions";
import {connect} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";

const modalStyles = {
    marginTop: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const textDivStyle = {
    background: "white",
    padding: "20px",
    border: "1px solid black",
    borderRadius: "8px",
    width: "50%",
    height: "50%"
}

const buttonStyle = {
    margin: "15px"
}

const EditMessagePage = ({ match, propsEditMessage, getMessages, messages, isLoggedIn }) => {
    const { id } = match.params;
    const [message, setMessage] = useState();
    const [value, setValue] = useState();
    const history = useHistory();

    useEffect(() => {
        if(messages) {
            setMessage(messages.find(m => m.id === id));
        }

        if(message && !value) {
            setValue(message.text)
        }
    });

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    if(isLoggedIn) {
        return (
            <div style={modalStyles}>
                <p style={buttonStyle}>Edit filed: </p>
                <TextField style={textDivStyle}
                           id="outlined-multiline-static"
                           multiline
                           rows={8}
                           value={value}
                           onChange={handleChange}
                           variant="outlined"
                />
                <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        propsEditMessage(message, value, history)
                    }}
                >
                    Edit
                </Button>
            </div>
        )
    }

    return (
        <Redirect to="login" />
    )
}

const mapDispatchToProps = {
    getMessages: getMessages,
    propsEditMessage: editMessage
}

const mapStateToProps = state => ({
    messages: state.messages,
    isLoggedIn: state.currentUser.isLoggedIn
});
export default connect(mapStateToProps, mapDispatchToProps)(EditMessagePage);
