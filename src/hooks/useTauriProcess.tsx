import invokeFromRust from "@/lib/invokeData";
import type { IProcess } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

interface TauriProcess {
  eventName?: string;
  tauriProcess: IProcess;
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
  const [messages, setMessages] = useState([defaultMessage]);
  const [eventName, setEventName] = useState<string | null>(null);
  const [processToStart, setProcessToStart] = useState<IProcess | null>(null);

  const { mutate, error, data, status } = useMutation({
    mutationFn: invokeFromRust,
    retry: false,
  });

  const startProcess = ({ tauriProcess, eventName }: TauriProcess) => {
    setMessages([]);
    if (eventName) setEventName(eventName);
    setProcessToStart(tauriProcess);
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (processToStart) {
      mutate(processToStart);
      setProcessToStart(null);
      setEventName(null);
    }
  }, [processToStart, mutate]);

  useEffect(() => {
    let unlisten: () => void;

    if (eventName) {
      // Verificar si eventName está definido
      (async () => {
        unlisten = await listen<string>(eventName, (event) => {
          setMessages((prevMessages) => [...prevMessages, event.payload]);
        });
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
  }, [eventName]);

  return { startProcess, error, data, status, messages };
}

export default useTauriProcess;
