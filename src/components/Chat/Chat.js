import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://najah-chat.herokuapp.com/");

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState("");

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
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

  const sendMessage = () => {
    socket.emit("send messages", { content: "" });
  };

  const getMessages = () => {
    socket.emit("get messages");
  };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={getMessages}>Get Messages</button>
    </div>
  );
};

export default Chat;
