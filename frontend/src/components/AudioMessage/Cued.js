import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function setDynamicPositionStyles(position, data) {
  if ((position === "previous" && data) || (position === "next" && data))
    return "visible";
  if ((position === "previous" && !data) || (position === "next" && !data))
    return "invisible";
}

const Cued = ({ children, position, data, onClick }) => {
  return (
    <>
      <button
        type="button"
        className={`${position === "previous" ? "lg:order-first" : "lg:order-last"}`}
        role={position === "previous" ? "previous-audio-message" : "next-audio-message"}
        disabled={data ? false : true}
        onClick={onClick}>
        <span
          className={`lg:w-[72px] lg:h-[72px] bg-white-300 dark:bg-black-100 ${setDynamicPositionStyles(
            position,
            data
          )} flex items-center justify-center rounded-full opacity-60 group-hover:opacity-100`}>
          {position === "previous" && !children ? (
            <ChevronLeftIcon className="lg:w-10 lg:order-first" />
          ) : null}
          {position === "next" && !children ? (
            <ChevronRightIcon className="lg:w-10 lg:order-first" />
          ) : null}
          {children}
        </span>
      </button>
    </>
  );
};

export default Cued;
