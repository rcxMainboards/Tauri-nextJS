import invokeFromRust from "@/lib/invokeData";
import type { IProcess } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { listen } from "@tauri-apps/api/event";
import type { UnlistenFn } from "@tauri-apps/api/event";
import { useEffect, useReducer, useState } from "react";

interface TauriProcess {
  eventName?: string;
  tauriProcess: IProcess;
}

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

/**
 * `useTauriProcess` es un hook personalizado que gestiona la interacción con un proceso de Tauri.
 *
 * @returns Un objeto con las siguientes propiedades:
 * - `startProcess`: Una función que inicia un proceso de Tauri. Acepta un objeto de tipo `TauriProcess` que tiene dos propiedades:
 *   - `eventName`: Un string opcional que especifica el nombre del evento de Tauri que el proceso puede escuchar si es que tiene uno.
 *   - `process`: Un objeto de tipo `IProcess` que describe el proceso a iniciar, este objeto define el proceso y los parametros.
 * - `error`: Cualquier error que ocurra durante la mutación | error devuelto por `tauri::command`.
 * - `data`: Los datos devueltos por la mutación | datos devueltos por `tauri::command`.
 * - `status`: El estado de la mutación | estatus de la peticion al `tauri::command`.
 * - `messages`: Un array de mensajes que se actualiza cuando se recibe un evento del proceso de iniciado de Tauri.
 */
function useTauriProcess() {
  const defaultMessage = "Esperando por un proceso";
  const [messages, messagesDispatch] = useReducer(messagesReducer, [defaultMessage]);
  const [eventName, setEventName] = useState<string | null>(null);
  const [processToStart, setProcessToStart] = useState<IProcess | null>(null);
  const [unlisten, setUnlisten] = useState<UnlistenFn | null>(null);

  const { mutate, error, data, status } = useMutation({
    mutationFn: invokeFromRust,
    retry: false,
  });

  const startProcess = ({ tauriProcess, eventName }: TauriProcess) => {
    messagesDispatch({ type: "clearMessages" });
    if (eventName) setEventName(eventName);
    setProcessToStart(tauriProcess);
  };

  // Se encarga ejecutar la mutacion si el estado de de processStart cambia, la funcion startProcess permite inicializar estos estados
  useEffect(() => {
    if (processToStart) {
      mutate(processToStart);
      setProcessToStart(null);
      setEventName(null);
    }
  }, [processToStart, mutate]);

  useEffect(() => {
    // Si se ejecuto una mutación y esta ha terminado (ya sea con éxito o con error), llama a unlisten para limpiar el evento.
    if (data ?? error) {
      if (unlisten) {
        unlisten();
      }
    }
  }, [data, error, unlisten]); // Dependencias

  // Si se recibe un evento, se suscribe a el, y guarda cada mensaje generado en un estado.
  // Tambien inicializa un estado de `Unlisten` para cortar la escucha del evento cuando sea necesario.
  // Tambien desmontar el componente se elimina el la escucha del evento.
  useEffect(() => {
    if (eventName) {
      (async () => {
        const unlistenFn = await listen<string>(eventName, (event) => {
          messagesDispatch({ type: "addMessage", payload: event.payload });
        });
        setUnlisten(() => unlistenFn); // Actualiza el estado unlisten
      })().catch((error: unknown) => {
        console.error("Error listening to event:", error);
      });
    }

    // Cleanup function
    return () => {
      if (typeof unlisten === "function") {
        unlisten();
      }
    };
  }, [eventName, unlisten]);

  return { startProcess, error, data, status, messages };
}

export default useTauriProcess;
