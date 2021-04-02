import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import SidebarActions from "./SidbearActions";
import { Search, User } from "react-feather";
import { Avatar } from "@material-ui/core";
import userIcon from "../../Assets/user.svg";
import portraitIcon from "../../Assets/portrait.jpg";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([
    {
      name: "Anurag pal",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
    {
      name: "Anurag pal",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
    {
      name: "Anurag pal",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
    {
      name: "Anurag pal",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
    {
      name: "Anurag pal",
      message: "Hi, Hope you're doing well! Welcome to the application.",
    },
  ]);

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
              <div key={i} className={styles.chat}>
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

export default Sidebar;
