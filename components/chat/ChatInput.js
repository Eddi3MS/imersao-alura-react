import React from "react";
import styled from "styled-components";
import ButtonStickers from "./ButtonSticker";

const FormSty = styled.div`
  margin-block: 1.43rem 2rem;
  width: calc(100% - 2rem);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  input {
    flex: 2;
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

  button.btn__submit {
    height: 2.75rem;
    background-color: var(--primary-500);
    color: var(--neutrals-100);
    border-radius: 4px;
    padding: 0.4rem 0.8rem;
    flex: 1;
    max-width: 120px;

    &:hover {
      background-color: var(--primary-400);
    }
  }
`;

function ChatInput({ handleSubmit, setMessage, message }) {
  return (
    <>
      <FormSty>
        <input
          placeholder="Insira sua mensagem aqui.."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSubmit(message);
            }
          }}
        />
        <button
          className="btn__submit"
          onClick={() => handleSubmit(message)}
          type="submit"
          aria-label="submit text"
        >
          Enviar
        </button>
        <ButtonStickers
          aria-label="stickers"
          type="submit"
          onStickerClick={(sticker) => {
            handleSubmit(`:figurinha:${sticker}`);
          }}
        />
      </FormSty>
    </>
  );
}

export default ChatInput;
