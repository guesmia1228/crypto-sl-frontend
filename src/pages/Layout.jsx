import Contact from "./../components/contact/contact";
import Footer from "./../components/footer/footer";
import Navigation from "./../components/navigation/navigation";

const Layout = ({ children, affiliate }) => {
  return (
    <>
      <Navigation />

      {children}
      <Contact affiliate={affiliate} />
      <Footer />
    </>
  );
};

export default Layout;
