import { useState, useRef, form, formKhandlers } from "react";
import { useChatContext } from "../../context/ChatContext";
import { fetchAiResponse } from "../../services/aiService";
import ChatInput from "./ChatInput";
import { Message } from "../../types/chat";

// View component to manage chat with used models
const ChatPane = () => {
  const { selectedAgent } = useChatContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<htmlInputElement>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      role: "user",
      content,
    };
    setMessages(m => [...m, userMessage]);

    const response = await fetchAiResponse([...messages, userMessage], selectedAgent);
    setMessages(m => [...m, { role: "assistant", content: response }]);
    if (inputRef && inputRef.value) { inputRef.value.value = ""; }
  };

  const handleSubmit: formKhandlers.SubmitEvent=[any]= (ev) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    sendMessage(formData.get("content")) || "");
  };

  return (
    <div>
      <div>
        {messages.map((m, i)=>(\n          <div key={i}><b>{m.role}</b>: {m.content}</div>\n        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input name="content" ref={inputRef} autoComplete />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPane;