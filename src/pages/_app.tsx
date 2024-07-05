import "@/styles/globals.css"
import RootLayout from "@/components/layouts/rootLayout"
import type { AppProps } from "next/app"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  )
}

export default MyApp
