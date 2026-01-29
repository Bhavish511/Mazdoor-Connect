import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useApp } from "@/context/app-context";
import { WorkerCard } from "@/components/workers/worker-card";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CustomerFavoritesPage() {
    const { favoriteWorkers, getWorkerById } = useApp();
    const favorites = favoriteWorkers.map(id => getWorkerById(id)).filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">My Favorite Workers</h1>

                    {favorites.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {favorites.map(worker => (
                                <WorkerCard key={worker.id} worker={worker} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
                            <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
                            <p className="text-muted-foreground mb-6">Start browsing verified workers and save your favorites here.</p>
                            <Button asChild>
                                <Link to="/categories">Browse Workers</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
