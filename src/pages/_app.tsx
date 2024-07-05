import "@/styles/globals.css";
import RootLayout from "@/components/layouts/rootLayout";
import Providers from "@/providers/providers";
import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Providers>
  );
}

export default MyApp;
