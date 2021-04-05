import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams, withRouter } from "react-router-dom";
import styles from "./ChatArea.module.scss";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Send, Smile } from "react-feather";
import { GlobalContext } from "../Contexts/GlobalContext";
import { AuthContext } from "../Contexts/AuthContext";
import { useSocket } from "../Contexts/SocketContextProvider";
import io from "socket.io-client";
import clsx from "clsx";
import moment from "moment";

let socket;

const ENDPOINT = "http://localhost:5000/";

const ChatArea = () => {
  const { name, room } = useParams();
  const [emoji, setEmoji] = useState(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);

  const textAreaRef = useRef();

  const textAreaAdjust = () => {
    textAreaRef.current.style.height = "1px";
    textAreaRef.current.style.height =
      15 + textAreaRef.current.scrollHeight + "px";
  };

  const onEmojiClick = (e, emoji) => {
    setEmoji(emoji);
    setMessage((curr) => curr + emoji.emoji);
  };

  const handleClickEmoji = (e) => {
    setAnchor(e.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const { messages, sendMessage } = useContext(GlobalContext);
  const { currentUser } = useContext(AuthContext);
  const { socket, setRoomData } = useSocket();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("FCon");
    });
    socket.on("room-data", (data) => {
      console.log({ data });
      setRoomData(data);
    });
    // socket.on("receive-message", (msg) => {
    //   console.log({ msg });
    //   if (msg.recepient.toLowerCase() === currentUser.name.toLowerCase()) {
    //     // const newMessages = new Map(messages);
    //     // const prev = newMessages.get(msg.recepient) || [];
    //     // newMessages.set(msg.recepient, [...prev, msg]);
    //     setMessages((prev) => [...prev, msg]);
    //   }
    // });
  }, [socket, setRoomData]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("receive-message", (msg) => {
  //       console.log({ msg });
  //       if (msg.recepient.toLowerCase() === currentUser.name.toLowerCase()) {
  //         const newMessages = new Map(messages);
  //         const prev = newMessages.get(msg.recepient) || [];
  //         newMessages.set(msg.recepient, [...prev, msg]);
  //         setMessages(newMessages);
  //       }
  //     });
  //   }
  //   // return () => socket.off("receive-message");
  // }, [socket, currentUser, messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const newMessage = {
      sender: currentUser.name?.toLowerCase(),
      recepient: name?.toLowerCase(),
      room,
      message,
      date: moment().format("DD/MM/YY"),
    };
    // const newMessages = new Map(messages);
    // const prev = newMessages.get(currentUser.name) || [];
    // newMessages.set(currentUser.name, [...prev, newMessage]);
    // setMessages((prev) => [...prev, newMessage]);
    sendMessage(newMessage);
    setMessage("");
    // socket.emit("send-message", newMessage);
  };

  useEffect(() => {
    console.log(messages?.get(name?.toLowerCase()), messages);
  }, [messages, name]);

  function parseMessages() {
    console.log({ mes: [...messages].map(([name, value]) => value) });
    return [...messages].map(([name, value]) => value);
  }

  return (
    <div className={styles.container}>
      <Topbar name={name} />
      <div className={styles.chatArea}>
        <div className={styles.viewArea}>
          {messages
            ?.get(name?.toLowerCase())
            ?.messages?.map((msg, i) =>
              msg.sender.toLowerCase() === name.toLowerCase() ? (
                <SenderMessage key={i} msg={msg} />
              ) : (
                <OwnerMessage key={i} msg={msg} />
              )
            )}
        </div>
        <form onSubmit={handleMessageSubmit} className={styles.inputArea}>
          <textarea
            ref={textAreaRef}
            onKeyUp={textAreaAdjust}
            name="chat"
            rows="1"
            disabled={Boolean(!name)}
            required
            placeholder={
              name ? "Enter something" : "Please select a contact to start"
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={styles.actionBtns}>
            <IconButton type="submit">
              <Send />
            </IconButton>
            <div className={styles.selectEmoji}>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClickEmoji}
              >
                <Smile />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <div className={styles.emojiPicker}>
                    <Picker
                      onEmojiClick={onEmojiClick}
                      disableAutoFocus={true}
                      skinTone={SKIN_TONE_MEDIUM_DARK}
                      groupNames={{ smileys_people: "PEOPLE" }}
                      native
                    />
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(ChatArea);

const Topbar = ({ name }) => {
  return (
    <nav className={styles.topbar}>
      <h4>{name || "Chat Here"}</h4>
    </nav>
  );
};

const SenderMessage = ({ msg }) => {
  return (
    <div className={clsx(styles.message, styles.sender)}>
      <div className={styles.msgInner}>
        <p>{msg.message}</p>
      </div>
      <span>{msg.date}</span>
    </div>
  );
};

const OwnerMessage = ({ msg }) => {
  return (
    <div className={clsx(styles.message, styles.owner)}>
      <div className={styles.msgInner}>
        <p>{msg.message}</p>
      </div>
      <span>{msg.date}</span>
    </div>
  );
};
