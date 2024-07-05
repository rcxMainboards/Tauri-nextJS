import type { MyIcon } from "@/types";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/router";

function TestCard({
  Icon,
  Description,
  url,
}: {
  Icon: MyIcon;
  Description: JSX.Element;
  url: string;
}) {
  const router = useRouter();

  return (
    <Card
      isHoverable
      className="bg-blue-700"
      isPressable
      onPress={() => {
        router.push(url).catch((error: unknown) => {
          console.error(error);
        });
      }}
      shadow="lg"
    >
      <CardBody className="flex flex-col gap-2 items-center">
        <Icon className={"size-10"} />
        {Description}
      </CardBody>
    </Card>
  );
}

export default TestCard;
