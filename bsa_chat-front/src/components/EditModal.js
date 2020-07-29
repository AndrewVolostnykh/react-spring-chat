import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {editMessage, toggleEditWindow} from "../redux/actions";
import {connect} from "react-redux";

function EditModal({message, propsEditMessage, closeModal}) {

  const [value, setValue] = useState(message.text);
  console.log(value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

    const modalStyles = {
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const textDivStyle = {
        background: "white",
        padding: "10px",
        border: "1px solid black",
        borderRadius: "8px"
    }

    const textFieldStyle = {

    }

    const buttonStyle = {
        marginLeft: "10px"
    }

  return (
        <Modal open onClose={() => closeModal({})} style={modalStyles}>
          <div style={textDivStyle}>
            <TextField
              // id="outlined-multiline-flexible"
              // label="Edit message"
              multiline
              value={value}
              onChange={handleChange}
              // variant="outlined"
            />
            <Button style={buttonStyle}
              variant="contained"
              color="primary"
              // style={SendButton}
              onClick={() => {propsEditMessage(message, value); closeModal({})}}
            >
              Edit
            </Button>
          </div>
        </Modal>
  )
}

const mapDispatchToProps = {
  propsEditMessage: editMessage,
  closeModal: toggleEditWindow
}

const mapStateToProps = state => ({
  message: state.editMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
