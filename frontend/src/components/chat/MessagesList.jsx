import React from "react";
import MessageBubble from "../shared/MessageBubble";
import TypingIndicator from "../shared/TypingIndicator";
import EmptyState from "../shared/EmptyState";

const MessagesList = ({ messages, isSending, messagesEndRef }) => {
  return (
    <div className="messages-wrapper">
      <div className="messages-container">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}

        {isSending && <TypingIndicator />}
      </div>
      <div ref={messagesEndRef} className="messages-end" />
    </div>
  );
};

export default MessagesList;
