import toast from "react-hot-toast";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiMicrophone, BiTrash } from "react-icons/bi";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

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

function Chat({ user, SUPABASE_ANON_KEY, SUPABASE_URL }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const router = useRouter();
  const messagesEndRef = useRef(null);

  const [update, setUpdate] = useState(true);

  const supabase_client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  });

  useEffect(() => {
    if (!update) return;

    supabase_client
      .from("messages")
      .select("*")
      .then(({ data }) => {
        setMessageList(data);
        setUpdate(false);
      });
  }, [update]);

  const handleTextSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      toast.error("Insira uma mensagem.");
      return;
    }

    const messageEdit = {
      message,
      from: user,
    };

    supabase_client
      .from("messages")
      .insert([messageEdit])
      .then(({ data }) => {
        setMessageList([...messageList, data[0]]);
      });

    setUpdate(true);
    setMessage("");
  };

  const handleDeleteMessage = async (e, messageId) => {
    e.preventDefault();

    const { data, error } = await supabase_client
      .from("messages")
      .delete()
      .match({ id: messageId });

    setUpdate(true);
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

      <div className="chat__container">
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
                  <span>{message.date}</span>
                  {message.from === user ? (
                    <button
                      aria-label="delete message"
                      className="btn__trash"
                      onClick={(e) => handleDeleteMessage(e, message.id)}
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
      </div>

      <form onSubmit={handleTextSubmit}>
        <button aria-label="emoticons" className="btn__emotes">
          <BiMicrophone />
        </button>
        <input
          placeholder="Insira sua mensagem aqui.."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn__submit" type="submit" aria-label="submit text">
          Enviar
        </button>
      </form>
    </ChatSty>
  );
}

export async function getServerSideProps() {
  const { SUPABASE_ANON_KEY, SUPABASE_URL } = process.env;
  return {
    props: {
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
    },
  };
}

export default Chat;
