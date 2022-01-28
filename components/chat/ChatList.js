import React, { useEffect, useRef } from "react";
import { BiTrash } from "react-icons/bi";
import styled from "styled-components";

const ChatListSty = styled.div`
  list-style-type: none;
  background-color: var(--neutrals-600);
  height: 72vh;

  width: calc(100% - 2rem);
  border-radius: 4px;
  padding: 1rem 1.3rem;
  color: var(--neutrals-000);
  font-size: 1rem;

  overflow-y: scroll;

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
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }

      span:nth-of-type(2) {
        font-size: 10px;
        align-self: center;
        color: var(--neutrals-300);
      }

      .btn__trash {
        background: transparent;
        border: 0;
        cursor: pointer;

        svg {
          font-size: 1.2rem;
          color: red;
        }
      }
    }
  }

  .chat__container-singlePost + .chat__container-singlePost {
    margin-top: 1rem;
  }

  .chat__container-singlePost.dummy_post {
    filter: blur(3px);
    margin-top: 0.5rem;
  }
`;

function ChatList({ messageList, onDelete, user }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <ChatListSty>
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

                <span>{message.from}</span>
                <span>{new Date(message.created_at).toLocaleString()}</span>
                {message.from === user ? (
                  <button
                    aria-label="delete message"
                    className="btn__trash"
                    onClick={(e) => onDelete(e, message.id)}
                  >
                    <BiTrash />
                  </button>
                ) : null}
              </div>
              <p>{message.message}</p>
            </div>
          );
        })}
      </div>
      <div ref={messagesEndRef} />
    </ChatListSty>
  );
}

export default ChatList;