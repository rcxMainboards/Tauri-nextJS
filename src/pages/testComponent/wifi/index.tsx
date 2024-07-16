import { TauriButton, Terminal, TerminalMessages, TerminalProcessOutput } from "@/components/ui";
import { useTauriProcess } from "@/hooks";
import type { IProcess } from "@/types";
import { ButtonGroup } from "@nextui-org/react";

const process: IProcess = {
  action: "test_connection",
  // args: {
  //   ssid: "TEST-Electron_6G",
  //   pass: "Electron06@",
  // },
  eventName: "wifi-event",
};

const process2: IProcess = {
  action: "test_connection",
  args: {
    ssid: "TEST-Electron_5G",
    pass: "Electron05@",
  },
  eventName: "wifi-event",
};

const process3: IProcess = {
  action: "greet",
  args: {
    name: "holaaa brrrrro",
  },
};

function Wifi() {
  const { startProcess, data, error, status, messages } = useTauriProcess();

  return (
    <>
      <h1 className="text-4xl font-bold  pb-2">Prueba de WIFI</h1>
      <section className="grid grid-cols-2 gap-10 flex-grow">
        <div className="flex flex-col gap-5 items-center mt-20">
          <h2 className="font-semibold text-lg">Pruebas disponibles:</h2>
          <section className="flex flex-col gap-5">
            <ButtonGroup size="lg">
              <TauriButton
                process={process}
                startProcess={startProcess}
                isLoading={status === "pending"}
              >
                Probar config a
              </TauriButton>
              <TauriButton
                process={process2}
                startProcess={startProcess}
                isLoading={status === "pending"}
              >
                Probar config b
              </TauriButton>
              <TauriButton
                process={process3}
                startProcess={startProcess}
                isLoading={status === "pending"}
              >
                Probar config c
              </TauriButton>
            </ButtonGroup>
          </section>
        </div>
        <Terminal>
          <TerminalMessages messages={messages} />
          <TerminalProcessOutput type={data ?? error} />
        </Terminal>
      </section>
    </>
  );
}

export default Wifi;
