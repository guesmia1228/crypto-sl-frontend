import Contact from "./../components/contact/contact";
import Footer from "./../components/footer/footer";
import Navigation from "./../components/navigation/navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />

      {children}
      <Contact />
      <Footer />
    </>
  );
};

export default Layout;
