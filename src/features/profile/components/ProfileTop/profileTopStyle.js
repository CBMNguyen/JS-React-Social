export const style = {
  flexAlignItemCenter: {
    display: "flex",
    alignItems: "center",
  },

  profileTopBg: {
    background:
      "linear-gradient(180deg,rgba(170, 167, 168, 1) 0%,rgba(227, 224, 224, 1) 19%,rgba(255, 255, 255, 1) 39%)",
  },

  profileTopWidth: {
    width: "970px",
    margin: "0 auto",
  },

  profileTopWrapper: {
    height: "340px",
    position: "relative",
  },

  profileTopCoverImg: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    cursor: "pointer",
  },

  profileTopEditButton: {
    position: "absolute",
    bottom: "38px",
    right: "20px",
    color: "#222",
    backgroundColor: "#fff",
    textTransform: "initial",
    borderRadius: "6px",
    "&:hover": {
      backgroundColor: "#f0f2f5",
    },
    "&:active": { transform: "scale(0.98)" },
  },

  profileTopAvatarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "164px",
    height: "164px",
    padding: "4px",
    margin: "auto",
    borderRadius: "50%",
    backgroundColor: "#fff",
    objectFit: "cover",
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(0.95)",
    },
  },

  profileTopAvatarWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    "&:active": { transform: "scale(0.96)", filter: "brightness(0.75)" },
  },

  profileTopCameraIcon: {
    position: "absolute",
    bottom: "4px",
    right: "8px",
    width: "34px",
    height: "34px",
    backgroundColor: "#ddd",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },

  profileTopButton: {
    marginX: 1 / 2,
    padding: "5px 14px",
    textTransform: "initial",
    "&:active": { transform: "scale(0.98)" },
  },

  profileTopTextArea: {
    width: "280px",
    height: "74px",
    padding: "8px 12px",
    resize: "none",
    borderColor: "#ccd0d5",
    borderRadius: "6px",
    color: "#333",
    backgroundColor: "#f0f2f5",
    fontWeight: 500,
    fontSize: "16px",
    textAlign: "center",

    "&:hover": { backgroundColor: "#e3e6e9" },
    "&:focus": {
      outline: "none",
      borderColor: "#1976d2",
      backgroundColor: "#f0f2f5",
    },
  },

  profileTopCancelButton: {
    mr: 1,
    padding: "8px 10px",
    border: "none",
    borderRadius: "6px",
    fontWeight: 500,
    fontSize: "15px",
    color: "#444",
    backgroundColor: "#e4e6eb",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#ddd",
    },
  },

  profileTopSaveButton: {
    padding: "8px 10px",
    border: "none",
    borderRadius: "6px",
    fontWeight: 500,
    fontSize: "15px",
    color: "#fff",
    backgroundColor: "#1479fb",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#136de2",
    },
    "&:disabled": {
      color: "#888",
      cursor: "not-allowed",
      backgroundColor: "#ddd",
    },
  },
};

export const profileTopTabStyle = (value, index) => {
  const style =
    value !== index
      ? {
          textTransform: "initial",
          "&:hover": {
            backgroundColor: "#f0f2f5",
            borderRadius: "8px",
          },
        }
      : { textTransform: "initial" };
  return style;
};
