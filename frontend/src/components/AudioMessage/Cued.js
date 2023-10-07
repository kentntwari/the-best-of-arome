import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function setDynamicPositionStyles(position, data) {
  if ((position === "previous" && data) || (position === "next" && data))
    return "visible";
  if ((position === "previous" && !data) || (position === "next" && !data))
    return "invisible";
}

const Cued = ({
  children,
  position,
  data,
  onClick,
  width = "w-24 md:w-[72px]",
  height = "h-24 md:h-[72px]",
  bgColor = "bg-white-300 dark:bg-black-100",
  className = null,
}) => {
  return (
    <>
      <button
        type="button"
        className={`${position === "previous" ? "lg:order-first" : "lg:order-last"}${
          className ? ` ${className}` : ""
        }`}
        role={position === "previous" ? "previous-audio-message" : "next-audio-message"}
        disabled={data ? false : true}
        onClick={onClick}>
        <span
          className={`${width} ${height} ${bgColor} ${setDynamicPositionStyles(
            position,
            data
          )} flex items-center justify-center rounded-full opacity-60 base:group-hover:opacity-100 group-active:opacity-60`}>
          {position === "previous" && !children ? (
            <ChevronLeftIcon className="w-10 lg:order-first" />
          ) : null}

          {position === "next" && !children ? (
            <ChevronRightIcon className="w-10 lg:order-first" />
          ) : null}

          {children}
        </span>
      </button>
    </>
  );
};

export default Cued;
