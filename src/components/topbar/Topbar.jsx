import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import { getConversations } from "app/messengerSlice";
import ShowConversations from "components/showConversations/ShowConversations";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noAvatarImg from "../../assets/person/noAvatar.png";
import "./topbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Badge } from "@mui/material";
import logo from "../../assets/logo.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StoreIcon from "@mui/icons-material/Store";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Topbar(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { conversations } = useSelector((state) => state.messenger);
  const [showConversations, setShowConversations] = useState(false);

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        await dispatch(getConversations(user._id));
      } catch (error) {
        console.log(error);
      }
    };
    user._id && fetchConversations();
  }, [user._id, dispatch]);

  return (
    <AppBar
      elevation={1}
      position="sticky"
      sx={{
        backgroundColor: "#fff !important",
        top: 0,
        height: "64px",
      }}
    >
      <Toolbar>
        <Box sx={{ flex: 2.5, display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ mr: 2, width: 38, height: 38, objectFit: "cover" }}
            src={logo}
            alt="logo"
          />

          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "38px",
              backgroundColor: "#f1f2f5",
              borderRadius: "30px",
            }}
          >
            <SearchIcon sx={{ fontSize: "20px", ml: "10px", color: "#0008" }} />
            <Box
              component="input"
              sx={{
                border: "none",
                "&:focus": {
                  outline: "none",
                },
                backgroundColor: "inherit",
              }}
              placeholder="Search on Facebook"
            ></Box>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 6,
          }}
        >
          <Tabs
            sx={{
              width: "90%",
              marginLeft: "10%",
            }}
            centered
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
          >
            <Tab
              disableRipple
              value="one"
              label={<HomeIcon sx={{ fontSize: "28px", marginY: "4px" }} />}
            ></Tab>

            <Tab
              disableRipple
              value="two"
              label={
                <Badge
                  sx={{ marginY: "2px" }}
                  badgeContent={99}
                  max={10}
                  color="error"
                >
                  <OndemandVideoIcon
                    sx={{ fontSize: "28px", marginY: "4px" }}
                  />
                </Badge>
              }
            />

            <Tab
              disableRipple
              value="three"
              label={<StoreIcon sx={{ fontSize: "28px", marginY: "4px" }} />}
            />

            <Tab
              disableRipple
              value="four"
              label={<GroupsIcon sx={{ fontSize: "28px", marginY: "4px" }} />}
            />

            <Tab
              disableRipple
              value="five"
              label={
                <Badge
                  sx={{ marginY: "2px" }}
                  badgeContent={99}
                  max={10}
                  color="error"
                >
                  <SportsEsportsIcon sx={{ fontSize: "28px" }} />
                </Badge>
              }
            />
          </Tabs>
        </Box>

        <Box
          sx={{
            flex: 3.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Link className="link" to={`/profile/${user?._id}`}>
              <Box
                component="div"
                sx={{
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
                }}
              >
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  src={user?.profilePicture || noAvatarImg}
                  alt="avatar"
                />

                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    textTransform: "capitalize",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  {user?.username}
                </Box>
              </Box>
            </Link>

            <Tooltip title="Menu">
              <IconButton sx={{ backgroundColor: "#f0f2f5" }}>
                <AppsIcon sx={{ color: "#000" }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Messenger">
              <IconButton
                onClick={() => setShowConversations(!showConversations)}
                sx={{ backgroundColor: "#f0f2f5", mx: 2 }}
              >
                <Badge badgeContent={1} max={10} color="error">
                  <ChatIcon
                    color="primary"
                    sx={!showConversations && { color: "#000" }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton sx={{ backgroundColor: "#f0f2f5" }}>
                <NotificationsIcon sx={{ color: "#000" }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Account">
              <IconButton sx={{ backgroundColor: "#f0f2f5", mx: 2 }}>
                <Badge variant="dot" color="error">
                  <ArrowDropDownIcon sx={{ color: "#000" }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>

      <Box component="div">
        {showConversations && (
          <ShowConversations
            currentUser={user}
            conversations={conversations}
            showConversations={true}
            setShowConversations={setShowConversations}
          />
        )}
      </Box>
    </AppBar>
  );
}

export default Topbar;
