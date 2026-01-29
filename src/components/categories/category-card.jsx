import React from "react"
import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Droplets, Wind, Hammer, Paintbrush, ArrowRight } from "lucide-react";
import { getCategoryCount } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const categoryIcons = {
    electrician: <Zap className="h-8 w-8" />,
    plumber: <Droplets className="h-8 w-8" />,
    "ac-mechanic": <Wind className="h-8 w-8" />,
    carpenter: <Hammer className="h-8 w-8" />,
    painter: <Paintbrush className="h-8 w-8" />,
};

const categoryColors = {
    electrician: "bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100",
    plumber: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    "ac-mechanic": "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100",
    carpenter: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
    painter: "bg-pink-50 text-pink-600 group-hover:bg-pink-100",
};

export function CategoryCard({ category, className }) {
    const { t } = useApp();
    const count = getCategoryCount(category);

    return (
        <Link to={`/categories/${category}`}>
            <Card
                className={cn(
                    "group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1",
                    className
                )}
            >
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div
                            className={cn(
                                "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                                categoryColors[category]
                            )}
                        >
                            {categoryIcons[category]}
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                    <div className="mt-4 space-y-1">
                        <h3 className="font-semibold text-lg text-foreground">
                            {t(`category.${category}`)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {count} verified workers
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
