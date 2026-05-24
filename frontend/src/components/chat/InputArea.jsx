import React, { useRef, useEffect } from "react";

const InputArea = ({ userInput, onInputChange, onSendMessage, onKeyPress, isSending, isConnected }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [userInput]);

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          className="message-input"
          value={userInput}
          onChange={onInputChange}
          onKeyPress={onKeyPress}
          placeholder={isConnected ? "Type your message here... (Shift + Enter for new line)" : "Connecting to server..."}
          rows="1"
          disabled={isSending || !isConnected}
          aria-label="Message input"
        />
        <button
          className="send-btn"
          onClick={onSendMessage}
          disabled={isSending || !userInput.trim() || !isConnected}
          title={isConnected ? "Send message (Ctrl + Enter)" : "Connecting..."}
          aria-label="Send message"
        >
          <span className="send-icon">↑</span>
        </button>
      </div>
      <p className="input-hint">
        NEXUS.AI v1.0 • {isConnected ? "Connected" : "Connecting..."}
      </p>
    </div>
  );
};

export default InputArea;
