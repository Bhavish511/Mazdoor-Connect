
import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import type { Worker } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Shield, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkerCardProps {
  worker: Worker;
  onBook?: () => void;
}

export function WorkerCard({ worker, onBook }: WorkerCardProps) {
  const { t, isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(worker.id);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={worker.avatar || "/placeholder.svg"}
            alt={worker.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Verification Badges */}
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {worker.verified.cnic && (
              <Badge variant="secondary" className="bg-background/90 text-xs">
                <Shield className="mr-1 h-3 w-3 text-primary" />
                CNIC
              </Badge>
            )}
            {worker.verified.police && (
              <Badge variant="secondary" className="bg-background/90 text-xs">
                <CheckCircle2 className="mr-1 h-3 w-3 text-primary" />
                Police
              </Badge>
            )}
          </div>
          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(worker.id)}
            className={cn(
              "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 transition-colors hover:bg-background",
              favorite ? "text-red-500" : "text-muted-foreground"
            )}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
          </button>
          {/* Available Today Badge */}
          {worker.availableToday && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-primary text-primary-foreground">
                {t("worker.available")}
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-3 p-4">
          {/* Name and Rating */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1">
                {worker.name}
              </h3>
              <p className="text-sm text-muted-foreground capitalize">
                {t(`category.${worker.category}`)}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium text-sm">{worker.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({worker.reviewCount})
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{worker.jobsCompleted} {t("worker.jobs")}</span>
            <span>
              Rs. {worker.priceRange.min.toLocaleString()}-{worker.priceRange.max.toLocaleString()}
            </span>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-1">
            {worker.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {worker.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{worker.specialties.length - 3}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <Link to={`/workers/${worker.id}`}>{t("cta.viewProfile")}</Link>
            </Button>
            <Button
              className="flex-1"
              onClick={onBook}
              asChild={!onBook}
            >
              {onBook ? (
                t("cta.bookNow")
              ) : (
                <Link to={`/book/${worker.id}`}>{t("cta.bookNow")}</Link>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
