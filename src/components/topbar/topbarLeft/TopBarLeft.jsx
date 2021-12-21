import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { style } from "./TopBarLeft";
import TopBarLeftPopover from "../topbarLeftPopover/TopBarLeftPopover.jsx";
import userApi from "api/user";

function TopBarLeft({ user }) {
  const history = useHistory();
  const loadingRef = useRef();
  const typingTimeoutRef = useRef(null); // keep time value
  const [name, setName] = useState("");

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("recentUsers")) || [];
  });

  const [anchorElSearch, setAnchorElSearch] = useState(null);

  // handle show user search bar
  const handleSearchClick = (event) => {
    setAnchorElSearch(event.currentTarget);
  };

  // handle hide user search bar
  const handleSearchClose = () => {
    setAnchorElSearch(null);
  };

  const handleItemClick = (User) => {
    history.push(`/profile/${User._id}`);
    const recentUsers = JSON.parse(localStorage.getItem("recentUsers")) || [];

    const hasUser = recentUsers.some((u) => u._id === User._id);

    if (!hasUser) {
      localStorage.setItem(
        "recentUsers",
        JSON.stringify([
          ...recentUsers,
          {
            _id: User._id,
            profilePicture: User.profilePicture,
            username: User.username,
          },
        ])
      );
      setUsers([]);
    }
    handleSearchClose();
  };

  const handleRemoveRecentUser = (User) => {
    let recentUsers = JSON.parse(localStorage.getItem("recentUsers"));
    recentUsers = recentUsers.filter((u) => u._id !== User._id);
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers));
    setUsers(recentUsers);
  };

  const handleSearchNameChange = (e) => {
    loadingRef.current = true; // set loading when value change

    const value = e.target.value;
    setName(value);

    if (!value.trim())
      // check has white space
      setUsers(JSON.parse(localStorage.getItem("recentUsers")) || []);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(async () => {
      // setTimeOut repeat when value change
      try {
        const data = await userApi.getUserByName(value);
        const dataFilter = data.user.filter((u) => u._id !== user._id); // filter !== currentUser
        loadingRef.current = false; // turn off loading when fetch user success
        setUsers(dataFilter);
      } catch (error) {
        loadingRef.current = false;
      }
    }, 300);
  };

  const openSearch = Boolean(anchorElSearch);
  const SearchId = openSearch ? "simple-popover" : undefined;

  return (
    <Box sx={style.container}>
      {/* Avatar */}
      <Link to="/">
        <Avatar src={logo} alt="logo" sx={style.avatar} />
      </Link>

      {/* Top bar Left Wrapper */}
      <Box
        sx={style.wrapper}
        component="div"
        aria-describedby={SearchId}
        onClick={handleSearchClick}
      >
        <SearchIcon sx={style.searchIcon} />

        {/* Top bar Left Search Input */}
        <Box
          sx={style.input}
          value={name}
          component="input"
          placeholder="Search on Facebook"
          onChange={handleSearchNameChange}
        />
      </Box>

      {/*  Show Friend Search */}
      <TopBarLeftPopover
        name={name}
        user={user}
        users={users}
        SearchId={SearchId}
        openSearch={openSearch}
        loadingRef={loadingRef}
        anchorElSearch={anchorElSearch}
        handleItemClick={handleItemClick}
        handleSearchClose={handleSearchClose}
        handleSearchNameChange={handleSearchNameChange}
        handleRemoveRecentUser={handleRemoveRecentUser}
      />
    </Box>
  );
}

export default TopBarLeft;
