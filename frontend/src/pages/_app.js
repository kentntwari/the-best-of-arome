import Script from "next/script";

import { SWRConfig } from "swr";

import { PlayerProvider } from "@/context/PlayerContext";

import Layout from "@/components/Layout";

import "../styles/globals.css";
import { poppins } from "@/styles/fonts";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
        revalidateOnFocus: false,
      }}>
      <div
        className={`min-h-screen mx-auto flex flex-col ${poppins.variable} font-sans font-normal`}>
        <PlayerProvider>
          <Layout>
            <Component {...pageProps} />

            {/* DARK MODE SCRIPT */}
            <Script id="application-theme" strategy="beforeInteractive">
              {`if(!localStorage?.getItem("theme") 
                    && window.matchMedia('(prefers-color-scheme: dark)').matches 
                  )
                    {
                      localStorage.setItem("theme","dark");
                      document?.documentElement.classList.add("dark");
                      document?.documentElement.setAttribute("data-theme", "dark");
                    }
              
                if(!localStorage?.getItem("theme") 
                    && !window.matchMedia('(prefers-color-scheme: dark)').matches)
                    {
                      localStorage.setItem("theme", "light");
                      document?.documentElement.setAttribute("data-theme", "light");
                    }

                if(localStorage?.getItem("theme") 
                    && localStorage.getItem("theme") === 'dark' 
                  )
                  {
                    document?.documentElement.classList.add("dark")
                    document?.documentElement.setAttribute("data-theme", "dark");
                  }                  

                if(localStorage.getItem("theme") 
                    && localStorage.getItem("theme") === 'light'
                    && document?.documentElement.classList.contains("dark"))
                  {
                    document?.documentElement.classList.remove("dark")
                    document?.documentElement.setAttribute("data-theme", "light");
                  }
              `}
            </Script>
          </Layout>
        </PlayerProvider>
      </div>
    </SWRConfig>
  );
}
