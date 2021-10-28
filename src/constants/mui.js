import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

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
  <Tooltip {...props} classes={{ popper: className }} />
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
