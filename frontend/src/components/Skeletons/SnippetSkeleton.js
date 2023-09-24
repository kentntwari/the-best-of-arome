import * as Shapes from "./ShapeSkeleton";

const SnippetSkeleton = () => {
  return (
    <div className="xl:w-80 p-5 flex flex-col gap-5 bg-la-300 dark:bg-dp-200 opacity-70 rounded-lg">
      <div className="w-full flex flex-col gap-2">
        <Shapes.LineSkeleton width="w-full" />
        <Shapes.LineSkeleton width="w-10/12" />
      </div>

      <div className="w-full flex items-center justify-between">
        <Shapes.LineSkeleton width="w-14" />
        <div className="flex items-center gap-3">
          <span className="text-ls-100 dark:text-da-100 animate-pulse">--:--</span>
          <Shapes.CircleSkeleton width="w-9" height="h-9" />
        </div>
      </div>
    </div>
  );
};

export default SnippetSkeleton;
