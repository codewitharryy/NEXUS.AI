import React from "react";

const MessageBubble = ({ message }) => {
  return (
    <div 
      className={`message ${message.sender}`}
      role="article"
      aria-label={`Message from ${message.sender === "user" ? "you" : "AI"}`}
    >
      <div className="message-content">
        <p>{message.text}</p>
        {message.messageId && (
          <span className="message-id" style={{ fontSize: "0.75rem", opacity: 0.5 }}>
            ID: {message.messageId}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
