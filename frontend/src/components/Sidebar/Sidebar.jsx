import React from "react";
import ChatHistoryList from "./ChatHistoryList";

const Sidebar = ({ chats, activeChatId, onNewChat, onSelectChat, onClose, isOpen }) => {
  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`} role="navigation" aria-label="Chat sidebar">
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={onNewChat} aria-label="Create new chat">
            <span className="plus-icon">+</span>
            <span>New Chat</span>
          </button>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <ChatHistoryList
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={onSelectChat}
        />

        <div className="sidebar-footer">
          <button className="sidebar-footer-btn" aria-label="Settings">⚙️ Settings</button>
          <button className="sidebar-footer-btn" aria-label="Help">❓ Help</button>
        </div>
      </aside>

      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
    </>
  );
};

export default Sidebar;
