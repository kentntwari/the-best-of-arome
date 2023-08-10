import { useRouter } from "next/router";

import Navbar from "./Navbar";
import Footer from "./Footer";
import AudioBanner from "./AudioBanner";
import SwitchTheme from "./SwitchTheme";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Navbar />

      {router.pathname === "/browse" && !router.query.playlist && <AudioBanner />}

      <SwitchTheme />
      
      <div className="grow">{children}</div>

      <Footer />
    </>
  );
};

export default Layout;
