"use client";

import Facts from "./ui/landing/facts";
import Footer from "./ui/landing/footer";
import Header from "./ui/landing/header";
import NavBar from "./ui/landing/navbar";
import HowItWorks from "./ui/landing/steps";

const Home = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <AdminLayout />
      <Layout />
      <Header />
      <HowItWorks />
      <Facts />
      <Footer />
      <LoginPage />
      <RegisterPage />
    </Provider>
  );
};

export default Home;
