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

  return (
    <ChatSty>
      <header>
        <h1>Chat</h1>
        <Link href="/">Logout</Link>
      </header>

      <ChatList
        user={user}
        onDelete={handleDeleteMessage}
        messageList={messageList}
      />

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
