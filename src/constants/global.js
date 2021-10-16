import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatIcon from "@mui/icons-material/Chat";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LabelIcon from "@mui/icons-material/Label";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import RoomIcon from "@mui/icons-material/Room";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SchoolIcon from "@mui/icons-material/School";
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

export const PRODUCT_TOAST_OPTIONS = {
  autoClose: 2000,
  hideProgressBar: true,
  transition: Zoom,
};
