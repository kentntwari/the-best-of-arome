import Link from 'next/link';

import { leagueSpartan } from '@/styles/fonts';

const Logo = () => {
  return (
    <Link
      href="/"
      className={`text-umd ${leagueSpartan.className} leading-4.5 cursor-pointer`}
      aria-label="Logo">
      The Best <br /> of Arome
    </Link>
  );
};

export default Logo;
