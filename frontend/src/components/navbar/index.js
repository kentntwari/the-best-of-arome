import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Menu from './Menu';
import Logo from './Logo';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

  const router = useRouter();

  useEffect(() => setDisplayMobileMenu(false), [router.pathname]);

  return (
    <nav className="relative px-5 pt-8 pb-5 flex items-center justify-between">
      <Logo />

      <div
        id="hamburger-menu"
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setDisplayMobileMenu((prev) => !prev)}>
        <Bars3BottomLeftIcon className="w-6" />
        <span className="text-sm text-ls-400">Menu</span>
      </div>

      <Menu display={displayMobileMenu} />
    </nav>
  );
};

export default Navbar;
