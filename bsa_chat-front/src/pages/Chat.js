import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../redux/actions';
import Messages from "../data/Messages";
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import Container from '@material-ui/core/Container';
import { CircularProgress, FormHelperText } from '@material-ui/core';
import { Redirect } from "react-router-dom";

const ContainerStyle = {
  maxHeight: "100%",
  marginTop: "63px"
}

const spinnerStyle = {
  display: "flex",
  background: "rgba(0, 0, 0, .1)",
  height: "100%",
  width: "100%",
  position: "fixed",
  alignItems: "center",
  justifyContent: "center"
}

const inputMessageStyle = {
  width: "100%",
  background: "#ffffff",
  boxShadow: "0 0 5px rgba(0,0,0,0.3)"
}

function removeFromArr(array, id) {
  let tempArr = [];
  for(let i = 0; i < array.length; i++) {
    if(i !== id) {
      tempArr.push(array[i]);
    }
  }

  return tempArr;
}

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: Messages,
      messagesLength: Messages.length,
      currentUser: {
        user: "Andrew",
        userId: "121314",
        avatar: null
      },
      messageToEditIndex: {},
      isEditMode: false,
      isLoading: true
    };
    this.receiveMessage = this.receiveMessage.bind(this);
    this.likeMessage = this.likeMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.editModeHander = this.editModeHander.bind(this);
    this.editMessage = this.editMessage.bind(this);
  }

  receiveMessage(message) {
    this.state.messages.push(message);
    this.setState({messagesLength: this.state.messages.length})
  }

  likeMessage(id) {
    const newArr = [...this.state.messages];
    newArr[id].isLiked = !this.state.messages[id].isLiked;

    this.setState({messages: newArr});
  }

  editModeHander(id) {
    this.setState({
      messageToEditIndex: id,
      isEditMode: true
    });
  }

  editMessage(newMessage) {
    const {messages, messageToEditIndex} = this.state;

    const newArr = [...messages];
    newArr[messageToEditIndex] = newMessage;

    this.setState({
      messages: newArr,
      messageToEditIndex: null,
      isEditMode: false
    });
  }

  deleteMessage(id) {
    let tempArr = removeFromArr([...this.state.messages], id);

    this.setState({messages: tempArr});
  }

  componentDidMount() {
    const { getMessagesHandler } = this.props;
    getMessagesHandler();
    setTimeout(() => {this.setState({isLoading: false})}, 200);
  }

  render() {
    const {
      isLoading
    } = this.state;
    if(this.props.currentUser.isLoggedIn) {
      console.log("Something ")
      return (
          <div>
            {isLoading ? <div style={spinnerStyle}><CircularProgress/></div> : null}

            <Container style={ContainerStyle}>
              <MessageList/>
            </Container>

            <div style={inputMessageStyle}>
              <MessageInput style={inputMessageStyle}/>
            </div>

          </div>
      )
    }

    return (
        <Redirect to="login" />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state
})

const mapDispatchToProps = {
  getMessagesHandler: getMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
