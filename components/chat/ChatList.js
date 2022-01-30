import React, { useEffect, useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import styled from "styled-components";

const ChatListSty = styled.div`
  list-style-type: none;
  background-color: var(--neutrals-600);
  height: 72vh;

  width: calc(100% - 2rem);
  border-radius: 4px;
  padding: 1rem 1.3rem;
  color: var(--neutrals-100);
  font-size: 1rem;

  overflow-y: scroll;

  .chatList__scrollCheckbox {
    position: absolute;
    bottom: 5px;
    left: 1rem;
    display: flex;
    align-items: baseline;

    input {
      display: none;
    }
    label {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 4px;
      margin-right: 0.4rem;
      border: 1px solid var(--primary-600);
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;

      &.scroll_true {
        background-color: var(--primary-500);
      }
    }
    span {
      font-size: 0.975rem;
      color: var(--neutrals-400);
      font-weight: 500;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-500);
  }
  ::-webkit-scrollbar-track {
    background: var(--neutrals-500);
  }

  .chat__container-singlePost {
    div {
      display: flex;
      gap: 0.2rem;
      margin-bottom: 0.5rem;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }

      .chat__container-singlePost-user {
        font-weight: 700;
        text-transform: capitalize;
      }
      .chat__container-singlePost-date {
        font-size: 12px;
        align-self: center;
        color: var(--neutrals-300);
        margin-inline: 1rem;
      }

      .btn__trash {
        background: transparent;
        border: 0;
        cursor: pointer;

        svg {
          font-size: 1.2rem;
          color: #c73434;
        }
      }
    }
    .chat__sticker {
      width: 150px;
    }

    p {
      word-break: break-word;
    }
  }

  .chat__container-singlePost + .chat__container-singlePost {
    margin-top: 1rem;
  }
`;

function ChatList({ messageList, onDelete, user }) {
  const [scroll, setScroll] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!scroll) return;
    let rollToBottom = setTimeout(() => scrollToBottom(), 400);
    return () => {
      clearTimeout(rollToBottom);
    };
  }, [messageList, scroll]);

  return (
    <ChatListSty>
      <div className="chatList__scrollCheckbox">
        <label
          htmlFor="scroll"
          className={scroll ? "scroll_true" : null}
        ></label>
        <input
          type="checkbox"
          value={scroll}
          name=""
          id="scroll"
          onClick={() => setScroll(!scroll)}
        />
        <span>Scroll automático</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          justifyContent: "flex-end",
          minHeight: "67vh",
        }}
      >
        {messageList.map((message) => {
          return (
            <div className="chat__container-singlePost" key={message.id}>
              <div>
                <img
                  width="20"
                  height="20"
                  src={`https://github.com/${message.from}.png`}
                  alt="user"
                  onClick={() => {}}
                />

                <span className="chat__container-singlePost-user">
                  {message.from}
                </span>
                <span className="chat__container-singlePost-date">
                  {new Date(message.created_at).toLocaleString()}
                </span>
                {message.from === user || user == "Eddi3MS" ? (
                  <button
                    aria-label="delete message"
                    className="btn__trash"
                    onClick={() => onDelete(message.id)}
                  >
                    <BiTrash />
                  </button>
                ) : null}
              </div>
              {message.message.startsWith(":figurinha:") ? (
                <img
                  className="chat__sticker"
                  src={message.message.replace(":figurinha:", "")}
                  alt="sticker"
                />
              ) : (
                <p>{message.message}</p>
              )}
            </div>
          );
        })}
      </div>
      <div ref={messagesEndRef} />
    </ChatListSty>
  );
}

export default ChatList;
