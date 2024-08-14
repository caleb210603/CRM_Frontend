import { cn } from "@/lib/utils"
import { Card } from "./card";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function SaleCardSkeleton() {
  return (
    <Card className={cn("flex rounded-xl overflow-hidden group hover:shadow-2xl bg-background relative")}>
      <div className="bg-background contrast-75 opacity-40 p-6 flex items-center justify-start">
        <Skeleton className="mr-2 h-4 w-24" />
        <Skeleton className="h-6 w-6" />
      </div>
      <div className="bg-background rounded-tr-lg rounded-br-lg shadow-lg p-6 flex-grow relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div>
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <div className="-bottom-2 left-4 flex items-center space-x-2 mt-12 text-gray-400">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </Card>
  );
}

function SaleDetailSkeleton() {
  return (
      <div className="flex items-center space-x-4 rounded-md border p-4 mb-2 relative">
          <div className="absolute top-4 right-4">
              <Skeleton className="w-6 h-6"/>
          </div>
          <div className="w-32 h-32 ">
              <Skeleton className="w-full h-full" />
          </div>
          <div className="flex-1 space-y-1">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-36" />
          </div>
      </div>
  );
}
export { Skeleton, SaleCardSkeleton, SaleDetailSkeleton }
