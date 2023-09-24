const ImageSkeleton = ({
  width,
  height,
  bgColor = "bg-gradient-to-r from-la-300 dark:from-dp-200 via-la-200 dark:via-dp-200 to-la-100 dark:to-dp-200",
  animation = "animate-pulse",
  className = "",
}) => {
  return (
    <div
      className={`${!width ? "w-full" : width} ${
        !height ? "h-full" : height
      } ${bgColor} ${animation} rounded-lg ${className}`}></div>
  );
};

export default ImageSkeleton;
