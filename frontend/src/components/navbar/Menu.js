import Link from 'next/link';

const Menu = ({ display }) => {
  return (
    <div
      className={`${
        display ? 'block' : 'hidden'
      } bg-white-300 absolute left-0 top-24 p-3 w-full`}>
      <Link
        href="/browse"
        className="block font-semibold text-center text-sm text-neutral-300">
        Browse
      </Link>
      <p className="mt-6 font-semibold text-center text-sm text-neutral-300">Search</p>
      <p className="mt-6 text-center">LinkText</p>
    </div>
  );
};

export default Menu;
