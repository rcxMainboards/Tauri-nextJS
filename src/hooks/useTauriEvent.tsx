import type { UnlistenFn } from "@tauri-apps/api/event";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useReducer, useState } from "react";

// Define the actions
type messageActions = { type: "addMessage"; payload: string } | { type: "clearMessages" };

// Define the reducer
function messagesReducer(state: string[], action: messageActions): string[] {
  switch (action.type) {
    case "addMessage":
      return [...state, action.payload];
    case "clearMessages":
      return [];
    default:
      return state;
  }
}

function useTauriEvent(eventName: string | undefined) {
  const defaultMessage = "Esperando por un proceso";
  const [messages, messagesDispatch] = useReducer(messagesReducer, [defaultMessage]);
  const [unlisten, setUnlisten] = useState<UnlistenFn | null>(null);

  const clearMessages = () => {
    messagesDispatch({ type: "clearMessages" });
  };

  useEffect(() => {
    if (eventName) {
      (async () => {
        const unlistenFn = await listen<string>(eventName, (event) => {
          messagesDispatch({ type: "addMessage", payload: event.payload });
        });
        setUnlisten(unlistenFn);
      })().catch((error: unknown) => {
        console.error("Error listening to event:", error);
      });
    }

    return () => {
      if (typeof unlisten === "function") {
        unlisten();
      }
    };
  }, [eventName, unlisten]);

  return { messages, unlisten, clearMessages };
}

export default useTauriEvent;
