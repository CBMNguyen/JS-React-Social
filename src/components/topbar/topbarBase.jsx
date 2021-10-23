import React from 'react';

};

function topbarBase(props) {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="logo">
          <Link className="link" to="/">
            Facebook
          </Link>
        </div>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Tooltip title="Add Friends">
              <div className="topbarIconWrapper">
                <PersonIcon />
                <span className="topbarIconBadge">1</span>
              </div>
            </Tooltip>
          </div>

          <div
            className="topbarIconItem"
            onClick={() => setShowConversations(!showConversations)}
          >
            <Tooltip title="Messenger">
              <div className="topbarIconWrapper">
                <ChatIcon />
                <span className="topbarIconBadge">1</span>
              </div>
            </Tooltip>
          </div>

          <div className="topbarIconItem">
            <Tooltip title="Notifications">
              <div className="topbarIconWrapper">
                <NotificationsIcon />
                <span className="topbarIconBadge">1</span>
              </div>
            </Tooltip>
          </div>
        </div>

        <Link className="link" to={`/profile/${user?._id}`}>
          <div className="topbarImgWrapper">
            <img
              className="topbarImg"
              src={user?.profilePicture || noAvatarImg}
              alt="avatar"
            />
            <span className="topbarProfileName">{user?.username}</span>
          </div>
        </Link>
      </div>

      {showConversations && (
        <ShowConversations
          currentUser={user}
          conversations={conversations}
          showConversations={showConversations}
          setShowConversations={setShowConversations}
        />
      )}
    </div>
  );
}

export default topbarBase;