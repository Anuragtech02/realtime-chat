import React from "react";
import styles from "./SidebarActions.module.scss";
import { MessageCircle, User, Settings } from "react-feather";
import { IconButton, Avatar, Tooltip, makeStyles } from "@material-ui/core";
import portrait from "../../Assets/portrait.jpg";

const SidebarActions = () => {
  const classes = useStyles();

  const actions = [
    {
      name: "account",
      icon: User,
    },
    {
      name: "chat",
      icon: MessageCircle,
    },
    {
      name: "settings",
      icon: Settings,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h4>RC</h4>
      </div>
      <div className={styles.actions}>
        {actions.map((item) => (
          <div key={item.name} className={styles.actionItem}>
            <Tooltip title={item.name} placement="right">
              <IconButton>
                <item.icon color="rgba(255,255,255,0.8)" />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </div>
      <div className={styles.account}>
        <Avatar
          variant="rounded"
          alt="profile"
          src={portrait}
          className={classes.medium}
        >
          CA
        </Avatar>
      </div>
    </div>
  );
};

export default SidebarActions;

const useStyles = makeStyles((theme) => ({
  medium: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));
