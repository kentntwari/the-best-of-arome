const LineSkeleton = ({
  width,
  height = "h-4",
  bgColor = "bg-gradient-to-r from-ls-300 dark:from-dp-100 via-ls-100 dark:via-dp-100",
  animation = "animate-pulse",
  className = "",
  children,
}) => {
  return (
    <span className={`${width} ${height} ${bgColor} ${animation} ${className}`}>
      {children}
    </span>
  );
};

const CircleSkeleton = ({
  width = "w-4",
  height = "h-4",
  bgColor = "bg-gradient-to-r from-ls-300 dark:from-dp-100 via-ls-100 dark:via-dp-100",
  animation = "animate-pulse",
  className = "",
  children,
}) => {
  return (
    <span
      className={`${width} ${height} ${bgColor} ${animation} rounded-full ${className}`}>
      {children}
    </span>
  );
};

export { LineSkeleton, CircleSkeleton };
