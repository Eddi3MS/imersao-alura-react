import React, { useContext } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import UserContext from "../store/UserContext";

const HomeSty = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);

  .container {
    width: min(90%, 700px);
    background-color: var(--neutrals-700);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    flex-wrap: wrap;

    .container__form {
      text-align: center;
      h1 {
        font-size: 1.5rem;
        color: var(--neutrals-000);
      }
      h2 {
        font-size: 0.875rem;
        color: var(--neutrals-300);
        margin-bottom: 1.75rem;
      }

      input,
      button {
        height: 2.125rem;
        display: block;
        width: 100%;
        border-radius: 4px;
        color: var(--neutrals-000);
        margin-block: 0.6875rem;
      }
      input {
        background-color: var(--neutrals-800);
        border: 1px solid var(--neutrals-999);
        padding-left: 0.5rem;

        &:focus {
          border: 1px solid var(--primary-500);
          outline: 0;
        }
      }

      button {
        background-color: var(--primary-500);
        border: 0;
        cursor: pointer;

        &:hover {
          background-color: var(--primary-600);
        }
      }
    }

    .container__image {
      width: 200px;
      height: 240px;
      border-radius: 10px;
      border: 1px solid var(--neutrals-999);
      background-color: var(--neutrals-800);
      text-align: center;

      img {
        border-radius: 50%;
        padding: 1.375rem;
      }

      span {
        background-color: var(--neutrals-999);
        color: var(--neutrals-200);
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.75rem;
      }
    }
  }
`;

function Home() {
  const router = useRouter();
  const ctx = useContext(UserContext);
  const { user, setUser, error, info } = ctx;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return toast.error("Usuário inválido.");
    if (user.length < 1) return toast.error("Usuário inválido.");
    router.push("/chat");
  };

  return (
    <HomeSty>
      <div className="container">
        <div className="container__form">
          <h1>Bem-vindo de volta!</h1>
          <h2>Aluracord - Alura Matrix</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Seu usuário do github"
              onChange={(e) => setUser(e.target.value)}
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
        <div className="container__image">
          {error && <span>{error}</span>}

          {info.avatar && (
            <img width="200" height="200" src={info.avatar} alt="github user" />
          )}
          {info.name && <span>{info.name}</span>}
        </div>
      </div>
    </HomeSty>
  );
}

export default Home;
