import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

function Landing() {
  const router = useRouter();

  return (
    <div className="w-full grid grid-cols-3 place-content-center gap-10">
      <Button
        color="secondary"
        size="lg"
        className="font-bold text-xl"
        onPress={(): void => {
          router.push("/menu").catch((error: unknown) => {
            throw error;
          });
        }}
      >
        Menu Tests
      </Button>
      <Button
        size="lg"
        className="font-bold text-xl"
        onPress={(): void => {
          router.push("/login").catch((error: unknown) => {
            throw error;
          });
        }}
      >
        IRR-MB
      </Button>
      <Button
        size="lg"
        className="font-bold text-xl"
        onPress={(): void => {
          router.push("/login").catch((error: unknown) => {
            throw error;
          });
        }}
      >
        PCaas
      </Button>
    </div>
  );
}

export default Landing;
