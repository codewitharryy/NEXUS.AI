import React from "react";

const ChatHistoryList = ({ chats, activeChatId, onSelectChat }) => {
  return (
    <div className="chats-list">
      <h3 className="chats-title">Previous Chats</h3>
      {chats && chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${activeChatId === chat.id ? "active" : ""}`}
            onClick={() => onSelectChat(chat.id)}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectChat(chat.id);
              }
            }}
            aria-label={`Chat: ${chat.title}`}
            aria-current={activeChatId === chat.id ? "page" : undefined}
          >
            <div className="chat-item-content">
              <p className="chat-item-title">{chat.title}</p>
              <span className="chat-item-time">
                {chat.lastMessage?.substring(0, 50)}
                {chat.lastMessage?.length > 50 ? "..." : ""}
              </span>
              {chat.messageCount && (
                <span className="chat-item-meta">{chat.messageCount} messages</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="no-chats-message">No previous chats yet. Start a new conversation!</p>
      )}
    </div>
  );
};

export default ChatHistoryList;
