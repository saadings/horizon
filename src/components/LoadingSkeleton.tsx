import { Skeleton } from "./ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div>
      <div className="no-scrollbar w-72 p-8">
        <Skeleton className="h-screen w-full dark:bg-slate-800" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
