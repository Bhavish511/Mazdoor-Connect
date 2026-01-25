"use client";

import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { WORKER_CATEGORIES } from "@/types";
import { getCategoryCount } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Droplets,
  Wind,
  Hammer,
  Paintbrush,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  electrician: Zap,
  plumber: Droplets,
  "ac-mechanic": Wind,
  carpenter: Hammer,
  painter: Paintbrush,
};

export default function CategoriesPage() {
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            {t("nav.categories")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our categories and find the right worker for your needs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WORKER_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category.id] || Briefcase;
            const workerCount = getCategoryCount(category.id);

            return (
              <Link key={category.id} to={`/categories/${category.id}`}>
                <Card className="group h-full cursor-pointer transition-all hover:border-primary hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-foreground">
                        {t(`category.${category.id}`)}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {category.nameUrdu}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {workerCount} workers available
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
