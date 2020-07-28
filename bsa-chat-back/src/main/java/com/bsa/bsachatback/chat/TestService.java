package com.bsa.bsachatback.chat;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

public class TestService {
    @Autowired private static Repository repository;

    public static void fillRepository() {
        repository.addOrEditUser(new User(UUID.fromString("9c1b2ed8-5bdf-480a-9b24-d0a480b619b5"), null, "admin", "admin", true, true));
        repository.addOrEditUser(new User(UUID.fromString("caba20f4-4395-403c-911a-360480ccac3b"), null, "andrew", "andrew", false, false));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Test message number one",
                null,
                null,
                UUID.fromString("9c1b2ed8-5bdf-480a-9b24-d0a480b619b5"),
                "this is urlForavatar",
                "admin",
                true));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Test message number two",
                null,
                null,
                UUID.fromString("9c1b2ed8-5bdf-480a-9b24-d0a480b619b5"),
                "this is urlForavatar",
                "admin",
                false));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Test message number three",
                null,
                null,
                UUID.fromString("9c1b2ed8-5bdf-480a-9b24-d0a480b619b5"),
                "this is urlForavatar",
                "admin",
                true));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Regular user message one",
                null,
                null,
                UUID.fromString("caba20f4-4395-403c-911a-360480ccac3b"),
                "this is urlForavatar",
                "andrew",
                true));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Regular user message two",
                null,
                null,
                UUID.fromString("caba20f4-4395-403c-911a-360480ccac3b"),
                "this is urlForavatar",
                "andrew",
                false));

        repository.addOrEditMessage(new Message(UUID.randomUUID(),
                "Regular user message three",
                null,
                null,
                UUID.fromString("caba20f4-4395-403c-911a-360480ccac3b"),
                "this is urlForavatar",
                "andrew",
                false));

    }
}
