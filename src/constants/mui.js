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
