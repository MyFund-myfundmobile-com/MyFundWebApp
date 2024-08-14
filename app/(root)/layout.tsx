import ChatAdmin from "@/components/ChatAdmin";
import NavBar from "@/components/landing/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
      <ChatAdmin />
    </>
  );
}
