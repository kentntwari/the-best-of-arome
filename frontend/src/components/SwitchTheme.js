import { useState, useEffect, useCallback } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const SwitchTheme = () => {
  const [theme, setTheme] = useState(null);

  const toggleTheme = useCallback(() => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark");

      document.documentElement.classList.add("dark");
      return document?.documentElement.setAttribute("data-theme", "dark");
    }

    setTheme("light");

    document.documentElement.classList.remove("dark");
    return document?.documentElement.setAttribute("data-theme", "light");
  }, [theme]);

  useEffect(() => {
    let mounted = true;

    if (mounted && !theme) {
      setTheme(window.localStorage.getItem("theme"));
    }

    if (mounted && theme) {
      window.localStorage.removeItem("theme");
      window.localStorage.setItem("theme", theme);
      document?.documentElement?.setAttribute("data-theme", theme);
    }

    return () => {
      mounted = false;
    };
  }, [theme]);

  return (
    <>
      {theme && (
        <button
          onClick={toggleTheme}
          className="fixed left-5 bottom-4 z-100 flex items-center appearance-none outline-none cursor-pointer"
          type="button"
          name="theme-switcher">
          <div className="opacity-60 dark:opacity-100 bg-neutral-40 dark:bg-dp-300 w-11 h-9 flex place-content-center rounded-tl rounded-bl">
            <MoonIcon className="w-5 text-neutral-100 dark:text-white-300" />
          </div>

          <div className="opacity-100 dark:opacity-60 bg-ls-300 dark:bg-neutral-40 w-11 h-9 flex place-content-center rounded-tr rounded-br">
            <SunIcon className="w-5 text-white-300 dark:text-neutral-100" />
          </div>
        </button>
      )}
    </>
  );
};

export default SwitchTheme;
