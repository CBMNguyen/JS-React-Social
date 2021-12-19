import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import { Switch } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export const BlackTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[4],
    fontSize: 12,
    padding: "10px 12px",
    borderRadius: "8px",
    backgroundColor: "#333",
  },
}));

export const LightTooltip = styled(({ className, ...props }) => (
  <ClickAwayListener
    onClickAway={() => {
      if (props.onClose) props.onClose();
    }}
  >
    <Tooltip {...props} classes={{ popper: className }} />
  </ClickAwayListener>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[2],
    fontSize: 11,
    maxWidth: 380,
    borderRadius: "8px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#fff",
  },
}));

export const TransparentTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[1],
    fontSize: 12,
    padding: "5px 10px",
    height: "38px",
    borderRadius: "20px",
    backgroundColor: "#fff",
  },
}));

export const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgb(255, 255, 255, 0.6);
  }
`;

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#1479fd" : "#1877f2",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
