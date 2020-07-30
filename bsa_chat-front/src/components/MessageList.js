import React from 'react';
import { connect } from 'react-redux';
import {
    Link
} from "react-router-dom";

import Container from '@material-ui/core/Container';
import { Typography, Card, Avatar, CardContent, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import editModal from './EditModal';
import moment from 'moment';

import {addMessage, deleteMessage, editMessage, getMessages, setLike, toggleEditWindow} from "../redux/actions";
import EditModal from "./EditModal";

const CardsStyle = {
    background: "#f2ffff",
    width: "60%",
    marginTop: "10px"
}

const rightForCurrentUser = {
    display: "flex",
    justifyContent: "flex-end"
}

const userAvatarAndNameStyle = {
    display: "flex",
    justifyContent: "flex-begin",
    marginBottom: "10px"
}

const AvatarStyle = {
    marginRight: "10px"
}

const CardFooter = {
    width: "100%",
    display: "flex",
    alignItems: "center"
}

const CardFotterChildStyle = {
    flex: "1"
}


const MessageList = ({
                         messages,
                         currentPropsUser,
                         likeMessageHandler,
                         hasEditWindow,
                         deleteMessageHandler,
                         toggleEdit
}) => {

    let sortedMessages = messages.sort((a, b) => {
        if(Date.parse(a.createdAt) > Date.parse(b.createdAt)) {
            return 1;
        }
        if(a.createdAt < b.createdAt) {
            return -1;
        }
        return 0;
    } );


    return(
        <Container>
            <div className="MessageList">
                {
                    sortedMessages.map((ms, i) => {
                        const isCurrentUser = currentPropsUser.userId === ms.userId;
                        const divForCard = isCurrentUser ? rightForCurrentUser : null;
                        return(

                            <div style={divForCard} >
                                <Card style={CardsStyle}>
                                    <CardContent>
                                        <div style={userAvatarAndNameStyle}>
                                            {
                                                !isCurrentUser && (
                                                <Avatar src={ms.avatar} style={AvatarStyle}/>
                                                )
                                            }
                                            <Typography gutterBottom variant="h6" component="h2">
                                                { ms.user || ms.userName }
                                            </Typography>
                                        </div>
                                        <Typography variant="body1" color="textSecondary" component="p">
                                            {ms.text}
                                        </Typography>
                                        <div style={CardFooter}>
                                            <div style={CardFotterChildStyle} >
                                                {
                                                    !isCurrentUser && (
                                                        <IconButton onClick={() => likeMessageHandler(ms.id)} >
                                                            <FavoriteIcon color={ms.isLike ? "secondary" : "action"} />
                                                        </IconButton>
                                                    )
                                                }
                                                {
                                                    isCurrentUser && (
                                                        <IconButton onClick={() => deleteMessageHandler(ms.id)}>
                                                            <DeleteIcon  />
                                                        </IconButton>
                                                    )
                                                }
                                                {
                                                    isCurrentUser && (
                                                        <Link  to={`/message/${ms.id}`} >
                                                            <IconButton>
                                                                <CreateIcon/>
                                                            </IconButton>
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                            <Typography align="right" variant="body2" color="textSecondary" style={CardFotterChildStyle}>
                                                {moment(ms.createdAt).format("LLLL")}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
          {hasEditWindow && <EditModal />}
        </Container>
    )
}

const mapStateToProps = state => ({
    currentPropsUser: state.currentUser,
    messages: state.messages,
    hasEditWindow: Boolean(state.editMessage.id)
})

const mapDispatchToProps = {
    toggleEdit: toggleEditWindow,
    addMessage: addMessage,
    deleteMessageHandler: deleteMessage,
    likeMessageHandler: setLike
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
