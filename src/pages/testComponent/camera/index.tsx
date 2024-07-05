import { CameraList } from "@/components/ui";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
// import { useTerminal } from "@/hooks";

function CameraTest() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]); // Update the type and initialize as an empty array
  const [loadingDevices, setLoadingDevices] = useState<boolean>(true);

  const handleDevices = (mediaDevices: MediaDeviceInfo[]) => {
    const videoInputList = mediaDevices.filter(
      ({ kind }) => kind === "videoinput",
    );
    setDevices(videoInputList);
  };

  // biome-ignore lint: <A>
  useEffect(() => {
    (async () => {
      try {
        setLoadingDevices(true);
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        handleDevices(mediaDevices);
        setLoadingDevices(false);
      } catch (error: unknown) {
        console.error(error);
        // handle error
      }
    })().catch((err: unknown) => {
      console.error(err);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <section className="grid grid-cols-2 gap-4 flex-grow">
          <div>
            {
              // If loadingDevices is true, show the Spinner
              loadingDevices ? (
                <Spinner className="" size="lg" label="Cargando Camaras" />
              ) : (
                // If loadingDevices is false, show the CameraList
                <section className="ml-3">
                  <h1 className="font-bold text-4xl pb-10 text-white">
                    Camaras
                  </h1>
                  {/*Listamos las camaras encontradas*/}
                  <CameraList devices={devices} />
                </section>
              )
            }
          </div>
          {/* <Terminal messages={messages} /> */}
        </section>
      </div>
    </>
  );
}

export default CameraTest;
