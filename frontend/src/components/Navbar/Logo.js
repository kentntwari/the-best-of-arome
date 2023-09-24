import Link from "next/link";

import { leagueSpartan } from "@/styles/fonts";

const Logo = () => {
  return (
    <Link
      href="/"
      className={`text-umd lg:text-[1.5rem] ${leagueSpartan.className} leading-4.5 cursor-pointer`}
      aria-label="Logo">
      <span className="xl:hidden">
        The Best <br /> of Arome
      </span>

      <span className="hidden xl:block leading-[initial]">
        The <br /> Best of
        <br /> Arome
      </span>
    </Link>
  );
};

export default Logo;
