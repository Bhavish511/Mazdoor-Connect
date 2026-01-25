import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { useAppSelector } from "@/store/hooks";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookingCard } from "@/components/bookings/booking-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart3,
    CalendarCheck,
    Clock,
    Settings,
    User,
    Wallet,
    Star
} from "lucide-react";

export default function WorkerDashboardPage() {
    const { bookings } = useApp();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    if (!isAuthenticated || user?.role !== 'worker') {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center p-8">
                    <Card className="max-w-md w-full">
                        <CardContent className="p-8 text-center space-y-4">
                            <h1 className="text-2xl font-bold">Unauthorized</h1>
                            <p className="text-muted-foreground">
                                Worker access only. Please login with a worker account.
                            </p>
                            <Button asChild className="w-full">
                                <Link to="/login">Login</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    const workerBookings = bookings.filter(b => b.workerId === user.id);
    const pendingRequests = workerBookings.filter(b => b.status === 'pending');
    const activeJobs = workerBookings.filter(b => b.status === 'confirmed' || b.status === 'in-progress');

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Worker Dashboard</h1>
                            <p className="text-muted-foreground mt-1">
                                Manage your profile, leads, and earnings
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" asChild className="bg-transparent">
                                <Link to="/worker/profile">
                                    <User className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="bg-transparent">
                                <Link to="/worker/settings">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                                    <CalendarCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">New Leads</p>
                                    <p className="text-2xl font-bold">{pendingRequests.length}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                                    <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                                    <p className="text-2xl font-bold">{activeJobs.length}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                                    <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Earnings</p>
                                    <p className="text-2xl font-bold">Rs. 45,200</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/30">
                                    <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Rating</p>
                                    <p className="text-2xl font-bold">4.8</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Job Requests</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {workerBookings.length > 0 ? (
                                        workerBookings.slice(0, 5).map(booking => (
                                            <BookingCard key={booking.id} booking={booking} userRole="worker" />
                                        ))
                                    ) : (
                                        <div className="py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                                            No jobs assigned yet.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Performance</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Completion Rate</span>
                                        <span className="font-semibold">96%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">On-time Arrival</span>
                                        <span className="font-semibold">92%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Total Jobs</span>
                                        <span className="font-semibold">124</span>
                                    </div>
                                    <Button className="w-full mt-2 bg-transparent" variant="outline" asChild>
                                        <Link to="/worker/analytics">
                                            <BarChart3 className="mr-2 h-4 w-4" />
                                            View Full Analytics
                                        </Link>
                                    </Button>
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
