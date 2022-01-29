import toast from "react-hot-toast";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import ChatList from "../components/chat/ChatList";
import ChatInput from "../components/chat/ChatInput";

const ChatSty = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);

  background-color: var(--neutrals-700);
  margin: 3.875rem 2.5rem;
  border-radius: 5px;

  @media (max-width: 450px) {
    margin: 10px;
  }

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
`;

function Chat({ user, SUPABASE_ANON_KEY, SUPABASE_URL }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const router = useRouter();
  const supabase_client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  });

  function listeningChanges(response) {
    return supabase_client
      .from("messages")
      .on("INSERT", (responseLive) => {
        response(responseLive);
      })
      .on("DELETE", (responseLive) => {
        response(responseLive.old.id);
      })
      .subscribe();
  }

  useEffect(() => {
    supabase_client
      .from("messages")
      .select("*")
      .then(({ data }) => {
        setMessageList(data);
      });
    const subscribe = listeningChanges((response) => {
      if (response.eventType === "INSERT") {
        setMessageList((currentValue) => {
          return [...currentValue, response.new];
        });
      } else {
        setMessageList((currentValue) =>
          currentValue.filter((value) => value.id !== response)
        );
      }
    });
    return () => subscribe.unsubscribe();
  }, []);

  const handleTextSubmit = (message) => {
    if (!message) return toast.error("Insira uma mensagem.");
    const messageEdit = {
      message,
      from: user,
    };
    supabase_client
      .from("messages")
      .insert([messageEdit])
      .then(({ data }) => {});
    setMessage("");
  };

  const handleDelete = async (messageId) => {
    const { data, error } = await supabase_client
      .from("messages")
      .delete()
      .match({ id: messageId });
  };

  return (
    <ChatSty>
      <header>
        <h1>Bem-vindo {user}</h1>
        <Link href="/">Logout</Link>
      </header>

      <ChatList user={user} onDelete={handleDelete} messageList={messageList} />

      <ChatInput
        handleSubmit={handleTextSubmit}
        message={message}
        setMessage={setMessage}
      />
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
