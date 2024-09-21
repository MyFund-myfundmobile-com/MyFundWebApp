import ChatAdmin from "@/components/ChatAdmin";
import Facts from "@/components/landing/facts";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HowItWorks from "@/components/landing/steps";

const HomePage = () => {
  return (
    <main className="px-6 lg:px-10 xl:px-20">
      <Header />
      <HowItWorks />
      <Facts />
      <Footer />
      <ChatAdmin />
    </main>
  );
};

export default HomePage;
