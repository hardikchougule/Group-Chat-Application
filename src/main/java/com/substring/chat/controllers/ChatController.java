package com.substring.chat.controllers;

import java.security.MessageDigest;
import java.time.LocalDateTime;

import org.springframework.messaging.core.MessageRequestReplyOperations;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.substring.chat.entites.Message;
import com.substring.chat.entites.Room;
import com.substring.chat.repositories.RoomRepository;
import com.substring.chatplayload.MessageRequest;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {
   private RoomRepository roomRepository;
   
   public ChatController(RoomRepository roomRepository) {
	   this.roomRepository= roomRepository;
   }
   
   //for sending and reciving message
   @MessageMapping("/sendMessage/{roomId}")  //app/sendMessage/roomId
   @SendTo("/topic/room/{roomId}") //subscribe
   public Message sendMessage(
		   @DestinationVariable String roomId,
		   @RequestBody MessageRequest request
		   ) throws Exception {
	   
	   Room room=roomRepository.findByRoomId(request.getRoomId());
	   Message message= new Message();
	   message.setContent(request.getContent());
	   message.setSender(request.getSender());
	   message.setTimestamp(LocalDateTime.now());
	   
	   if(room != null) {
		   room.getMessages().add(message);
		   roomRepository.save(room);
	   }else {
		   throw new RuntimeException("room not found");
	   }
	   
	   return message;
   }
}
