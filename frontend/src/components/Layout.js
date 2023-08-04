import { useRouter } from "next/router";

import Navbar from "./Navbar";
import Footer from "./Footer";
import AudioBanner from "./AudioBanner";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Navbar />

      {router.pathname === "/" && <AudioBanner />}
      {router.pathname === "/browse" && !router.query.playlist && <AudioBanner />}

      <div className="grow">{children}</div>

      <Footer />
    </>
  );
};

export default Layout;
