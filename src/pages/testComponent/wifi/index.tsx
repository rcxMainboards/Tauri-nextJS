import { Terminal } from "@/components/ui";
import { useTerminal } from "@/hooks";
import { invoke } from "@/lib/tauri";
import { Button } from "@nextui-org/react";

function Wifi() {
  const { messages } = useTerminal("Eliga una prueba de WIFI");

  const fn_basic_wifi = () => {
    invoke<string>("test_connection", {
      ssid: "TEST-Electron",
      pass: "Electron24@",
    })
      .then((res: string) => {
        console.log(res);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-white">Prueba de WIFI</h1>
      <section className="grid grid-cols-2 gap-10 flex-grow">
        <div className="flex flex-col gap-5 items-center mt-20">
          <h2 className="text-white">Pruebas disponibles: </h2>
          <div className="w-1/2 flex flex-col gap-5">
            <Button
              size="lg"
              onClick={() => {
                fn_basic_wifi();
              }}
            >
              Probar Config a
            </Button>
            <Button
              size="lg"
              onClick={() => {
                fn_basic_wifi();
              }}
            >
              Probar Config b
            </Button>
            <Button
              size="lg"
              onClick={() => {
                fn_basic_wifi();
              }}
            >
              Probar Config c
            </Button>
          </div>
        </div>
        <Terminal messages={messages} />
      </section>
    </>
  );
}

export default Wifi;
