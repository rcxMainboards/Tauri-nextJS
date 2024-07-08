import { RustResponse, Terminal } from "@/components/ui";
import invokeFromRust from "@/lib/invokeData";
import { Button } from "@nextui-org/react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

function Wifi() {
  const [resource, setResource] = useState<null | {
    read: () => string;
  }>(null);

  const handleClick = () => {
    const process = {
      action: "test_connection",
      params: {
        ssid: "TEST-Electron",
        pass: "Electron24@",
      },
    };

    setResource(invokeFromRust(process));
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-white pb-2">Prueba de WIFI</h1>
      <section className="grid grid-cols-2 gap-10 flex-grow">
        <div className="flex flex-col gap-5 items-center mt-20">
          <h2 className="text-white font-semibold text-lg">
            Pruebas disponibles:
          </h2>
          <section className="w-1/2 flex flex-col gap-5">
            <Button size="md" onClick={handleClick}>
              Probar Config a
            </Button>
          </section>
        </div>
        <Terminal>
          <p>* Elige una opción</p>
          <ErrorBoundary fallback={<p className="text-white">Rust problema</p>}>
            <Suspense fallback={<p>Cargando cosas de RUST</p>}>
              {resource && <RustResponse resource={resource} />}
            </Suspense>
          </ErrorBoundary>
        </Terminal>
      </section>
    </>
  );
}

export default Wifi;
