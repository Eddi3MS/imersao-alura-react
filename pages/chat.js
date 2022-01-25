import toast from "react-hot-toast";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { BiMicrophone } from "react-icons/bi";

const ChatSty = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);

  background-color: var(--neutrals-700);
  margin: 3.875rem 2.5rem;
  border-radius: 5px;

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
    background-color: var(--neutrals-600);
    height: max(80%, 400px);
    width: calc(100% - 2rem);
    border-radius: 4px;
    padding: 1rem 1.3rem;
    color: var(--neutrals-000);
    font-size: 1rem;

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
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 0;
      cursor: pointer;

      svg {
        font-size: 2rem;
        color: var(--primary-500);
      }
    }
  }
`;

function Chat() {
  const handleJoke = (e) => {
    e.preventDefault();

    toast.success(`MuhuHAHhaHAHA 
    Não funciona!!!`);
  };
  return (
    <ChatSty>
      <header>
        <h1>Chat</h1>
        <Link href="/">Logout</Link>
      </header>
      <div className="chat__container">
        <div className="chat__container-singlePost">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
            />
            <span>userName</span>
            <span>25/01/2022</span>
          </div>
          <p>Hello World!</p>
        </div>

        <div className="chat__container-singlePost">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
            />
            <span>userName</span>
            <span>25/01/2022</span>
          </div>
          <p>Olá Mundo!</p>
        </div>
      </div>

      <form>
        <input placeholder="Insira sua mensagem aqui.." type="text" />{" "}
        <button onClick={handleJoke}>
          <BiMicrophone />
        </button>
      </form>
    </ChatSty>
  );
}

export default Chat;
