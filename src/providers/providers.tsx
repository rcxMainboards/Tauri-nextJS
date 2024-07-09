//providers.tsx
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  //create client
  const queryClient = new QueryClient();

  const navigate = (url: string) => {
    router.push(url).catch((err: unknown) => {
      console.error(err);
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate}>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}
