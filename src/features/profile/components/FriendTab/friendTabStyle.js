export const style = {
  friendTabWrapper: {
    padding: "16px",
    mt: "20px",
    borderRadius: "8px",
  },

  friendTabHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },

  friendTabSearchBox: {
    display: "flex",
    alignItems: "center",
    width: "200px",
    height: "38px",
    mx: 1 / 2,
    borderRadius: "20px",
    backgroundColor: "#f0f2f5",
  },

  friendTabSearchIcon: {
    mx: 1 / 2,
    ml: 1,
    color: "#606770",
  },

  friendTabSearchInput: {
    border: "none",
    background: "inherit",
    "&:focus": { outline: "none" },
  },

  friendTabHeaderItem: {
    mx: 1 / 2,
    fontWeight: "600",
    padding: "8px",
    borderRadius: "8px",
    color: "#1877f2",
    "&:hover": {
      backgroundColor: "#f0f2f5",
      cursor: "pointer",
    },
  },

  friendTabHeaderItemMoreIcon: {
    ml: 1,
    padding: "2px 8px",
    "&:hover": { backgroundColor: "lightgray" },
  },
};
