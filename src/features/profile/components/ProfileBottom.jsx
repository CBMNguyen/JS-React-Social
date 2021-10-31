import { Box } from "@mui/system";
import Feed from "components/feed/Feed";
import { default as React } from "react";
import { TabPanel } from "utils/common";
import FriendTab from "./FriendTab";
import ProfileBottomFriendList from "./ProfileBottomFriendList";
import ProfileBottomImageList from "./ProfileBottomImageList";
import ProfileBottomInfo from "./ProfileBottomInfo";

function ProfileBottom({ value, user, friends, posts }) {
  return (
    <Box sx={{ width: "970px", margin: "0 auto", paddingBottom: "20px" }}>
      <TabPanel value={value} index={0}>
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
            <ProfileBottomInfo user={user} />

            {/* Profile Left Bottom Images */}
            <ProfileBottomImageList />

            {/* Profile Left Bottom Friends */}
            <ProfileBottomFriendList friends={friends} />
          </Box>
          {/* Profile Right Bottom Post */}
          <Box sx={{ flex: 6 }}>
            <Feed posts={posts} />
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <FriendTab user={user} friends={friends} />
      </TabPanel>
    </Box>
  );
}

export default ProfileBottom;
