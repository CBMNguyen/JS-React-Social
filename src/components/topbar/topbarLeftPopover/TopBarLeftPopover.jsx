import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, CircularProgress, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import { BlackTooltip } from "constants/mui";
import React from "react";
import noAvatarImg from "../../../assets/person/noAvatar.png";
import { style } from "./TopBarLeftPopover";

function TopBarLeftPopover({
  name,
  user,
  users,
  SearchId,
  openSearch,
  loadingRef,
  anchorElSearch,
  handleItemClick,
  handleSearchClose,
  handleSearchNameChange,
  handleRemoveRecentUser,
}) {
  return (
    <Popover
      sx={style.container}
      id={SearchId}
      open={openSearch}
      anchorEl={anchorElSearch}
      onClose={handleSearchClose}
    >
      <Paper elevation={5} sx={style.paper}>
        <Box sx={style.searchContainer}>
          <IconButton sx={style.searchIconButton} onClick={handleSearchClose}>
            <ArrowBackIcon />
          </IconButton>

          <Box component="div" sx={style.searchWrapper}>
            <SearchIcon sx={style.searchIcon} />

            <Box
              sx={style.searchInput}
              value={name}
              component="input"
              placeholder="Search on Facebook"
              onChange={handleSearchNameChange}
            />
          </Box>
        </Box>

        {name === "" && users.length > 0 && (
          <Box sx={style.recentSearchContainer}>
            <Box sx={style.recentSearchText}>Recent seach</Box>

            <BlackTooltip title="Tính năng này sẽ sớm được hoàn thành">
              <Box sx={style.recentSearchEditButton}>Chỉnh sửa</Box>
            </BlackTooltip>
          </Box>
        )}

        {loadingRef.current && name !== "" && (
          <CircularProgress
            sx={style.circularProgress}
            color="info"
            size={20}
          />
        )}

        <List>
          {users.length > 0 &&
            users.map((u) => (
              <ListItem key={u._id} sx={style.listItem} disablePadding>
                <ListItemButton sx={style.listItemButton}>
                  <Box
                    sx={style.listItemButtonWrapper}
                    onClick={() => handleItemClick(u)}
                  >
                    <Avatar
                      sx={{ mr: 2 }}
                      src={
                        u?.profilePicture?.length > 0
                          ? `${process.env.REACT_APP_API_URL}/${
                              user?.profilePicture[
                                user?.profilePicture?.length - 1
                              ]
                            }`
                          : noAvatarImg
                      }
                    />
                    <ListItemText primary={u.username} />
                  </Box>
                  {name === "" && users.length > 0 && (
                    <IconButton onClick={() => handleRemoveRecentUser(u)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          {name !== "" && !loadingRef.current && users.length === 0 && (
            <Box sx={style.notfound}>User not found 🐱‍🏍</Box>
          )}
        </List>
      </Paper>
    </Popover>
  );
}

export default TopBarLeftPopover;
