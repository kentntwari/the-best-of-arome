import Link from 'next/link';
import { League_Spartan } from 'next/font/google';

const leagueSpartan = League_Spartan({
  weight: ['900'],
  style: ['normal'],
  preload: false,
});

const Logo = () => {
  return (
    <Link href="/" className={`text-umd ${leagueSpartan.className} leading-4.5 cursor-pointer`} aria-label="Logo">
      The Best <br /> of Arome
    </Link>
  );
};

export default Logo;
