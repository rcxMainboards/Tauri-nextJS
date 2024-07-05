import type { ItestProps } from "@/types/index";
import { CameraIcon } from "@heroicons/react/24/solid";

const STCamera: ItestProps = {
  testName: "Camara",
  Description: <p>Prueba de Camara</p>,
  Success: <p>How succes camera</p>,
  Fail: <p>Fallo</p>,
  TestIcon: CameraIcon,
  TestNotes: ["No tirar camera", "Dejar de ser mala onda"],
};

export default STCamera;
