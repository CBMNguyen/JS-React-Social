export const style = {
  container: {
    position: "absolute",
    top: "-15px",
    left: "-78px",
  },

  paper: { width: "350px" },

  searchContainer: {
    display: "flex",
    alignItems: "center",
    height: "62px",
    paddingX: "20px",
  },

  searchIcon: { fontSize: "20px", ml: "10px", color: "#0008" },

  searchIconButton: { mr: 2, width: 38, height: 38, objectFit: "cover" },

  searchWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "38px",

    borderRadius: "30px",
    backgroundColor: "#f0f2f5",
  },

  searchInput: {
    border: "none",
    "&:focus": {
      outline: "none",
    },
    backgroundColor: "inherit",
  },

  recentSearchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",
    marginX: "20px",
  },

  recentSearchText: { fontWeight: "500", fontSize: "18px", pt: 1 },

  recentSearchEditButton: {
    padding: "10px 16px",
    borderRadius: "4px",
    color: "#5490e3",
    fontSize: "14px",

    "&:hover": {
      backgroundColor: "#eee",
      cursor: "pointer",
    },
  },

  circularProgress: { marginX: "auto", display: "block" },

  listItem: { paddingX: 1, textDecoration: "none" },

  listItemButton: { borderRadius: "8px" },

  listItemButtonWrapper: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },

  notfound: {
    textAlign: "center",
    color: "#888",
    fontSize: "14px",
  },
};
