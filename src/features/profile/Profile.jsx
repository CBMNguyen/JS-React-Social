import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Divider, Paper, Stack } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/system";
import postApi from "api/post";
import userApi from "api/user";
import Feed from "components/feed/Feed";
import Messenger from "components/messenger/Messenger";
import Share from "components/share/Share";
import Topbar from "components/topbar/Topbar";
import { follow, unFollow } from "features/auth/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import NoAvatarImg from "../../assets/person/noAvatar.png";
import coverImg from "../../assets/post/9.jpeg";
import { ItemData, PersonalInformation } from "../../constants/global";

function Profile(props) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const [followed, setFollowed] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const { user } = await userApi.getUserById(id);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser(userId);
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async (id) => {
      try {
        const { posts } = await postApi.getPostOfMe(id);
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
    };
    user._id && fetchPosts(user._id);
  }, [user._id, dispatch]);

  useEffect(() => {
    setFollowed(currentUser.user.followings.includes(user._id));
  }, [currentUser.user, user._id]);

  useEffect(() => {
    const fetchFriends = async (id) => {
      try {
        const { friendList } = await userApi.getFriends(userId);
        setFriends(friendList);
      } catch (error) {
        console(error);
      }
    };
    fetchFriends(userId);
  }, [userId]);

  const handleFollowClick = async () => {
    try {
      followed && dispatch(unFollow(user._id));
      !followed && dispatch(follow(user._id));
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* This is Top Bar */}
      <Topbar />

      <Box sx={{ backgroundColor: "#f0f2f5" }}>
        {/* Profile Top */}
        <Box
          sx={{
            background:
              "linear-gradient(180deg,rgba(170, 167, 168, 1) 0%,rgba(227, 224, 224, 1) 19%,rgba(255, 255, 255, 1) 39%)",
          }}
        >
          <Box
            sx={{
              width: "970px",
              margin: "0 auto",
            }}
          >
            {/* Profile Top Cover Img & Profile Picture */}
            <Box
              sx={{
                height: "340px",
                position: "relative",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "320px",
                  objectFit: "cover",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
                src={coverImg}
                alt=""
              />

              <Box
                component="img"
                sx={{
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
                }}
                src={user.profilePicture || NoAvatarImg}
                alt=""
              />
            </Box>
            {/* Profile Top User Info */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="h1"
                sx={{ mt: "8px", textTransform: "capitalize" }}
              >
                {user?.username}
              </Box>
              <Box component="span" sx={{ fontWeight: 300 }}>
                {user?.desc || "..."}
              </Box>
              <Box component="span" sx={{ fontWeight: 400, color: "blue" }}>
                Chỉnh sửa
              </Box>
            </Box>

            <Divider sx={{ mt: 1 }} />
            {/* Profile Top Tabs  */}
            <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
              <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
              >
                <Tab disableRipple value="one" label="Bài Viết" />
                <Tab disableRipple value="two" label="Giới thiệu" />
                <Tab disableRipple value="three" label="Bạn bè" />
                <Tab disableRipple value="four" label="Ảnh" />
                <Tab disableRipple value="five" label="Xem thêm" />
              </Tabs>
              {/* Profile Top Follow & Unfollow Button */}
              {currentUser?.user?._id !== userId && (
                <Button
                  sx={{
                    padding: "2px 16px",
                    pr: "20px",
                    margin: "0 8px",
                    textTransform: "capitalize",
                  }}
                  onClick={handleFollowClick}
                  color="primary"
                  variant="contained"
                  disableElevation
                  startIcon={followed ? <RemoveIcon /> : <AddIcon />}
                >
                  {followed ? "Unfollow" : "Follow"}
                </Button>
              )}
              {/* Profile Top Edit Button */}
              <Button
                sx={{
                  margin: "0 8px",
                  padding: "2px 16px",
                  pr: "20px",
                  textTransform: "capitalize",
                }}
                disableElevation
                variant="contained"
                color="inherit"
                startIcon={<CreateIcon />}
              >
                Chỉnh sửa trang cá nhân
              </Button>
              {/* Profile Top More Button */}
              <Button
                sx={{
                  margin: "0 8px",
                  padding: "2px 16px",
                  pr: "20px",
                }}
                color="inherit"
                disableElevation
                variant="contained"
              >
                <MoreHorizIcon />
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Profile Bottom */}
        <Box sx={{ width: "970px", margin: "0 auto" }}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            {/* Profile Left Bottom */}
            <Box
              sx={{
                flex: 4,
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",

                marginTop: "20px",
              }}
            >
              {/* Profile Left Bottom Info */}
              <Paper
                elevation={2}
                sx={{
                  padding: "16px",
                  mb: "16px",
                  borderRadius: "8px",
                }}
              >
                <Box component="h2">Giới Thiệu</Box>

                <List>
                  {PersonalInformation(
                    user?.city || "un know",
                    user?.from || "un know",
                    user?.relationship?.length === 1
                      ? "Độc thân"
                      : user?.relationship?.length === 2
                      ? "Married"
                      : "un know",
                    `Tham gia vào tháng ${
                      new Date(user?.createdAt).getMonth() + 1
                    } năm ${new Date(new Date(user?.createdAt)).getFullYear()}`,
                    `Có ${user?.followers?.length} người theo dỗi`
                  ).map((item, index) => (
                    <ListItem sx={{ paddingLeft: 0 }} key={index}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
                </List>
                {/* Profile Left Bottom Info Button */}
                <Box
                  component="button"
                  sx={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 500,
                    fontSize: "15px",
                    backgroundColor: "#f0f2f5",
                    transition: "all 0.4s easy-in-out 0s",
                    "&:hover": {
                      backgroundColor: "#e0e4e7",
                      cursor: "pointer",
                    },
                  }}
                >
                  Chỉnh sửa chi tiết
                </Box>
              </Paper>
              {/* Profile Left Bottom Images */}
              <Paper
                elevation={2}
                sx={{
                  padding: "16px",
                  mb: "16px",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box component="h2">Ảnh</Box>
                  <Box sx={{ textDecoration: "none", color: "blue" }}>
                    Xem tất cả hình ảnh
                  </Box>
                </Box>
                {/* Images List */}
                <ImageList
                  sx={{
                    width: "100%",
                    height: "380px",
                    borderRadius: "8px",
                    mt: "16px",
                  }}
                  cols={3}
                >
                  {ItemData.map((item, index) => (
                    <ImageListItem key={index.toString()}>
                      <img
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Paper>
              {/* Profile Left Bottom Friends */}
              <Paper
                elevation={2}
                sx={{
                  padding: "16px",
                  mb: "16px",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box component="h2">Friends</Box>
                  <Box sx={{ textDecoration: "none", color: "blue" }}>
                    Xem tất bạn bè
                  </Box>
                </Box>
                <Box component="span">{friends.length} người bạn</Box>
                <ImageList
                  sx={{
                    width: "100%",
                    maxHeight: "460px",
                    borderRadius: "8px",
                    mt: "16px",
                  }}
                  cols={3}
                >
                  {friends.slice(0, 9).map((friend) => (
                    <Link
                      key={friend._id}
                      to={`/profile/${friend._id}`}
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      <ImageListItem sx={{ m: "4px" }}>
                        <img
                          src={`${friend?.profilePicture || NoAvatarImg}`}
                          srcSet={`${friend?.profilePicture || NoAvatarImg}`}
                          alt={friend?.username}
                          loading="lazy"
                          style={{ borderRadius: "8px" }}
                        />
                        <ImageListItemBar
                          title={friend?.username}
                          position="below"
                          sx={{
                            textAlign: "center",
                            textTransform: "capitalize",
                          }}
                        />
                      </ImageListItem>
                    </Link>
                  ))}
                </ImageList>
              </Paper>
            </Box>
            {/* Profile Right Bottom Post */}
            <Box sx={{ flex: 6 }}>
              <Box style={{ padding: "0 20px" }}>
                <Share />
              </Box>
              <Feed posts={posts} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Messenger />
    </>
  );
}

export default Profile;
