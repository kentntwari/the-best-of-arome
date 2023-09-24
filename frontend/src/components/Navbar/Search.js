import { forwardRef, useRef } from "react";

import Link from "next/link";

import { v4 as uuidv4 } from "uuid";

import { useFuzzySearch } from "@/hooks/useFuzzySearch";
import { useIsClickOutsideComponent } from "@/hooks/useIsClickOutsideComponent";


import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Search = forwardRef((props, ref) => {
  const form_ref = useRef();

  const [data, searchFn] = useFuzzySearch();

  const isClickOutsideComponent = useIsClickOutsideComponent(form_ref);

  return (
    <div
      ref={ref}
      className={`${isClickOutsideComponent ? 'hidden' : 'block'} xl:block xl:w-[412px] absolute xl:static left-0 -bottom-10 z-100 xl:z-10 px-5 w-full`}>
      <search>
        <form
          ref={form_ref}
          className="relative text-xs lg:text-sm"
          onSubmit={(e) => e.preventDefault()}>
          <div className="bg-la-50 dark:bg-black-300 px-2 py-3 flex items-center gap-2 border border-la-300 dark:border-black-300 rounded-[4px]">
            <label>
              <MagnifyingGlassIcon className="w-4 text-ls-500 dark:text-white-300" />
            </label>
            <input
              type="text"
              onChange={searchFn}
              className="grow bg-transparent text-ls-500 dark:text-white-300 placeholder:text-ls-500 dark:placeholder:text-white-300 border-0 outline-none"
              placeholder="Search audio messages..."
            />
          </div>

          {!isClickOutsideComponent ? (
            <section className="absolute left-0 mt-1 w-full bg-white-300 dark:bg-black-300 rounded-[4px] shadow-ln dark:shadow-dn">
              <ul
                className={`${!data ? "hidden" : "flex flex-col gap-0"}`}
                title="search results">
                {data?.length > 0 &&
                  data.map(({ title, slug }) => (
                    <li
                      key={uuidv4()}
                      className="px-2 py-3 hover:bg-neutral-20 dark:hover:bg-black-200 text-neutral-300 dark:text-white-300">
                      <Link href={`/audio-message/${encodeURIComponent(slug)}`}>
                        {title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ) : null}
        </form>
      </search>
    </div>
  );
});

export default Search;
