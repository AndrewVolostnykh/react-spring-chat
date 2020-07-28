package com.bsa.bsachatback.chat;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Repository {
    private Map<UUID, User> users = new HashMap<>();
    private Map<UUID, Message> messages = new HashMap<>();

    public User addOrEditUser(User user) {
        return users.put(user.getUserId(), user);
    }

    public List<User> getUsersList() {
        return new ArrayList<>(users.values());
    }

    public User findUserById(UUID userId) {
        return users.get(userId);
    }

    public User findUserByName(String userName) {
        var allUsers = users.values();
        for(User user : allUsers) {
            if(user.getUserName().equals(userName)) {
                return user;
            }
        }
        return null;
    }

    public Message findMessageById(UUID id) {
        return messages.get(id);
    }


    public Message addOrEditMessage(Message message) {
        messages.put(message.getId(), message);
        return message;
    }

    public List<Message> getMessagesList() {
        return new ArrayList<>(messages.values());
    }
}
