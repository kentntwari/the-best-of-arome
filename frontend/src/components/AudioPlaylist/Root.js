const Root = ({ children }) => {
  return (
    <>
      <section className="lg:absolute lg:top-0 lg:h-full row-span-full col-span-full px-5 py-4 bg-lp-300 dark:bg-dp-300 z-50 lg:w-[65%] lg:justify-self-end">
        {children}
      </section>
    </>
  );
};

export default Root;
