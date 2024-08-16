import Sidebar from "@/components/app/sidebar";
import Header from "@/components/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full ">
      <Sidebar />
      <div className="flex-grow flex flex-col transition-all duration-300 w-full overflow-x-scroll">
        <Header />
        <main className="flex-grow md:pt-3 pt-5 bg-gray-100 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
