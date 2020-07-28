import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addMessage, editMessage} from "../redux/actions";
import {connect} from "react-redux";

const InputStyle = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px"
}

const InputFieldStyle = {
    width: "60%",
    marginTop: "10px",
    marginBottom: "10px",
}

const SendButton = {
    marginLeft: "10px"
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }

const MessageInput = ({
    addMessageHandler,
    currentPropsUser,
    messageToEdit = null,
    editMessageHandler,
}) => {
    const [message, setMessage] = useState("");

    const fullMessageObject = {
        ...currentPropsUser,
        "id": 0,
        "text": "",
        "createdAt": new Date().toISOString(),
        "editedAt": ""
    }

    const newMessage = {
        ...fullMessageObject,
        text: message,
        id: createUUID()
    }

    const editMessage = () => {
        editMessageHandler({
            ...fullMessageObject,
            text: message
        });
        setMessage(null);
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div style={InputStyle}>
            <TextField
                id="outlined-helperText"
                name="message"
                label="New message: "
                helperText="Write your message here"
                value={message}
                variant="outlined"
                style={InputFieldStyle}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                style={SendButton}
                onClick={() => addMessageHandler(newMessage)}
                >
                {"Send"}
            </Button>
        </div>
    )
}

const mapStateToProps = state => ({
    currentPropsUser: state.currentUser,
    isEditMode: state.isEditMode
})

const mapDispatchToProps = {
    addMessageHandler: addMessage,
    editMessage: editMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
