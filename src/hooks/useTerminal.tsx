import { useState } from "react";

function useTerminal(initialMessage: string) {
  const [messages, setMessages] = useState<string[]>([initialMessage]);

  const pushMessage = (newMessage: string) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return { messages, pushMessage };
}

export default useTerminal;
