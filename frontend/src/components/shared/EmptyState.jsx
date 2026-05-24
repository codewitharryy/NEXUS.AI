import React from "react";

const EmptyState = () => {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-state-icon">🚀</div>
      <h2>Welcome to NEXUS.AI</h2>
      <p>Start a conversation to explore the power of AI</p>
      <div className="empty-state-tips">
        <p style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: "1rem" }}>
          💡 Tip: Ask questions, get summaries, brainstorm ideas, or learn new concepts
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
