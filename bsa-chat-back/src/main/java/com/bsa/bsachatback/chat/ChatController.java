package com.bsa.bsachatback.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
public class ChatController {

    @Autowired ChatService chatService;

    @GetMapping("/messages/{userId}")
    public List<Message> getMessages(@PathVariable UUID userId) {
        return chatService.getMessages(userId);
    }

    @PostMapping("/message/edit") //TODO: here incorrect checking for null. fix it
    public ResponseEntity<?> editOrAddMessage(@RequestBody Message message) {
        var responseMessage = chatService.editOrAddMessage(message.getUserId(), message);

        if(responseMessage == null) {
            return new ResponseEntity<>(Map.of("error", "This user is not logged in"), HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    @PostMapping("/user/edit/{adminId}") //TODO: here incorrect checking for null. fix it
    public ResponseEntity<?> editOrAddUser(@PathVariable UUID adminId, @RequestBody User newUser) {
        var userResponse = chatService.editOrAddUser(adminId, newUser);

        if(userResponse == null) {
            return new ResponseEntity<>(Map.of("error", "User have to be logged in and Admin"), HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @PostMapping("/login")
    public User login(@RequestBody UserLoginDto user) {
        return chatService.login(user.getUserName(), user.getPassword());
    }

    @GetMapping("/userList/{adminId}")
    public List<User> userList(@PathVariable UUID adminId) {
        return chatService.getUserList(adminId);
    }

    @DeleteMapping("/message/delete/{messageId}") //TODO: next three methods not checking for loggedin user and admin, have to be fixed
    public void deleteMessage(@PathVariable UUID messageId) {
        chatService.deleteMessage(messageId);
    }

    @DeleteMapping("/user/delete")
    public void deleteUser(@RequestBody UUID userId) {
        chatService.deleteUser(userId);
    }

    @PutMapping("/message/like/{messageId}")
    public Message setLike(@PathVariable UUID messageId) {
        return chatService.setLike(messageId);
    }

}
