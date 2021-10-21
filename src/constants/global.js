import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatIcon from "@mui/icons-material/Chat";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EventIcon from "@mui/icons-material/Event";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HouseIcon from "@mui/icons-material/House";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import RoomIcon from "@mui/icons-material/Room";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SchoolIcon from "@mui/icons-material/School";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Zoom } from "react-toastify";

export const sidebarList = [
  { name: "Feed", icon: <RssFeedIcon className="sidebarIcon" /> },
  { name: "Chat", icon: <ChatIcon className="sidebarIcon" /> },
  { name: "Videos", icon: <PlayCircleFilledIcon className="sidebarIcon" /> },
  { name: "Groups", icon: <GroupIcon className="sidebarIcon" /> },
  { name: "Bookmarks", icon: <BookmarkIcon className="sidebarIcon" /> },
  { name: "Questions", icon: <HelpOutlineIcon className="sidebarIcon" /> },
  { name: "Jobs", icon: <WorkOutlineIcon className="sidebarIcon" /> },
  { name: "events", icon: <EventIcon className="sidebarIcon" /> },
  { name: "Coures", icon: <SchoolIcon className="sidebarIcon" /> },
];

export const shareList = [
  {
    name: "Photo or Video",
    icon: <PermMediaIcon htmlColor="tomato" className="shareIcon" />,
  },
  { name: "Tag", icon: <LabelIcon htmlColor="blue" className="shareIcon" /> },
  {
    name: "Location",
    icon: <RoomIcon htmlColor="green" className="shareIcon" />,
  },
  {
    name: "Feelings",
    icon: <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />,
  },
];

export const PersonalInformation = (
  city,
  from,
  relationship,
  createdAt,
  followers
) => [
  {
    name: city,
    icon: <HouseIcon />,
  },

  {
    name: from,
    icon: <LocationOnIcon />,
  },

  {
    name: relationship,
    icon: <FavoriteIcon />,
  },

  {
    name: createdAt,
    icon: <WatchLaterIcon />,
  },

  {
    name: followers,
    icon: <RssFeedIcon />,
  },
];

export const ItemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
];

export const PRODUCT_TOAST_OPTIONS = {
  autoClose: 2000,
  hideProgressBar: true,
  transition: Zoom,
};
