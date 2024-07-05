//providers.tsx
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigate = (url: string) => {
    router.push(url).catch((err: unknown) => {
      console.error(err);
    });
  };

  return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
}
