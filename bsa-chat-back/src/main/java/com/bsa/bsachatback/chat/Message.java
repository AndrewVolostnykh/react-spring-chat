package com.bsa.bsachatback.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private UUID id;
    private String text;
    private Instant createdAt;
    private Instant editedAt;

    private UUID userId;
    private String avatar;
    private String userName;

    private Boolean isLike;
}
