import "react";
import Navbar from "../components/custom/Navbar";
import Footer from "../components/custom/Footer";

const RootLayouts = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default RootLayouts;
