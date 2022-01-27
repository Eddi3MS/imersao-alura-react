import React from "react";
import { BiMicrophone } from "react-icons/bi";
import styled from "styled-components";

const FormSty = styled.form`
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
`;

function ChatInput({ handleSubmit, setMessage, message }) {
  return (
    <FormSty onSubmit={handleSubmit}>
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
    </FormSty>
  );
}

export default ChatInput;
