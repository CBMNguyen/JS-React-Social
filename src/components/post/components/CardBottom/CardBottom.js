export const style = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    cursor: "pointer",
  },

  avatar: { width: 28, height: 28 },

  inputBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  inputRightBox: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    backgroundColor: "#f0f2f5",
    borderRadius: "20px",
  },

  form: {
    flexGrow: 1,
    height: 28,
    pl: 2,
    border: "none",
    backgroundColor: "inherit",
    borderRadius: "20px",
  },

  commentInput: {
    width: "100%",
    height: 28,
    border: "none",
    backgroundColor: "inherit",
    "&:focus": {
      outline: "none",
    },
  },

  showEmoji: {
    position: "absolute",
    zIndex: 2000,
    bottom: "42px",
    right: 0,
  },

  closeEmoji: {
    zIndex: 1999,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "transparent",
  },
};
