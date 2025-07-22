import { useState } from "react";

type ChatMessage = {
  nickname: string;
  message: string;
};

export default function Chatbox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  return (
    <div className="h-full flex">
      <section className="w-[700px] border-2">
        {messages.map((message, index) => (
          <p key={index}>
            {message.nickname}: {message.message}
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
        <button className="bg-zinc-400 px-2 py-1">Submit</button>
      </section>
    </div>
  );
}
