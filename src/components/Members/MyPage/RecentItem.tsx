import React from "react";
import styles from "./MyPage.module.css";
import { RecentItemProps } from "./types";
import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const RecentItem: React.FC<RecentItemProps> = ({
  icon,
  title,
  alt,
  href,
}) => (
  <a href={href} style={{ textDecoration: "none" }}>
    <Button
      variant="text"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%", // 전체 버튼을 가로로 확장하여 텍스트와 아이콘을 양 끝으로 배치
      }}
    >
      <span style={{ color: "grey", textAlign: "left", flex: 1 }}>{title}</span>
      <ArrowForwardIcon style={{ color: "grey", textAlign: "right" }} />
    </Button>
  </a>

  // <div className={styles.recentItem}>

  //   <span className={styles.title}>{title}</span>
  //   <img src={icon} alt={alt || ""} className={styles.icon} />
  // </div>
);
