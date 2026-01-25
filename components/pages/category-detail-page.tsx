"use client";

import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { WORKER_CATEGORIES, WorkerCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Star,
  Shield,
  MapPin,
  Filter,
  Zap,
  Droplets,
  Wind,
  Hammer,
  Paintbrush,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  electrician: Zap,
  plumber: Droplets,
  "ac-mechanic": Wind,
  carpenter: Hammer,
  painter: Paintbrush,
};

export default function CategoryDetailPage() {
  const { category } = useParams<{ category: string }>();
  const { t, getWorkersByCategory } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const categoryInfo = WORKER_CATEGORIES.find((c) => c.id === category);
  const workers = getWorkersByCategory(category as WorkerCategory);

  const filteredWorkers = useMemo(() => {
    let result = [...workers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(query) ||
          w.specialties.some((s) => s.toLowerCase().includes(query)) ||
          w.location.toLowerCase().includes(query)
      );
    }

    // Available filter
    if (showAvailableOnly) {
      result = result.filter((w) => w.availableToday);
    }

    // Verified filter
    if (showVerifiedOnly) {
      result = result.filter((w) => w.verified.police && w.verified.cnic);
    }

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "jobs":
        result.sort((a, b) => b.jobsCompleted - a.jobsCompleted);
        break;
      case "price-low":
        result.sort((a, b) => a.priceRange.min - b.priceRange.min);
        break;
      case "price-high":
        result.sort((a, b) => b.priceRange.max - a.priceRange.max);
        break;
      case "experience":
        result.sort((a, b) => b.experience - a.experience);
        break;
    }

    return result;
  }, [workers, searchQuery, sortBy, showAvailableOnly, showVerifiedOnly]);

  const CategoryIcon = categoryIcons[category || ""] || Briefcase;

  if (!categoryInfo) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Button asChild className="mt-4">
          <Link to="/categories">Back to Categories</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <Link
            to="/categories"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <CategoryIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t(`category.${category}`)}
              </h1>
              <p className="text-muted-foreground">
                {filteredWorkers.length} workers available
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, specialty, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="jobs">Most Jobs</SelectItem>
                <SelectItem value="experience">Most Experience</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                checked={showAvailableOnly}
                onCheckedChange={(checked) =>
                  setShowAvailableOnly(checked as boolean)
                }
              />
              Available Today
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                checked={showVerifiedOnly}
                onCheckedChange={(checked) =>
                  setShowVerifiedOnly(checked as boolean)
                }
              />
              Verified Only
            </label>
          </div>
        </div>

        {/* Workers Grid */}
        {filteredWorkers.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              No workers found matching your criteria
            </p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("");
                setShowAvailableOnly(false);
                setShowVerifiedOnly(false);
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorkers.map((worker) => (
              <Card
                key={worker.id}
                className="group overflow-hidden transition-all hover:shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={worker.avatar || "/placeholder.svg"}
                          alt={worker.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        {worker.availableToday && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-green-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {worker.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {worker.experience} years experience
                            </p>
                          </div>
                          {worker.verified.police && worker.verified.cnic && (
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary"
                            >
                              <Shield className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium">{worker.rating}</span>
                            <span className="text-muted-foreground">
                              ({worker.reviewCount})
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {worker.location}
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {worker.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {worker.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{worker.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-3">
                    <div className="text-sm">
                      <span className="font-semibold text-foreground">
                        Rs. {worker.priceRange.min.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        {" - "}
                        {worker.priceRange.max.toLocaleString()}
                      </span>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/workers/${worker.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
