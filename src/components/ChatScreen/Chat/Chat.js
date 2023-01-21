import React, { useCallack, useState, useEffect } from "react";
import { ScrollView } from "react-native";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import { Button, TextInput, Text } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import { View } from "react-native-web";

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState("");
  const [roomNo, setRoomNo] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    socket.on("return rooms", (sessions) => {
      const parsedSessions = sessions.map((session) => ({
        ...session,
        messages: session.messages.map((message) => ({
          _id: uuidv4(),
          text: message.message,
          createdAt: message.written,
          user: {
            _id: uuidv4(),
            name: "stupid user",
            avatar: "https://placeimg.com/140/140/any",
          },
        })),
      }));
      setRoomMessages(parsedSessions);
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.emit("get rooms");

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("return rooms");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

  const sendMessage = () => {
    socket.emit("send messages", { content: message });
  };

  const getMessages = () => {
    socket.emit("get messages", roomNo);
  };

  const joinRoom = () => {
    socket.emit("join room", { roomNo });
  };

  const onSend = (newMsg) => {
    console.log(newMsg);
    setRoomMessages([...roomMessages, ...newMsg]);
  };

  return (
    <ScrollView>
      <Text>Connected: {"" + isConnected}</Text>
      <Text>Last pong: {lastPong || "-"}</Text>
      <Button onPress={sendPing}>Send ping</Button>
      <TextInput value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onPress={sendMessage}>Send Message</Button>
      <TextInput value={roomNo} onChange={(e) => setRoomNo(e.target.value)} />
      <Button onPress={joinRoom}>Join Room</Button>
      <Button onPress={getMessages}>Get Messages</Button>
      {roomMessages.forEach((room) => console.log(room.messages))}
      <View style={{ height: 1000, width: 1000 }}>
        <GiftedChat
          messages={roomMessages[0]?.messages}
          user={{ _id: 1, name: "me" }}
          onSend={(messages) => onSend(messages)}
        />
      </View>
    </ScrollView>
  );
};

export default Chat;
