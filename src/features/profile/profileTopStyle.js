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
  },

  profileTopAvatarImg: {
    position: "absolute",
    top: "180px",
    left: 0,
    right: 0,

    width: "150px",
    height: "150px",
    margin: "auto",
    border: "4px solid white",
    borderRadius: "50%",
    objectFit: "cover",
  },

  profileTopButton: {
    marginX: 1,
    textTransform: "initial",
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
