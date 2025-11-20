package com.substring.chat.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.substring.chat.entites.Room;

public interface RoomRepository extends MongoRepository<Room, String> {
 Room findByRoomId(String roomId);
}
