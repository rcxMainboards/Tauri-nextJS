import {
  Terminal,
  TerminalMessages,
  TerminalProcessOutput,
} from "@/components/ui";
import { useTauriProcess } from "@/hooks";
import { Button, ButtonGroup } from "@nextui-org/react";

const process = {
  action: "test_connection",
  params: {
    ssid: "TEST-NOTEBOOK_5G",
    pass: "Notebook05@",
  },
};

const process2 = {
  action: "test_connection",
  params: {
    ssid: "TEST-NOTEBOOK_5G",
    pass: "Notebook05@",
  },
};

function Wifi() {
  const { startProcess, data, error, status, messages } = useTauriProcess();

  return (
    <>
      <h1 className="text-4xl font-bold text-white pb-2">Prueba de WIFI</h1>
      <section className="grid grid-cols-2 gap-10 flex-grow">
        <div className="flex flex-col gap-5 items-center mt-20">
          <h2 className="text-white font-semibold text-lg">
            Pruebas disponibles:
          </h2>
          <section className="flex flex-col gap-5">
            <ButtonGroup size="lg">
              <Button
                isLoading={status === "pending"}
                onClick={() => {
                  startProcess({
                    tauriProcess: process,
                    eventName: "wifi-event",
                  });
                }}
              >
                Probar Config A
              </Button>
              <Button
                isLoading={status === "pending"}
                onClick={() => {
                  startProcess({
                    tauriProcess: process2,
                    eventName: "wifi-event",
                  });
                }}
              >
                Probar Config B
              </Button>
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
