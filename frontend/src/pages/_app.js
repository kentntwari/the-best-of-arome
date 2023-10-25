import Script from "next/script";
import { SWRConfig } from "swr";
import { NextSeo } from "next-seo";
import Layout from "@/components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) =>
          fetch(...args).then((res) => {
            if (!res.ok) {
              const error = new Error("An error occurred while fetching the data.");
              // Attach extra info to the error object.
              error.info = res.json();
              error.status = res.status;
              throw error;
            }

            return res.json();
          }),
        keepPreviousData: true,
        revalidateOnFocus: false,
        onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
          // Only retry up to 10 times.
          if (retryCount >= 10) return;

          // Retry after 5 seconds.
          setTimeout(() => revalidate({ retryCount }), 2500);
        },
      }}>
      <div
        className={`min-h-screen min-w-[335px] xl:max-w-7xl mx-auto overflow-auto flex flex-col  font-sans font-normal`}>
        <Layout>
          <NextSeo
            description="Listen to compilations of Apostle Arome Osayi most inspirational audio messages excerpts"
            titleTemplate="%s | The Best of Arome Osayi"
            defaultTitle="The Best of Arome Osayi"
          />
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
      </div>
    </SWRConfig>
  );
}
