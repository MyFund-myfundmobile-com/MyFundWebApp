import Facts from "./ui/landing/facts";
import Footer from "./ui/landing/footer";
import Header from "./ui/landing/header";
import HowItWorks from "./ui/landing/steps";

const Home = () => {
  return (
    <div>
      <Header />
      <HowItWorks />
      <Facts />
      <Footer />
    </div>
  );
};

export default Home;
