"use client";

import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { WORKER_CATEGORIES } from "@/types";
import { platformStats } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Star,
  Shield,
  CheckCircle2,
  Users,
  Briefcase,
  Zap,
  Droplets,
  Wind,
  Hammer,
  Paintbrush,
  ArrowRight,
  Clock,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  electrician: Zap,
  plumber: Droplets,
  "ac-mechanic": Wind,
  carpenter: Hammer,
  painter: Paintbrush,
};

export default function HomePage() {
  const { t, getFeaturedWorkers, searchQuery, setSearchQuery } = useApp();
  const featuredWorkers = getFeaturedWorkers();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("app.tagline")}
            </Badge>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t("hero.headline")}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
              {t("hero.subheadline")}
            </p>

            {/* Search Bar */}
            <div className="mx-auto mb-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for electrician, plumber, carpenter..."
                  className="h-12 pl-10 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="h-12" asChild>
                <Link to="/categories">{t("cta.findWorker")}</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>{t("trust.policeVerified")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{t("trust.cnicVerified")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("nav.categories")}
              </h2>
              <p className="mt-2 text-muted-foreground">
                Find the right worker for your needs
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/categories" className="flex items-center gap-2">
                {t("cta.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {WORKER_CATEGORIES.map((category) => {
              const Icon = categoryIcons[category.id] || Briefcase;
              return (
                <Link key={category.id} to={`/categories/${category.id}`}>
                  <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {t(`category.${category.id}`)}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {category.nameUrdu}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">
                {platformStats.happyCustomers}+
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {t("stats.happyCustomers")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">
                {platformStats.verifiedWorkers}+
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {t("stats.verifiedWorkers")}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary md:text-4xl">
                {platformStats.avgRating}
                <Star className="h-6 w-6 fill-primary" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {t("stats.avgRating")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">
                {platformStats.jobsCompleted.toLocaleString()}+
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {t("stats.jobsCompleted")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Top Rated Workers
              </h2>
              <p className="mt-2 text-muted-foreground">
                Our most trusted and highly rated professionals
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/categories" className="flex items-center gap-2">
                {t("cta.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredWorkers.map((worker) => {
              const CategoryIcon = categoryIcons[worker.category] || Briefcase;
              return (
                <Card
                  key={worker.id}
                  className="group overflow-hidden transition-all hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="flex gap-4 p-4">
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
                            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                              <CategoryIcon className="h-3.5 w-3.5" />
                              <span>{t(`category.${worker.category}`)}</span>
                            </div>
                          </div>
                          {worker.verified.police && (
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
                          <span className="text-muted-foreground">
                            {worker.jobsCompleted} jobs
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-3">
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">
                          Rs. {worker.priceRange.min.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          {" "}
                          - {worker.priceRange.max.toLocaleString()}
                        </span>
                      </div>
                      <Button size="sm" asChild>
                        <Link to={`/workers/${worker.id}`}>
                          {t("cta.viewProfile")}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              {t("nav.howItWorks")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get your work done in 3 simple steps
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                {t("howItWorks.step1.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("howItWorks.step1.desc")}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                {t("howItWorks.step2.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("howItWorks.step2.desc")}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                {t("howItWorks.step3.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("howItWorks.step3.desc")}
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link to="/categories">{t("cta.findWorker")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-primary-foreground/90">
            Join thousands of satisfied customers who trust Mazdoor Connect for
            their home service needs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="min-w-[180px]"
              asChild
            >
              <Link to="/categories">Find a Worker</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[180px] border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <Link to="/register">Become a Worker</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
