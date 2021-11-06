const style = {
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container: {
    flex: 3.5,
    height: "calc(100vh - 62px)",
    overflow: "scroll",
    position: "sticky",
    top: "62px",
  },

  wrapper: {
    padding: "20px 20px 0 0",
  },

  birthdayBox: {
    padding: 2,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
  },

  birthdayLogo: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
    objectFix: "cover",
  },

  sponsorBox: {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    mb: "20px",
  },

  sponsorWrapper: {
    display: "flex",
    padding: 1,
    borderRadius: "8px",
  },

  sponsorImg: {
    width: "150px",
    height: "80px",
    borderRadius: "8px",
    objectFit: "cover",
    boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.1)",
  },

  sponsorLeftWrapper: {
    display: "flex",
    flexDirection: "column",
    ml: 2,
  },
};

export default style;
