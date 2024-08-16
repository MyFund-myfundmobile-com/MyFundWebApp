import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/header";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div
        className={`flex-grow flex flex-col transition-all duration-300 w-full`}
      >
        <Header />
        <main className="flex-grow pt-16 px-16 bg-gray-100 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
