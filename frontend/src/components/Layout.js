import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
