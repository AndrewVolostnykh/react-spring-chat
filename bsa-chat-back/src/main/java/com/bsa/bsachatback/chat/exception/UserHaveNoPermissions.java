package com.bsa.bsachatback.chat.exception;

public class UserHaveNoPermissions extends RuntimeException {
    public UserHaveNoPermissions() {
        super();
    }

    public UserHaveNoPermissions(String message) {
        super(message);
    }

}
