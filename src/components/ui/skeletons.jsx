import { Card, CardContent } from "@/components/ui/card";

export function WorkerCardSkeleton() {
    return (
        <Card className="overflow-hidden border shadow-sm">
            <div className="aspect-video w-full bg-muted animate-pulse" />
            <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    </div>
                    <div className="h-6 w-12 bg-muted animate-pulse rounded-full" />
                </div>
                <div className="flex gap-2">
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                </div>
                <div className="pt-2 flex justify-between items-center">
                    <div className="h-5 w-20 bg-muted animate-pulse rounded" />
                    <div className="h-9 w-24 bg-muted animate-pulse rounded" />
                </div>
            </CardContent>
        </Card>
    );
}

export function StatsSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                            <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
