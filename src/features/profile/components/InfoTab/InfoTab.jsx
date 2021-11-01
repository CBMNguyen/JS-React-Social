import { Paper, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/system";
import { default as React } from "react";
import { profileTabInfoItemStyle, TabPanel } from "utils/common";
import FriendTab from "../FriendTab/FriendTab";
import BacsicContactInfo from "./BasicContactInfo";
import DetailAboutYou from "./DetailAboutYou";
import { style } from "./infoTabStyle";
import LifeEvents from "./LifeEvents";
import LiveIn from "./LiveIn";
import Overview from "./Overview";
import RelationShip from "./RelationShip";
import WorkAndEducation from "./WorkAndEducation";
function InfoTab({ user, friends }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Paper elevation={2} sx={style.infoTabBox}>
        <Box sx={style.infoTabWrapper}>
          <Stack sx={{ flex: 3 }}>
            <Box component="h2">Giới thiệu</Box>
            <Tabs
              sx={style.infoTabTabs}
              TabIndicatorProps={{
                style: {
                  display: "none",
                },
              }}
              orientation="vertical"
              value={value}
              onChange={handleChange}
            >
              <Tab
                className="MuiTab-fullWidth"
                sx={profileTabInfoItemStyle(value, 0)}
                disableRipple
                value={0}
                label={
                  <Box sx={{ textAlign: "left", width: "100%" }}>Tổng quan</Box>
                }
              />
              <Tab
                sx={profileTabInfoItemStyle(value, 1)}
                disableRipple
                value={1}
                label={
                  <Box sx={{ textAlign: "left", width: "100%" }}>
                    Công việc và học vấn
                  </Box>
                }
              />
              <Tab
                sx={profileTabInfoItemStyle(value, 2)}
                disableRipple
                value={2}
                label={
                  <Box sx={{ textAlign: "left", width: "100%" }}>
                    Nơi từng sống
                  </Box>
                }
              />
              <Tab
                sx={profileTabInfoItemStyle(value, 3)}
                disableRipple
                value={3}
                label={
                  <Box sx={{ textAlign: "left", width: "100%" }}>
                    Thông tin liên hệ cơ bản
                  </Box>
                }
              />
              <Tab
                sx={profileTabInfoItemStyle(value, 4)}
                disableRipple
                value={4}
                label={
                  <Box sx={{ textAlign: "left", width: "100%" }}>
                    Gia đình và các mối quan hệ
                  </Box>
                }
              />
              <Tab
                sx={profileTabInfoItemStyle(value, 5)}
                disableRipple
                value={5}
                label={
                  <Box sx={{ textAlign: "left", width: "100%" }}>
                    Chi tiết về bạn
                  </Box>
                }
              />
              <Tab
                sx={profileTabInfoItemStyle(value, 6)}
                disableRipple
                value={6}
                label={
                  <Box sx={{ textAlign: "left", width: "100%" }}>
                    Sự kiện trong đời
                  </Box>
                }
              />
            </Tabs>
          </Stack>

          <Stack
            sx={{
              flex: 7,
            }}
          >
            <TabPanel value={value} index={0}>
              <Overview user={user} />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <WorkAndEducation user={user} />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <LiveIn user={user} />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <BacsicContactInfo user={user} />
            </TabPanel>

            <TabPanel value={value} index={4}>
              <RelationShip user={user} />
            </TabPanel>

            <TabPanel value={value} index={5}>
              <DetailAboutYou user={user} />
            </TabPanel>

            <TabPanel value={value} index={6}>
              <LifeEvents user={user} />
            </TabPanel>
          </Stack>
        </Box>
      </Paper>

      <FriendTab user={user} friends={friends} />
    </Box>
  );
}

export default InfoTab;
