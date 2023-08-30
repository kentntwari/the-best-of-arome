import Filter from "./Filter";

const Catalogue = ({ children }) => {
  return (
    <>
      <section className="mt-6 flex flex-col gap-4">
        <div className="relative flex items-center justify-between">
          <span className="grow font-semibold text-base">All messages</span>

          <Filter />
        </div>

        <ul className="border border-la-300 dark:border-dp-200 shadow-ls dark:shadow-ds">
          {children}
        </ul>
      </section>
    </>
  );
};

export default Catalogue;
