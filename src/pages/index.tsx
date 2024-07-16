import {
  AdjustmentsHorizontalIcon,
  ClipboardDocumentCheckIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/react";

function Landing() {
  return (
    <Card className="w-full flex-grow p-4">
      <CardHeader className="font-bold text-3xl py-4">
        <h1>Bienvenido a Tauri-MB, eliga una opción</h1>
      </CardHeader>
      <CardBody className="flex flex-row gap-2">
        <Card
          isHoverable
          isPressable
          as={Link}
          href="/menu"
          className="flex-grow flex flex-col items-center justify-center gap-1"
        >
          <AdjustmentsHorizontalIcon className="size-20" />
          <p className="text-3xl font-bold">Menu</p>
        </Card>
        <Card
          isHoverable
          isPressable
          as={Link}
          href="/login"
          className="flex-grow flex flex-col items-center justify-center gap-1"
        >
          <ClipboardDocumentCheckIcon className="size-20" />
          <p className="text-3xl font-bold">PCaaS</p>
        </Card>
        <Card
          isHoverable
          isPressable
          as={Link}
          href="/login"
          className="flex-grow flex flex-col items-center justify-center gap-1"
        >
          <CpuChipIcon className="size-20" />
          <p className="text-3xl font-bold">IRR MB</p>
        </Card>
      </CardBody>
    </Card>
  );
}

export default Landing;
