import { useEffect, useState } from "react";
import { sendMessage, socket } from "../services/apiSockets";
import { useUserContext } from "../../contexts/userContext";

type ChatMessage = {
  nickname: string;
  message: string;
};

export default function Chatbox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");

  const { user } = useUserContext();

  const { username } = user!;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") return;

    sendMessage(input);
    setMessages((prev) => [
      ...prev,
      {
        nickname: username,
        message: input,
      },
    ]);
    setInput("");
  };

  useEffect(() => {
    socket.on("receive_message", ({ nickname, message }) => {
      setMessages((prevMessage) => [...prevMessage, { nickname, message }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className="h-full flex">
      <section className="w-[700px] border-2 px-1 text-white">
        {messages.map((message, index) => (
          <p key={index} className="py-1">
            <span className="font-bold">{message.nickname}</span>:{" "}
            {message.message}
          </p>
        ))}
      </section>
      <section className="w-[500px] border-2 flex flex-col">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here!"
          className="resize-none outline-0 py-1 px-2 text-white"
          rows={11}
        />
        <button className="bg-zinc-300 py-2" onClick={handleSendMessage}>
          Submit
        </button>
      </section>
    </div>
  );
}
