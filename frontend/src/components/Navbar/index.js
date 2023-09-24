import { useRef } from "react";

import Link from "next/link";

import Logo from "./Logo";
import Search from "./Search";

const Navbar = () => {
  const searchBar_ref = useRef();

  return (
    <nav
      className="relative px-5 lg:px-10 pt-8 pb-5 xl:px-0 xl:py-10 flex items-center xl:items-end justify-between"
      role="navigation">
      <div className="flex items-end gap-20">
        <Logo />
        <Link
          href="/browse"
          className="hidden xl:block font-semibold text-base text-ls-400 dark:text-white-300">
          Browse
        </Link>
      </div>

      <div className="flex items-center gap-3 cursor-pointer">
        {/* ON SMALL DEVICES */}
        <Link
          href="/browse"
          className="xl:hidden text-sm lg:text-base text-ls-400 dark:text-white-300">
          Browse
        </Link>
        <button
          type="button"
          className="xl:hidden text-sm lg:text-base text-ls-400 dark:text-white-300 outline-transparent"
          onClick={() => searchBar_ref.current.classList.toggle("hidden")}>
          Search
        </button>

        <Search ref={searchBar_ref} />
      </div>
    </nav>
  );
};

export default Navbar;
