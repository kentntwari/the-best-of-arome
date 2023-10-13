import { useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

const Filter = () => {
  const router = useRouter();

  const filterBy_ref = useRef();

  const toggleDropdown = useCallback(() => {
    filterBy_ref?.current?.classList?.toggle("hidden");
  }, []);

  return (
    <>
      <button
        className="px-2 py-1 border border-neutral-200 dark:border-white-300 rounded flex items-center gap-2"
        onClick={toggleDropdown}>
        <AdjustmentsHorizontalIcon className="w-4 text-neutral-200 dark:text-white-300" />
        <span className="text-sm text-neutral-200 dark:text-white-300">Filter by</span>

        <div
          ref={filterBy_ref}
          className="hidden absolute right-0 top-9 p-2 bg-white-300 rounded-lg shadow-ln">
          {["Most recent", "Longest", "Shortest", "Oldest"].map((link, index) => (
            <Link
              key={uuidv4()}
              className={`block ${
                index > 0 && "mt-4"
              } text-xs text-center text-black-300`}
              href={{
                pathname: router.pathname,
                query: {
                  ...router.query,
                  sort: `${link.toLowerCase().replaceAll(" ", "-")}`,
                },
              }}>
              {link}
            </Link>
          ))}
        </div>
      </button>
    </>
  );
};

export default Filter;
