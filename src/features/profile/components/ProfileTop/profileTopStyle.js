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
    "&:active": { transform: "scale(0.98)" },
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
    textTransform: "initial",
    "&:active": { transform: "scale(0.98)" },
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
