import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-14 items-center gap-3">
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="hidden md:block h-9 flex-1 max-w-xl rounded-xl md:ml-4" />
          <Skeleton className="ml-auto h-9 w-24 rounded-lg md:w-32" />
        </div>
      </div>
      <main className="container py-8 pb-mobile-nav md:pb-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Skeleton className="lg:col-span-2 aspect-[2.5/1] rounded-2xl" />
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <Skeleton className="min-h-[132px] rounded-2xl" />
            <Skeleton className="min-h-[132px] rounded-2xl" />
          </div>
        </div>
        <div className="flex gap-2 overflow-hidden pb-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
