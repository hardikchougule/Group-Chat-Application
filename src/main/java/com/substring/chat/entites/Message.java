package com.substring.chat.entites;

import java.time.LocalDateTime;

public class Message {

    private String sender;
    private String content;
    private LocalDateTime timestamp = LocalDateTime.now();

    public Message() {}

    public Message(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
