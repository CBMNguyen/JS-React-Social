import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Zoom } from "react-toastify";
import BackPackImg from "../assets/backpack.png";
import CalendarImg from "../assets/calendar.png";
import ClockImg from "../assets/clock.png";
import FlagImg from "../assets/flag.png";
import FlowerImg from "../assets/flower.png";
import FriendImg from "../assets/friend.png";
import GImg from "../assets/g.png";
import gameImg from "../assets/game.png";
import MessengerGreenImg from "../assets/greenMessenger.png";
import GroupImg from "../assets/group.png";
import HearthImg from "../assets/hearth.png";
import LabelImg from "../assets/label.png";
import LatestImg from "../assets/latest.png";
import liveImg from "../assets/live.png";
import MessengerImg from "../assets/messenger.png";
import payImg from "../assets/pay.png";
import VideoImg from "../assets/playVideo.png";
import PriestImg from "../assets/priest.png";
import PromoteImg from "../assets/promote.png";
import StarImg from "../assets/star.png";
import MarketImg from "../assets/store.png";
import VolumeImg from "../assets/volume.png";
import WeatherImg from "../assets/weather.png";
import WifiImg from "../assets/wifi.png";

export const sidebarList = [
  { name: "Bạn bè", img: FriendImg },
  { name: "Nhóm", img: GroupImg },
  {
    name: "Marketplace",
    img: MarketImg,
  },
  { name: "Watch", img: VideoImg },
  { name: "Kỷ niệm", img: ClockImg },
  { name: "Đã lưu", img: LabelImg },
  { name: "Trang", img: FlagImg },
  { name: "Sự kiện", img: CalendarImg },
  { name: "Việc làm", img: BackPackImg },
  { name: "Chiến dịch gây quỹ", img: HearthImg },
  { name: "Chơi game", img: gameImg },
  { name: "Facebook Pay", img: payImg },
  { name: "Gần đây nhất", img: LatestImg },
  {
    name: "Hoạt động quản cáo gần đây",
    img: PromoteImg,
  },
  { name: "Messenger", img: MessengerImg },
  { name: "Messenger nhí", img: MessengerGreenImg },
  { name: "Sức khỏe cảm xúc", img: FlowerImg },
  { name: "Thời tiết", img: WeatherImg },
  {
    name: "Trình quản lý quản cáo",
    img: WifiImg,
  },
  { name: "Trung tâm quản cáo", img: VolumeImg },
  { name: "Ứng phó khẩn cấp", img: PriestImg },
  { name: "Video chơi game", img: GImg },
  { name: "Video trực tiếp", img: liveImg },
  { name: "Yêu thích", img: StarImg },
];

export const shareList = [
  {
    name: "Video trực tiếp",
    icon: <VideoCameraFrontIcon htmlColor="red" className="shareIcon" />,
  },
  {
    name: "Ảnh/Video",
    icon: <PermMediaIcon htmlColor="green" className="shareIcon" />,
  },
  {
    name: "Cảm xúc/Hoạt động",
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
