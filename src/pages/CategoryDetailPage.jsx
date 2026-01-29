import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearFilters, updateFilter } from '@/store/slices/workersSlice';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { WorkerCard } from '@/components/workers/worker-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function CategoryDetailPage() {
    const params = useParams();
    const category = params.category;
    const { t, getWorkersByCategory } = useApp();
    const dispatch = useAppDispatch();
    const { filters } = useAppSelector((state) => state.workers);

    const [searchQuery, setSearchQuery] = useState('');
    const [localFilters, setLocalFilters] = useState({
        availableToday: false,
        minRating: 0,
        priceMin: 0,
        priceMax: 10000,
    });

    const allWorkers = getWorkersByCategory(category);

    const filteredWorkers = useMemo(() => {
        return allWorkers.filter((worker) => {
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (
                    !worker.name.toLowerCase().includes(query) &&
                    !worker.specialties.some((s) => s.toLowerCase().includes(query))
                ) {
                    return false;
                }
            }

            if (localFilters.availableToday && !worker.availableToday) {
                return false;
            }

            if (localFilters.minRating && worker.rating < localFilters.minRating) {
                return false;
            }

            if (localFilters.priceMin && worker.priceRange.min < localFilters.priceMin) {
                return false;
            }
            if (localFilters.priceMax && worker.priceRange.max > localFilters.priceMax) {
                return false;
            }

            return true;
        });
    }, [allWorkers, searchQuery, localFilters]);

    const sortedWorkers = useMemo(() => {
        const sorted = [...filteredWorkers];
        switch (filters.sortBy) {
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'jobs':
                return sorted.sort((a, b) => b.jobsCompleted - a.jobsCompleted);
            case 'price-low':
                return sorted.sort((a, b) => a.priceRange.min - b.priceRange.min);
            case 'price-high':
                return sorted.sort((a, b) => b.priceRange.max - a.priceRange.max);
            default:
                return sorted.sort((a, b) => b.rating - a.rating);
        }
    }, [filteredWorkers, filters.sortBy]);

    const handleClearFilters = () => {
        setLocalFilters({
            availableToday: false,
            minRating: 0,
            priceMin: 0,
            priceMax: 10000,
        });
        setSearchQuery('');
        dispatch(clearFilters());
    };

    const hasActiveFilters =
        searchQuery ||
        localFilters.availableToday ||
        localFilters.minRating ||
        localFilters.priceMin ||
        localFilters.priceMax !== 10000;

    const FilterContent = () => (
        <div className="space-y-6">
            <div className="space-y-3">
                <Label className="text-sm font-medium">Availability</Label>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="available-today"
                        checked={localFilters.availableToday}
                        onCheckedChange={(checked) =>
                            setLocalFilters((prev) => ({ ...prev, availableToday: !!checked }))
                        }
                    />
                    <label
                        htmlFor="available-today"
                        className="text-sm text-muted-foreground cursor-pointer"
                    >
                        Available Today
                    </label>
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-sm font-medium">Minimum Rating</Label>
                <Select
                    value={String(localFilters.minRating || '0')}
                    onValueChange={(value) =>
                        setLocalFilters((prev) => ({ ...prev, minRating: Number(value) }))
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">All Ratings</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                <Label className="text-sm font-medium">
                    Price Range: Rs. {localFilters.priceMin?.toLocaleString()} - Rs.{' '}
                    {localFilters.priceMax?.toLocaleString()}
                </Label>
                <Slider
                    value={[localFilters.priceMin || 0, localFilters.priceMax || 10000]}
                    min={0}
                    max={10000}
                    step={500}
                    onValueChange={([min, max]) =>
                        setLocalFilters((prev) => ({ ...prev, priceMin: min, priceMax: max }))
                    }
                />
            </div>

            {hasActiveFilters && (
                <Button variant="outline" className="w-full bg-transparent" onClick={handleClearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Clear All Filters
                </Button>
            )}
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/">{t('nav.home')}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/categories">{t('nav.categories')}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{t(`category.${category}`)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            {t(`category.${category}`)}s in Karachi
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            {sortedWorkers.length} verified workers available
                        </p>
                    </div>

                    <div className="flex flex-col gap-8 lg:flex-row">
                        <aside className="hidden lg:block w-72 shrink-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Filters</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FilterContent />
                                </CardContent>
                            </Card>
                        </aside>

                        <div className="flex-1">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by name or specialty..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" className="lg:hidden bg-transparent">
                                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                                Filters
                                                {hasActiveFilters && (
                                                    <Badge className="ml-2" variant="secondary">
                                                        Active
                                                    </Badge>
                                                )}
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left">
                                            <SheetHeader>
                                                <SheetTitle>Filters</SheetTitle>
                                            </SheetHeader>
                                            <div className="mt-6">
                                                <FilterContent />
                                            </div>
                                        </SheetContent>
                                    </Sheet>

                                    <Select
                                        value={filters.sortBy || 'rating'}
                                        onValueChange={(value) =>
                                            dispatch(
                                                updateFilter({
                                                    sortBy: value,
                                                })
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="rating">Highest Rated</SelectItem>
                                            <SelectItem value="jobs">Most Jobs</SelectItem>
                                            <SelectItem value="price-low">Lowest Price</SelectItem>
                                            <SelectItem value="price-high">Highest Price</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {hasActiveFilters && (
                                <div className="flex flex-wrap items-center gap-2 mb-6">
                                    <span className="text-sm text-muted-foreground">
                                        Active filters:
                                    </span>
                                    {localFilters.availableToday && (
                                        <Badge variant="secondary">Available Today</Badge>
                                    )}
                                    {localFilters.minRating ? (
                                        <Badge variant="secondary">
                                            {localFilters.minRating}+ Stars
                                        </Badge>
                                    ) : null}
                                    {(localFilters.priceMin || localFilters.priceMax !== 10000) && (
                                        <Badge variant="secondary">
                                            Rs. {localFilters.priceMin?.toLocaleString()} - Rs.{' '}
                                            {localFilters.priceMax?.toLocaleString()}
                                        </Badge>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearFilters}
                                        className="h-6 px-2 text-xs"
                                    >
                                        Clear all
                                    </Button>
                                </div>
                            )}

                            {sortedWorkers.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {sortedWorkers.map((worker) => (
                                        <WorkerCard key={worker.id} worker={worker} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center py-16">
                                        <p className="text-lg font-medium text-foreground mb-2">
                                            No workers found
                                        </p>
                                        <p className="text-muted-foreground text-center mb-4">
                                            Try adjusting your filters to see more results
                                        </p>
                                        <Button variant="outline" onClick={handleClearFilters}>
                                            Reset Filters
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
