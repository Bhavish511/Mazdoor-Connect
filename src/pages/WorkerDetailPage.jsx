import { useParams, Link } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { RatingDisplay } from '@/components/ui/rating-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { mockReviews } from '@/lib/mock-data';
import {
    Heart,
    Share2,
    Shield,
    CheckCircle2,
    BadgeCheck,
    MapPin,
    Calendar,
    Briefcase,
    MessageSquare,
    Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WorkerDetailPage() {
    const params = useParams();
    const workerId = params.workerId;
    const { t, getWorkerById, isFavorite, toggleFavorite } = useApp();

    const worker = getWorkerById(workerId);
    const favorite = isFavorite(workerId);
    const reviews = mockReviews.filter((r) => r.workerId === workerId);

    if (!worker) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <Card>
                        <CardContent className="py-16 px-8 text-center">
                            <p className="text-lg font-medium text-foreground mb-2">
                                Worker not found
                            </p>
                            <p className="text-muted-foreground mb-4">
                                The worker profile you're looking for doesn't exist.
                            </p>
                            <Button asChild>
                                <Link to="/categories">Browse Workers</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    const ratingDistribution = [
        { stars: 5, percentage: 78, count: Math.round(worker.reviewCount * 0.78) },
        { stars: 4, percentage: 15, count: Math.round(worker.reviewCount * 0.15) },
        { stars: 3, percentage: 5, count: Math.round(worker.reviewCount * 0.05) },
        { stars: 2, percentage: 2, count: Math.round(worker.reviewCount * 0.02) },
        { stars: 1, percentage: 0, count: 0 },
    ];

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
                                    <Link to={`/categories/${worker.category}`}>
                                        {t(`category.${worker.category}`)}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{worker.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="relative shrink-0">
                                            <img
                                                src={worker.avatar || '/placeholder.svg'}
                                                alt={worker.name}
                                                className="rounded-xl object-cover w-40 h-40"
                                            />
                                            {worker.availableToday && (
                                                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                                    {t('worker.available')}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h1 className="text-2xl font-bold text-foreground">
                                                        {worker.name}
                                                    </h1>
                                                    <p className="text-muted-foreground capitalize">
                                                        {t(`category.${worker.category}`)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => toggleFavorite(worker.id)}
                                                    >
                                                        <Heart
                                                            className={cn(
                                                                'h-4 w-4',
                                                                favorite && 'fill-red-500 text-red-500'
                                                            )}
                                                        />
                                                    </Button>
                                                    <Button variant="outline" size="icon">
                                                        <Share2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <RatingDisplay
                                                    rating={worker.rating}
                                                    reviewCount={worker.reviewCount}
                                                    size="lg"
                                                />
                                            </div>

                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="h-4 w-4" />
                                                    {worker.jobsCompleted} jobs
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {worker.experience} years exp.
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {worker.location}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {worker.verified.cnic && (
                                                    <Badge variant="outline" className="gap-1.5">
                                                        <Shield className="h-3.5 w-3.5 text-primary" />
                                                        CNIC Verified
                                                    </Badge>
                                                )}
                                                {worker.verified.police && (
                                                    <Badge variant="outline" className="gap-1.5">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                                                        Police Verified
                                                    </Badge>
                                                )}
                                                {worker.verified.skill && (
                                                    <Badge variant="outline" className="gap-1.5">
                                                        <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                                                        Skill Tested
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Tabs defaultValue="about" className="space-y-6">
                                <TabsList>
                                    <TabsTrigger value="about">About</TabsTrigger>
                                    <TabsTrigger value="services">Services</TabsTrigger>
                                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                                </TabsList>

                                <TabsContent value="about" className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>About</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <p className="text-muted-foreground">{worker.bio}</p>
                                            <div>
                                                <h4 className="font-medium mb-2">Specialties</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {worker.specialties.map((specialty) => (
                                                        <Badge key={specialty} variant="secondary">
                                                            {specialty}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">Member Since</h4>
                                                <p className="text-muted-foreground">
                                                    {worker.memberSince}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="services">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Services & Pricing</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Service</TableHead>
                                                        <TableHead>Price Range</TableHead>
                                                        <TableHead>Duration</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {worker.services.map((service) => (
                                                        <TableRow key={service.id}>
                                                            <TableCell className="font-medium">
                                                                {service.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                Rs. {service.priceMin.toLocaleString()} - Rs.{' '}
                                                                {service.priceMax.toLocaleString()}
                                                            </TableCell>
                                                            <TableCell>{service.duration}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                            <p className="text-sm text-muted-foreground mt-4">
                                                Note: Final price depends on complexity and parts required.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="reviews" className="space-y-6">
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="flex flex-col sm:flex-row gap-8">
                                                <div className="text-center">
                                                    <p className="text-5xl font-bold text-foreground">
                                                        {worker.rating}
                                                    </p>
                                                    <RatingDisplay
                                                        rating={worker.rating}
                                                        showNumber={false}
                                                        size="lg"
                                                        className="justify-center mt-2"
                                                    />
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {worker.reviewCount} reviews
                                                    </p>
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    {ratingDistribution.map((item) => (
                                                        <div key={item.stars} className="flex items-center gap-3">
                                                            <span className="text-sm w-12">
                                                                {item.stars} star
                                                            </span>
                                                            <Progress value={item.percentage} className="flex-1 h-2" />
                                                            <span className="text-sm text-muted-foreground w-16">
                                                                {item.percentage}%
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="space-y-4">
                                        {reviews.length > 0 ? (
                                            reviews.map((review) => (
                                                <Card key={review.id}>
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start gap-4">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                                                                {review.customerName.charAt(0)}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center justify-between">
                                                                    <p className="font-medium">{review.customerName}</p>
                                                                    <span className="text-sm text-muted-foreground">
                                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <RatingDisplay
                                                                        rating={review.rating}
                                                                        size="sm"
                                                                        showNumber={false}
                                                                    />
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {review.service}
                                                                    </Badge>
                                                                </div>
                                                                <p className="mt-2 text-muted-foreground">{review.text}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <Card>
                                                <CardContent className="py-8 text-center">
                                                    <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                                                    <p className="text-muted-foreground">No reviews yet</p>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="portfolio">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Portfolio</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {worker.portfolio && worker.portfolio.length > 0 ? (
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {worker.portfolio.map((photo, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative aspect-square rounded-lg overflow-hidden"
                                                        >
                                                            <img
                                                                src={photo || '/placeholder.svg'}
                                                                alt={`Work sample ${index + 1}`}
                                                                className="object-cover w-full h-full hover:scale-105 transition-transform"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="py-8 text-center">
                                                    <p className="text-muted-foreground">
                                                        No portfolio photos available
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Book This Worker</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Price Range</span>
                                            <span className="font-semibold">
                                                Rs. {worker.priceRange.min.toLocaleString()} - Rs.{' '}
                                                {worker.priceRange.max.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Availability</span>
                                            <Badge variant={worker.availableToday ? 'default' : 'secondary'}>
                                                {worker.availableToday ? 'Available Today' : 'Check Schedule'}
                                            </Badge>
                                        </div>
                                        <Button className="w-full" size="lg" asChild>
                                            <Link to={`/book/${worker.id}`}>{t('cta.bookNow')}</Link>
                                        </Button>
                                        <Button variant="outline" className="w-full bg-transparent" asChild>
                                            <a href={`tel:${worker.phone}`}>
                                                <Phone className="mr-2 h-4 w-4" />
                                                Call Worker
                                            </a>
                                        </Button>
                                        <p className="text-xs text-muted-foreground text-center">
                                            Platform fee: Rs. 200-300 per booking
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
