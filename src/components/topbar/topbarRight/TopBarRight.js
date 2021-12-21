export const style = {
  container: {
    flex: 3.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  wrapper: { display: "flex" },

  avatarWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "0.3rem 0.6rem",
    marginX: 2,
    borderRadius: "20px",
    transition: "all 0.2s ease-in-out 0s",
    "&:hover": {
      backgroundColor: "#f0f2f5",
      cursor: "pointer",
    },
  },

  avatar: { width: 28, height: 28 },

  username: {
    ml: 1,
    textTransform: "capitalize",
    color: "#000",
    fontWeight: "500",
  },

  iconButton: { backgroundColor: "#f0f2f5" },

  icon: { color: "#000" },
};
