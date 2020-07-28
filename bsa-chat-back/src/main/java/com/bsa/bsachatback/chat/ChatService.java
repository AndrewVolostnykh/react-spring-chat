package com.bsa.bsachatback.chat;

import com.bsa.bsachatback.chat.exception.ContentNotFoundException;
import com.bsa.bsachatback.chat.exception.UserHaveNoPermissions;
import com.bsa.bsachatback.chat.exception.UserNotFoundException;
import com.bsa.bsachatback.chat.exception.UserValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ChatService {

    private Repository repository;

    @Autowired
    public ChatService(Repository repository) {
        this.repository = repository;
        //INFO: this is filler of repository for tests
        TestService.fillRepository();
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

    public Message setLike(UUID userId, Message message) {
        if(!isLogged(userId)) {
            throw new UserValidationException("You have to login at first");
        }

        var reposMessage = repository.findMessageById(message.getId());

        if(reposMessage == null) { // idk but this situation impossible for me
            throw new ContentNotFoundException("This message have not founded in storage");
        }

        return repository.addOrEditMessage(message);
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
