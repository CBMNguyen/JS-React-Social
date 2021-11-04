const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "720px",
    maxHeight: "620px",
    paddingBottom: 2,
    borderRadius: "12px",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
  },

  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    zIndex: 999,
  },

  title: {
    textAlign: "center",
    p: 2,
    fontSize: "22px",
  },

  closeButton: {
    position: "absolute",
    top: "10px",
    right: "20px",
    backgroundColor: "#f0f2f5",
  },

  main: { padding: 2, height: "460px", overflowY: "scroll" },

  lightgrayButton: {
    ml: "auto",
    borderRadius: "6px",
    color: "#111",
    backgroundColor: "#e4e6eb",
    fontWeight: 500,
    fontSize: "15px",
    textTransform: "initial",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#ddd",
    },
  },

  footer: {
    padding: 2,
    paddingBottom: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  updateInfoButton: {
    padding: "8px 10px",
    color: "#1479fb",
    fontWeight: "500",
    "&:hover": {
      borderRadius: "6px",
      backgroundColor: "#f0f2f5",
      cursor: "pointer",
    },
  },

  cancelButton: {
    mr: 1,
    padding: "10px 15px",
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

  saveButton: {
    padding: "10px 38px",
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
  },
};

export default style;
