import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="relative px-5 lg:px-10 pt-8 pb-5 flex items-center justify-between">
      <Logo />

      <div id="menu" className="flex items-center gap-3 cursor-pointer">
        <Link href="/browse" className="text-sm text-ls-400 dark:text-white-300">
          Browse
        </Link>
        <span className="text-sm text-ls-400 dark:text-white-300">Search</span>
      </div>
    </nav>
  );
};

export default Navbar;
