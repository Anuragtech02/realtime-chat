import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import SidebarActions from "./SidebarActions";
import { Search, User } from "react-feather";
import { Avatar } from "@material-ui/core";
import userIcon from "../../Assets/user.svg";
import portraitIcon from "../../Assets/portrait.jpg";
import { withRouter, useParams } from "react-router";
import clsx from "clsx";

const Sidebar = ({ history }) => {
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState("");
  const [chats, setChats] = useState([
    {
      name: "Anurag pal",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
    {
      name: "Kalash pal",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
    {
      name: "Aayush Singh",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
    {
      name: "Hello Boy",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
    {
      name: "Iron Man",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
  ]);

  const handleClickChat = (name) => {
    history.push(`/${room}/chat/${name}`);
  };

  const { name, room } = useParams();

  React.useEffect(() => {
    setCurrent(name);
  }, [name]);

  return (
    <aside className={styles.container}>
      <div className={styles.actionsContainer}>
        <SidebarActions />
      </div>

      <div className={styles.detailSide}>
        <div className={styles.search}>
          <Search color="rgba(0,0,0,0.6)" size="1.2rem" />
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.chats}>
          <h6>My Chats</h6>
          {chats?.length ? (
            chats.map((chat, i) => (
              <div
                onClick={() => handleClickChat(chat.name)}
                key={i}
                className={clsx(
                  styles.chat,
                  current === chat.name ? styles.selectedChat : ""
                )}
              >
                <Avatar
                  variant="rounded"
                  style={{ background: "rgba(0,0,0,0.1)" }}
                  src={portraitIcon}
                  alt="profile-photoo"
                />
                <div className={styles.chatUserInfo}>
                  <h6>{chat.name}</h6>
                  <p>{chat.message}</p>
                </div>
              </div>
            ))
          ) : (
            <span>
              <p>No chats yet</p>
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default withRouter(Sidebar);
