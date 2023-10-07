import { useEffect } from "react";

import { useRouter } from "next/router";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SwitchTheme from "./SwitchTheme";

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    if (mounted && document.body.hasAttribute("style")) {
      document.body.removeAttribute("style");
    }

    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <>
      <Navbar />

      <SwitchTheme />

      <div className="grow grid">{children}</div>

      <Footer />
    </>
  );
};

export default Layout;
