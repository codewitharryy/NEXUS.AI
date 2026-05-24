import React from "react";

const ChatHeader = ({ onMenuClick, chatTitle = "" }) => {
  return (
    <header className="chat-header" role="banner">
      <button 
        className="menu-btn" 
        onClick={onMenuClick}
        aria-label="Open sidebar menu"
        title="Open menu"
      >
        ☰
      </button>
      <h1 className="chat-title">{chatTitle}</h1>
      <div className="header-spacer" />
    </header>
  );
};

export default ChatHeader;
