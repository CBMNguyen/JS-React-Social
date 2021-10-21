import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
import "./profile.css";

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

  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileTopWrapper">
          <div className="profileTop">
            <div className="profileCover">
              <div className="profileCoverContainer">
                <img className="profileCoverImg" src={coverImg} alt="" />
              </div>
              <img
                className="profileUserImg"
                src={user.profilePicture || NoAvatarImg}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h1 className="profileInfoName">{user?.username}</h1>
              <span className="profileInfoDesc">{user?.desc || "..."}</span>
              <span className="profileInfoDesc">Chỉnh sữa</span>
              {currentUser?.user?._id !== userId && (
                <button
                  onClick={handleFollowClick}
                  className="profileFollowButton"
                >
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <RemoveIcon /> : <AddIcon />}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="profileBottomWrapper">
          <div className="profileBottom">
            <div className="profileBottomLeft">
              <div className="profileBottomLeftInfo">
                <h2 className="profileBottomLeftInfoTitle">Giới Thiệu</h2>
                <List>
                  {PersonalInformation(
                    "Sống tại Vĩnh Long",
                    "Đến từ Bình Minh",
                    "Độc thân",
                    "Tham gia vào tháng 12 năm 2014",
                    "Có 211 người theo dỗi"
                  ).map((item) => (
                    <ListItem sx={{ paddingLeft: 0 }} key={item.name}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
                </List>
                <button className="profileBottomLeftInfoButton">
                  Chỉnh sửa chi tiết
                </button>
              </div>

              <div className="profileBottomLeftInfoImages">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2 className="profileBottomLeftImagesTitle">Ảnh</h2>
                  <div style={{ textDecoration: "none", color: "blue" }}>
                    Xem tất cả hình ảnh
                  </div>
                </div>
                <ImageList
                  sx={{
                    width: "100%",
                    height: "380px",
                    borderRadius: "8px",
                    mt: "16px",
                  }}
                  cols={3}
                >
                  {ItemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>

              <div className="profileBottomLeftInfoFriends">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2 className="profileBottomLeftFriendsTitle">Friends</h2>
                  <div style={{ textDecoration: "none", color: "blue" }}>
                    Xem tất bạn bè
                  </div>
                </div>
                <div>{friends.length}người bạn</div>
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
                      <ImageListItem sx={{ m: "4px" }} key={friend?.name}>
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
              </div>
            </div>
            <div className="profileBottomFeed">
              <div style={{ padding: "0 20px" }}>
                <Share />
              </div>
              <Feed posts={posts} />
            </div>
          </div>
        </div>
      </div>

      <Messenger />
    </>
  );
}

export default Profile;
