import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonListing() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {Array.from({ length: 4 }).map((card, idx) => (
            <div className="col-span-1" key={idx}>
              <Card className="w-full max-w-xs">
                <CardContent>
                  <Skeleton className="aspect-video w-full" />
                </CardContent>
                <CardHeader>
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
