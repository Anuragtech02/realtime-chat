import React, { useState, useRef } from "react";
import { useParams, withRouter } from "react-router-dom";
import styles from "./ChatArea.module.scss";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Send, Smile } from "react-feather";

const ChatArea = () => {
  const { name } = useParams();
  const [emoji, setEmoji] = useState(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [message, setMessage] = useState("");

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

  return (
    <div className={styles.container}>
      <Topbar name={name} />
      <div className={styles.chatArea}>
        <div className={styles.viewArea}></div>
        <div className={styles.inputArea}>
          <textarea
            ref={textAreaRef}
            onKeyUp={textAreaAdjust}
            name="chat"
            rows="1"
            placeholder="Enter something"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={styles.actionBtns}>
            <IconButton>
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

              {/* {emojiOpen && (
                <div className={styles.emojiPicker}>
                  <Picker
                    onEmojiClick={onEmojiClick}
                    disableAutoFocus={true}
                    skinTone={SKIN_TONE_MEDIUM_DARK}
                    groupNames={{ smileys_people: "PEOPLE" }}
                    native
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
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
