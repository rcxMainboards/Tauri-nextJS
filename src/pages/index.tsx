// import {
//   Bars3CenterLeftIcon,
//   CpuChipIcon,
//   WrenchScrewdriverIcon,
// } from "@heroicons/react/24/solid";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

function Landing() {
  return (
    <div className="w-full grid grid-cols-3 place-content-center gap-10">
      <ButtonGroup>
        <Button href="/menu" as={Link} size="lg" className="font-bold">
          Menu Tests
        </Button>
        <Button href="/login" as={Link} size="lg" className="font-bold">
          PCaas
        </Button>
        <Button href="/login" as={Link} size="lg" className="font-bold">
          IRRMB
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Landing;
