import React from "react";
import appConfig from "../../config.json";
import styled from "styled-components";

const ButtonStickerSty = styled.div`
  position: relative;

  button {
    border-radius: 50%;
    padding: 0 3px 0 0;
    min-width: 50px;
    min-height: 50px;
    font-size: 20px;
    margin-bottom: 8px;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--neutrals-300);
    &:hover {
      filter: grayscale(0);
    }
  }
  .sticker__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    position: absolute;
    background-color: var(--neutrals-800);
    width: 280px;
    height: 300px;
    right: 30px;
    bottom: 30px;
    padding: 16px;
    box-shadow: rgba(4, 4, 5, 0.15) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.24) 0px 8px 16px 0px;

    h3 {
      color: var(--neutrals-300);
      margin-bottom: 1rem;
    }

    ul {
      overflow-y: scroll;
      list-style-type: none;
      padding: 0;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      ::-webkit-scrollbar {
        width: 0px;
      }

      ::-webkit-scrollbar-thumb {
        background: var(--primary-500);
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      li {
        width: 48%;
        margin: auto;
        border-radius: 5px;

        &:focus {
          background-color: var(--neutrals-600);
        }
        &:hover {
          background-color: var(--neutrals-600);
        }
      }
    }
  }
`;

function ButtonStickers({ onStickerClick }) {
  const [isOpen, setOpenState] = React.useState("");

  return (
    <ButtonStickerSty>
      <button onClick={() => setOpenState(!isOpen)}>😋</button>
      {isOpen && (
        <div className="sticker__container" onClick={() => setOpenState(false)}>
          <h3>Stickers</h3>
          <ul>
            {appConfig.stickers.map((sticker) => (
              <li
                onClick={() => {
                  onStickerClick(sticker);
                }}
                key={sticker}
              >
                <img src={sticker} alt="sticker" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </ButtonStickerSty>
  );
}

export default ButtonStickers;
