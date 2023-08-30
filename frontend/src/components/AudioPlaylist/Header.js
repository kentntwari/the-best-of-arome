import Link from "next/link";

const Header = ({ children }) => {
  return (
    <>
      <Link
        href="/browse"
        className="underline underline-offset-3 text-sm text-neutral-200 dark:text-neutral-20 decoration-neutral-200">
        Back to browse
      </Link>

      <header
        className="mt-6 px-3 py-4 rounded-lg bg-la-300 dark:bg-black-300 flex flex-col gap-3"
        aria-label="playlist header">
        <span className="w-fit px-3 py-2 rounded-full bg-white-300 text-xs text-black-300">
          Playlist
        </span>
        <div>{children}</div>
      </header>
    </>
  );
};

export default Header;
