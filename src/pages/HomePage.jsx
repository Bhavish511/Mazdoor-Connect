import { Link } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { CategoryCard } from '@/components/categories/category-card';
import { WorkerCard } from '@/components/workers/worker-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WORKER_CATEGORIES } from '@/lib/constants';
import { platformStats } from '@/lib/mock-data';
import {
    Search,
    Shield,
    CheckCircle2,
    BadgeCheck,
    Wallet,
    ArrowRight,
    Star,
    Users,
    Briefcase,
    Quote,
} from 'lucide-react';

export default function HomePage() {
    const { t, getFeaturedWorkers } = useApp();
    const featuredWorkers = getFeaturedWorkers();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
                    <div className="container mx-auto px-4 py-16 md:py-24">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                                    <Shield className="h-4 w-4" />
                                    100% Verified Workers
                                </div>
                                <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                                    {t("app.taglineUrdu")}
                                    <span className="block text-primary mt-2">{t("app.tagline")}</span>
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-lg">
                                    {t("hero.subheadline")}
                                </p>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <Button size="lg" asChild>
                                        <Link to="/categories">
                                            {t("cta.findWorker")}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link to="/how-it-works">{t("nav.howItWorks")}</Link>
                                    </Button>
                                </div>
                                {/* Trust Badges */}
                                <div className="flex flex-wrap gap-3 pt-4">
                                    <Badge variant="secondary" className="gap-1.5 py-1.5">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                                        {t("trust.cnicVerified")}
                                    </Badge>
                                    <Badge variant="secondary" className="gap-1.5 py-1.5">
                                        <Shield className="h-3.5 w-3.5 text-primary" />
                                        {t("trust.policeVerified")}
                                    </Badge>
                                    <Badge variant="secondary" className="gap-1.5 py-1.5">
                                        <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                                        {t("trust.skillTested")}
                                    </Badge>
                                    <Badge variant="secondary" className="gap-1.5 py-1.5">
                                        <Wallet className="h-3.5 w-3.5 text-primary" />
                                        {t("trust.damageProtection")}
                                    </Badge>
                                </div>
                            </div>
                            <div className="relative hidden lg:block">
                                <div className="relative aspect-square max-w-lg mx-auto">
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
                                    <img
                                        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=600&fit=crop"
                                        alt="Professional worker"
                                        className="relative rounded-3xl object-cover shadow-2xl w-full h-full"
                                    />
                                    {/* Floating Stats Card */}
                                    <Card className="absolute -bottom-6 -left-6 shadow-lg">
                                        <CardContent className="flex items-center gap-3 p-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Star className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">{platformStats.avgRating}</p>
                                                <p className="text-sm text-muted-foreground">Average Rating</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    {/* Floating Workers Card */}
                                    <Card className="absolute -right-6 top-1/4 shadow-lg">
                                        <CardContent className="flex items-center gap-3 p-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                                                <Users className="h-6 w-6 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">{platformStats.verifiedWorkers}+</p>
                                                <p className="text-sm text-muted-foreground">Verified Workers</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="border-y border-border bg-muted/30">
                    <div className="container mx-auto px-4 py-12">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-primary md:text-4xl">
                                    {platformStats.happyCustomers}+
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {t("stats.happyCustomers")}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-primary md:text-4xl">
                                    {platformStats.verifiedWorkers}+
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {t("stats.verifiedWorkers")}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-primary md:text-4xl">
                                    {platformStats.avgRating}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {t("stats.avgRating")}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-primary md:text-4xl">
                                    {platformStats.jobsCompleted.toLocaleString()}+
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {t("stats.jobsCompleted")}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                                {t("nav.categories")}
                            </h2>
                            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                                Find skilled professionals for all your home service needs
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                            {WORKER_CATEGORIES.map((category) => (
                                <CategoryCard key={category.id} category={category.id} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="bg-muted/30 py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                                {t("nav.howItWorks")}
                            </h2>
                            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                                Get your work done in three simple steps
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    step: "01",
                                    icon: <Search className="h-6 w-6" />,
                                    title: t("howItWorks.step1.title"),
                                    description: t("howItWorks.step1.desc"),
                                },
                                {
                                    step: "02",
                                    icon: <Briefcase className="h-6 w-6" />,
                                    title: t("howItWorks.step2.title"),
                                    description: t("howItWorks.step2.desc"),
                                },
                                {
                                    step: "03",
                                    icon: <CheckCircle2 className="h-6 w-6" />,
                                    title: t("howItWorks.step3.title"),
                                    description: t("howItWorks.step3.desc"),
                                },
                            ].map((item, index) => (
                                <Card key={item.step} className="relative overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold text-primary mb-1">
                                                    STEP {item.step}
                                                </div>
                                                <h3 className="text-lg font-semibold text-foreground">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        {index < 2 && (
                                            <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block">
                                                <ArrowRight className="h-8 w-8 text-border" />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Workers Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                                    Featured Workers
                                </h2>
                                <p className="mt-3 text-lg text-muted-foreground">
                                    Our top-rated professionals
                                </p>
                            </div>
                            <Button variant="outline" asChild>
                                <Link to="/categories">
                                    {t("cta.viewAll")}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredWorkers.slice(0, 6).map((worker) => (
                                <WorkerCard key={worker.id} worker={worker} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-muted/30 py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                                What Our Customers Say
                            </h2>
                            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                                Real experiences from satisfied customers
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {[
                                {
                                    name: "Asad Hussain",
                                    service: "AC Repair",
                                    rating: 5,
                                    text: "Excellent service! The AC mechanic was professional and fixed my AC within an hour. Highly recommend Mazdoor Connect.",
                                },
                                {
                                    name: "Fatima Khan",
                                    service: "Electrical Work",
                                    rating: 5,
                                    text: "Very reliable platform. The electrician was on time, did great work, and the pricing was transparent. Will use again!",
                                },
                                {
                                    name: "Omar Sheikh",
                                    service: "Plumbing",
                                    rating: 4,
                                    text: "Good experience overall. The plumber fixed a major leak quickly. The verification process gives peace of mind.",
                                },
                            ].map((testimonial, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <Quote className="h-8 w-8 text-primary/20 mb-4" />
                                        <p className="text-muted-foreground mb-4">
                                            "{testimonial.text}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">
                                                    {testimonial.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {testimonial.service}
                                                </p>
                                            </div>
                                            <div className="ml-auto flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-accent text-accent" />
                                                <span className="text-sm font-medium">
                                                    {testimonial.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <Card className="bg-primary text-primary-foreground overflow-hidden">
                            <CardContent className="p-8 md:p-12">
                                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                                    <div>
                                        <h2 className="text-3xl font-bold md:text-4xl">
                                            Ready to Get Started?
                                        </h2>
                                        <p className="mt-4 text-primary-foreground/80 max-w-md">
                                            Find verified workers for your home services today. Quick,
                                            reliable, and affordable.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
                                        <Button
                                            size="lg"
                                            variant="secondary"
                                            asChild
                                        >
                                            <Link to="/categories">
                                                {t("cta.findWorker")}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                                            asChild
                                        >
                                            <Link to="/signup">Join as Worker</Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
