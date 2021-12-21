export const style = {
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  emojiWrapper: { flexDirection: "row", alignItems: "center" },

  emojiImg: {
    width: "34px",
    height: "34px",
    paddingX: "4px",
    mt: "2px",

    transition: "all 0.5s easy-in-out 0s",
    "&:hover": {
      position: "relative",
      marginTop: "-10px",
      cursor: "pointer",
    },
  },

  Button: {
    width: 1 / 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "38px",
    "&:hover": {
      backgroundColor: "#eee",
    },
  },

  avatarInButton: { width: "20px", height: "20px" },
};
