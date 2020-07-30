package com.bsa.bsachatback.chat;

import com.bsa.bsachatback.chat.exception.ContentNotFoundException;
import com.bsa.bsachatback.chat.exception.UserHaveNoPermissions;
import com.bsa.bsachatback.chat.exception.UserNotFoundException;
import com.bsa.bsachatback.chat.exception.UserValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ChatService {

    private Repository repository;

    @Autowired
    public ChatService(Repository repository) {
        this.repository = repository;
        //INFO: this is filler of repository for tests
        //TestService.fillRepository();
        repository.addOrEditUser(new User(UUID.fromString("9c1b2ed8-5bdf-480a-9b24-d0a480b619b5"), "https://www.aceshowbiz.com/images/photo/tom_pelphrey.jpg", "admin", "admin", true, true));
        repository.addOrEditUser(new User(UUID.fromString("caba20f4-4395-403c-911a-360480ccac3b"), "https://resizing.flixster.com/EVAkglctn7E9B0hVKJrueplabuQ=/220x196/v1.cjs0NjYwNjtqOzE4NDk1OzEyMDA7MjIwOzE5Ng", "andrew", "andrew", false, false));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Test message number one",
                Instant.ofEpochMilli(1595243733000L),
                null,
                UUID.fromString("9c1b2ed8-5bdf-480a-9b24-d0a480b619b5"),
                "this is urlForavatar",
                "admin",
                true));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Test message number two",
                Instant.now(),
                null,
                UUID.fromString("9c1b2ed8-5bdf-480a-9b24-d0a480b619b5"),
                "this is urlForavatar",
                "admin",
                false));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Test message number three",
                Instant.now(),
                null,
                UUID.fromString("9c1b2ed8-5bdf-480a-9b24-d0a480b619b5"),
                "this is urlForavatar",
                "admin",
                true));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Regular user message one",
                Instant.now(),
                null,
                UUID.fromString("caba20f4-4395-403c-911a-360480ccac3b"),
                "this is urlForavatar",
                "andrew",
                true));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Regular user message two",
                Instant.now(),
                null,
                UUID.fromString("caba20f4-4395-403c-911a-360480ccac3b"),
                "this is urlForavatar",
                "andrew",
                false));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Regular user message three",
                Instant.now(),
                null,
                UUID.fromString("caba20f4-4395-403c-911a-360480ccac3b"),
                "this is urlForavatar",
                "andrew",
                false));
    }

    public List<Message> getMessages(UUID userId) throws UserValidationException {
        if(this.isLogged(userId)) {
            return repository.getMessagesList();
        } else {
            throw new UserValidationException("You have to login at first");
        }
    }

    public Message editOrAddMessage(UUID userId, Message message) throws UserValidationException {
        if(this.isLogged(userId)) {
            if(message.getCreatedAt() == null) {
                message.setCreatedAt(Instant.now());
            } else {
                message.setEditedAt(Instant.now());
            }
            return repository.addOrEditMessage(message);
        } else {
            throw new UserValidationException("You have to login at first");
        }
    }

    public User editOrAddUser(UUID currentUser, User user) {
        if(this.isLogged(currentUser)) {
            if(this.isAdmin(currentUser)) {
                return repository.addOrEditUser(user);
            } else {
                throw new UserHaveNoPermissions("You have no permissions to do this");
            }
        } else {
            throw new UserValidationException("You have to login at first");
        }
    }

    public User login(String userName, String password) {
        var tempUser = repository.findUserByName(userName);

        if(tempUser != null) {
            if(tempUser.getPassword().equals(password)) {
                tempUser.setIsLoggedIn(true);
                repository.addOrEditUser(tempUser);
                return tempUser;
            } else {
                throw new UserValidationException("Incorrect login or password");
            }
        } else {
            throw new UserNotFoundException("You have to register up at first");
        }
    }


    public List<User> getUserList(UUID adminId) {
        if(this.isLogged(adminId)
                && this.isAdmin(adminId)) {
            return repository.getUsersList();
        }

        if(!isLogged(adminId)) {
            throw new UserValidationException("You have to login at first");
        }

        if(!isAdmin(adminId)) {
            throw new UserHaveNoPermissions("You have no permissions to do this");
        }
        return repository.getUsersList();
    }

    public Message setLike(UUID messageId) {
        Message message = repository.findMessageById(messageId);

        message.setIsLike(!message.getIsLike());
        return repository.addOrEditMessage(message);
    }

    public void deleteMessage(UUID messageId) {
        repository.deleteMessageById(messageId);
    }

    public void deleteUser(UUID userId) {
        repository.deleteUserById(userId);
    }

    private Boolean isLogged(UUID userId) throws UserNotFoundException {
        var user = repository.findUserById(userId);
        if(user == null) {
            throw new UserNotFoundException("You have to register up at first");
        }
        return user.getIsLoggedIn();
    }

    private Boolean isAdmin(UUID userId) throws UserHaveNoPermissions {
        var user = repository.findUserById(userId);

        if(user == null)
            throw new UserNotFoundException("You have to register up at first");

        if(!user.getIsAdmin()) {
            throw new UserHaveNoPermissions("You have no permissions to do this");
        }

        return true;
    }

}
