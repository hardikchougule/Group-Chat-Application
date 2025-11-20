package com.substring.chat.entites;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;


@Document(collection = "rooms")
public class Room {

    @Id
    private String id;
    private String roomId;
    private List<Message> messages = new ArrayList<>();

    public Room() {}

    public Room(String roomId) {
        this.roomId = roomId;
    }

    public String getId() {
        return id;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public void addMessage(Message message) {
        this.messages.add(message);
    }
}
