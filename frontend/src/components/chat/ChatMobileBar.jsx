import React from "react";

const ChatMobileBar = ({ onToggleSidebar, onNewChat, hasMessages = false }) => {
  return (
    <div className={`mobile-bar ${hasMessages ? 'chat-active' : ''}`}>
      <button className="mobile-menu-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        ☰
      </button>
      {!hasMessages && <h1 className="mobile-title">Nexus<span className="ai-badge">.AI</span></h1>}
      <button className="mobile-new-chat-btn" onClick={onNewChat} aria-label="New chat" title="New Chat">
        +
      </button>
    </div>
  );
};

export default ChatMobileBar;
