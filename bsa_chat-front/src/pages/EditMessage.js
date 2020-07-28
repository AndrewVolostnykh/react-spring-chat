import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {editMessage, getMessages, toggleEditWindow} from "../redux/actions";
import {connect} from "react-redux";

const EditMessagePage = ({ match, propsEditMessage, getMessages, messages }) => {
    const { id } = match.params;
    getMessages();

    const [message, setMessage] = useState();
    const [value, setValue] = useState();

    useEffect(() => {
        if(messages) {
            setMessage(messages[id]);
        }

        if(message && !value) {
            setValue(message.text)
        }
    });

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return(
        <div>
            <TextField
                // id="outlined-multiline-flexible"
                // label="Edit message"
                multiline
                value={value}
                onChange={handleChange}
                // variant="outlined"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => { propsEditMessage(message, value) }}
            >
                Edit
            </Button>
        </div>
    )
}

const mapDispatchToProps = {
    getMessages: getMessages,
    propsEditMessage: editMessage
}

const mapStateToProps = (state) => ({
    ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(EditMessagePage);
