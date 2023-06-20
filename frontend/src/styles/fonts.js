import { Poppins, League_Spartan } from 'next/font/google';

const leagueSpartan = League_Spartan({
  weight: ['900'],
  style: ['normal'],
  preload: false,
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  preload: false,
});

export { leagueSpartan, poppins };
