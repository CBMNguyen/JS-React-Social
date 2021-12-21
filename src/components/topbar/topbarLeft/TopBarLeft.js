export const style = {
  container: {
    position: "relative",
    alignItems: "center",
    display: "flex",
    flex: 2.5,
  },

  avatar: { mr: 2, width: 38, height: 38, objectFit: "cover" },

  wrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "38px",
    borderRadius: "30px",
    backgroundColor: "#f0f2f5",
  },

  searchIcon: { fontSize: "20px", ml: "10px", color: "#0008" },

  input: {
    border: "none",
    "&:focus": {
      outline: "none",
    },
    backgroundColor: "inherit",
  },
};
