import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookingCard } from "@/components/bookings/booking-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CalendarDays,
    Heart,
    User,
    Search,
    ArrowRight,
    Clock,
    HelpCircle,
    Star,
} from "lucide-react";

// Mock customer for demo
const mockCustomer = {
    id: "c1",
    name: "Asad Hussain",
    email: "asad@example.com",
    phone: "+92 321 1234567",
    role: "customer" as const,
    createdAt: "2026-01-01",
    address: "House 45, Street 12, DHA Phase 6, Karachi",
    favoriteWorkers: ["w1", "w3"],
};

export default function CustomerDashboardPage() {
    const { t, bookings, favoriteWorkers, getWorkerById } = useApp();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    // Auto-login mock customer for demo if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(loginSuccess(mockCustomer));
        }
    }, [isAuthenticated, dispatch]);

    const currentUser = user || mockCustomer;

    const upcomingBookings = bookings.filter(
        (b) =>
            b.status === "pending" ||
            b.status === "confirmed" ||
            b.status === "in-progress"
    );
    const completedBookings = bookings.filter((b) => b.status === "completed");

    const favoriteWorkersList = favoriteWorkers
        .map((id) => getWorkerById(id))
        .filter(Boolean);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                            Welcome back, {currentUser.name.split(" ")[0]}!
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Manage your bookings and find new workers
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <CalendarDays className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{bookings.length}</p>
                                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                                    <p className="text-sm text-muted-foreground">Upcoming</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                    <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{completedBookings.length}</p>
                                    <p className="text-sm text-muted-foreground">Completed</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30">
                                    <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{favoriteWorkers.length}</p>
                                    <p className="text-sm text-muted-foreground">Favorites</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Upcoming Bookings */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Upcoming Bookings</CardTitle>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/customer/bookings">
                                            View All
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {upcomingBookings.length > 0 ? (
                                        <div className="space-y-4">
                                            {upcomingBookings.slice(0, 3).map((booking) => (
                                                <BookingCard key={booking.id} booking={booking} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <CalendarDays className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                                            <p className="text-muted-foreground mb-4">
                                                No upcoming bookings
                                            </p>
                                            <Button asChild>
                                                <Link to="/categories">
                                                    <Search className="mr-2 h-4 w-4" />
                                                    Find a Worker
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Recent Bookings */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Recent Bookings</CardTitle>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/customer/bookings">
                                            View All
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {completedBookings.length > 0 ? (
                                        <div className="space-y-4">
                                            {completedBookings.slice(0, 2).map((booking) => (
                                                <BookingCard key={booking.id} booking={booking} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <p className="text-muted-foreground">
                                                No completed bookings yet
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full justify-start" asChild>
                                        <Link to="/categories">
                                            <Search className="mr-2 h-4 w-4" />
                                            {t("cta.findWorker")}
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                                        <Link to="/customer/profile">
                                            <User className="mr-2 h-4 w-4" />
                                            My Profile
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                                        <Link to="/contact">
                                            <HelpCircle className="mr-2 h-4 w-4" />
                                            Help & Support
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Favorite Workers */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">Favorite Workers</CardTitle>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/customer/favorites">
                                            View All
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {favoriteWorkersList.length > 0 ? (
                                        <div className="space-y-3">
                                            {favoriteWorkersList.slice(0, 3).map((worker) =>
                                                worker ? (
                                                    <Link
                                                        key={worker.id}
                                                        to={`/workers/${worker.id}`}
                                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                                                    >
                                                        <img
                                                            src={worker.avatar || "/placeholder.svg"}
                                                            alt={worker.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-sm truncate">
                                                                {worker.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground capitalize">
                                                                {t(`category.${worker.category}`)}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm">
                                                            <Star className="h-3 w-3 fill-accent text-accent" />
                                                            {worker.rating}
                                                        </div>
                                                    </Link>
                                                ) : null
                                            )}
                                        </div>
                                    ) : (
                                        <div className="py-4 text-center">
                                            <Heart className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground">
                                                No favorite workers yet
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
