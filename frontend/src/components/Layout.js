import { useRouter } from "next/router";

import Navbar from "./Navbar";
import Footer from "./Footer";
import AudioBanner from "./AudioBanner";
import SwitchTheme from "./SwitchTheme";
import AudioPlaylist from "./AudioPlaylist";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Navbar />

      {router.pathname === "/" && <AudioBanner />}
      {router.pathname === "/browse" && !router.query.playlist && <AudioBanner />}

      <SwitchTheme />

      <div className="grow grid grid-cols-3">
        {router.query.playlist && (
          <>
            <AudioPlaylist />
            <div className="hidden lg:block lg:absolute lg:top-0 lg:w-full lg:h-full bg-black-300  opacity-20 z-10"></div>
          </>
        )}
        <div className="row-span-full col-span-full">{children}</div>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
