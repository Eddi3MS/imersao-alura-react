import toast from "react-hot-toast";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiMicrophone, BiTrash } from "react-icons/bi";

const ChatSty = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);

  background-color: var(--neutrals-700);
  margin: 3.875rem 2.5rem;
  border-radius: 5px;

  overflow: hidden;

  header {
    height: min(10%, 50px);
    display: flex;
    width: calc(100% - 2rem);

    justify-content: space-between;
    align-items: center;

    h1,
    a {
      font-size: 0.875rem;
      color: var(--neutrals-200);
    }
    a {
      text-decoration: none;
    }
  }

  .chat__container {
    list-style-type: none;
    background-color: var(--neutrals-600);
    height: 72vh;

    width: calc(100% - 2rem);
    border-radius: 4px;
    padding: 1rem 1.3rem;
    color: var(--neutrals-000);
    font-size: 1rem;

    /*   display: flex;
    flex-direction: column;
    justify-content: flex-end; */

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
  }

  form {
    margin-block: 1.43rem 2rem;
    width: calc(100% - 2rem);
    display: flex;
    gap: 1rem;
    input {
      flex: 1;
      height: 2.75rem;
      border-radius: 4px;
      background-color: var(--neutrals-800);
      padding-left: 1rem;
      font-size: 0.875rem;
      color: var(--neutrals-200);

      border: 1px solid var(--neutrals-999);

      &:focus {
        border: 1px solid var(--primary-500);
        outline: none;
      }
    }

    button {
      border: 0;
      cursor: pointer;
    }

    button.btn__emotes {
      display: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;

      svg {
        font-size: 2rem;
        color: var(--primary-500);
      }
    }

    button.btn__submit {
      height: 2.75rem;
      background-color: var(--primary-500);
      color: var(--neutrals-100);
      border-radius: 4px;
      padding: 0.4rem 0.8rem;
    }
  }
`;

function Chat() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([
    {
      id: 0,
      message: "AVISO: O usuário ainda não está dinâmico.",
      user: "eddi3ms",
      date: new Date().toLocaleString(),
    },
  ]);
  const messagesEndRef = useRef(null);

  const handleTextSubmit = (e) => {
    e.preventDefault();

    if (!message) {
      toast.error("Campo de mensagem vazio.");
      return;
    }

    const messageEdit = {
      id: messageList.length + 1,
      message,
      user: "eddi3ms",
      date: new Date().toLocaleString(),
    };

    const list = [...messageList, messageEdit];

    setMessageList(list);
    setMessage("");
  };

  const handleDeleteMessage = (e, messageId) => {
    e.preventDefault();
    const deletedList = messageList.filter(
      (message) => message.id !== messageId
    );
    setMessageList(deletedList);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <ChatSty>
      <header>
        <h1>Chat</h1>
        <Link href="/">Logout</Link>
      </header>
      <ul className="chat__container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: "67vh",
          }}
        >
          {messageList.map((message) => {
            return (
              <li className="chat__container-singlePost" key={message.id}>
                <div>
                  <img
                    src={`https://github.com/${message.user}.png`}
                    alt="user"
                  />
                  <span>{message.user}</span>
                  <span>{message.date}</span>
                  <button
                    className="btn__trash"
                    onClick={(e) => handleDeleteMessage(e, message.id)}
                  >
                    <BiTrash />
                  </button>
                </div>
                <p>{message.message}</p>
              </li>
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </ul>

      <form onSubmit={handleTextSubmit}>
        <button className="btn__emotes">
          <BiMicrophone />
        </button>
        <input
          placeholder="Insira sua mensagem aqui.."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn__submit" type="submit">
          Enviar
        </button>
      </form>
    </ChatSty>
  );
}

export default Chat;
