import { MenuTestList } from "@/components/ui/index";
import irrmbConf from "@/configuration/irrmb";
import { Card, CardBody } from "@nextui-org/react";

function Menu() {
  const { testQueue } = irrmbConf;
  return (
    <Card>
      <CardBody className="p-6">
        <h1 className="text-3xl font-bold w-full text-center pb-5">Tests Disponibles</h1>
        <MenuTestList testQueue={testQueue} />
      </CardBody>
    </Card>
  );
}

export default Menu;
