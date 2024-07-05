import { staticInfo_camera, staticInfo_wifi } from "@/static/index";
import type { IconfigFileTest } from "@/types/index";

// TODO - Hacer que el conf sea un objeto con un nombre de configuracion, y una array de tests

const irrmbConf: IconfigFileTest = {
  configName: "irrMB",
  testQueue: [
    {
      url: "/testComponent/camera",
      static_content: staticInfo_camera,
    },
    {
      url: "/testComponent/wifi",
      static_content: staticInfo_wifi,
    },
  ],
};

export default irrmbConf;
