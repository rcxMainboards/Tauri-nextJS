import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex min-h-screen dark flex-col pattern-bg p-10"> {children} </main>;
}
