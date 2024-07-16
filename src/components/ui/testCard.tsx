import type { MyIcon } from "@/types";
import { Card, CardBody, Link } from "@nextui-org/react";

function TestCard({
  Icon,
  Description,
  url,
}: {
  Icon: MyIcon;
  Description: JSX.Element;
  url: string;
}) {
  return (
    <Card isHoverable isPressable as={Link} href={url}>
      <CardBody className="flex flex-col gap-2 items-center">
        <Icon className={"size-10"} />
        {Description}
      </CardBody>
    </Card>
  );
}

export default TestCard;
