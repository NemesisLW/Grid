"use client";
import "../styles/chatbubble.css";

import { useState } from "react";

const ChatBubble = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={`chat ${isActive ? "active" : ""}`} onClick={toggleActive}>
      <div className="background"></div>
      <svg
        className="chat-bubble"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <g className="bubble">
          <path
            className="line line1"
            d="M 30.7873,85.113394 30.7873,46.556405 C 30.7873,41.101961
        36.826342,35.342 40.898074,35.342 H 59.113981 C 63.73287,35.342
        69.29995,40.103201 69.29995,46.784744"
          />
          <path
            className="line line2"
            d="M 13.461999,65.039335 H 58.028684 C
          63.483128,65.039335
          69.243089,59.000293 69.243089,54.928561 V 45.605853 C
          69.243089,40.986964 65.02087,35.419884 58.339327,35.419884"
          />
        </g>
        <circle className="circle circle1" r="1.9" cy="50.7" cx="42.5" />
        <circle className="circle circle2" cx="49.9" cy="50.7" r="1.9" />
        <circle className="circle circle3" r="1.9" cy="50.7" cx="57.3" />
      </svg>
    </div>
  );
};

export default ChatBubble;
