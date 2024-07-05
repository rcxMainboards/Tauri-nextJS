import type { ItestProps } from "@/types/index";
import { WifiIcon } from "@heroicons/react/24/solid";

const STWifi: ItestProps = {
  testName: "Wifi",
  Description: <p>Prueba de Wifi</p>,
  Success: <p>How succes Wifi</p>,
  Fail: <p>Nooo</p>,
  TestIcon: WifiIcon,
  TestNotes: ["No tirar asdasda", "Dejar"],
};

export default STWifi;
