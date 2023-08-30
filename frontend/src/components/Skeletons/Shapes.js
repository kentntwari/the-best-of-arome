const LineSkeleton = ({
  width,
  height = "h-4",
  bgColor = "bg-gradient-to-r from-ls-300 dark:from-dp-100 via-ls-100 dark:via-dp-100",
  animation = "animate-pulse",
  customClasses = "",
}) => {
  return (
    <span
      className={`${width} ${height} ${bgColor} ${animation} ${customClasses}`}></span>
  );
};

const CircleSkeleton = ({
  width = "w-4",
  height = "h-4",
  bgColor = "bg-gradient-to-r from-ls-300 dark:from-dp-100 via-ls-100 dark:via-dp-100",
  animation = "animate-pulse",
  customClasses = "",
}) => {
  return (
    <span
      className={`${width} ${height} ${bgColor} ${animation} rounded-full ${customClasses}`}></span>
  );
};

export { LineSkeleton, CircleSkeleton };
