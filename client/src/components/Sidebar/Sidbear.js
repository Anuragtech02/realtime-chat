import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import SidebarActions from "./SidbearActions";
import { Search } from "react-feather";

const Sidebar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.actionsContainer}>
        <SidebarActions />
      </div>

      <div className={styles.detailSide}>
        <div className={styles.search}>
          <Search size="1.2rem" />
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
