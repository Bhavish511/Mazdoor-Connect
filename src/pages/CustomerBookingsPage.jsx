import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { useAppSelector } from "@/store/hooks";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BookingCard } from "@/components/bookings/booking-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Search } from "lucide-react";

export default function CustomerBookingsPage() {
    const { bookings } = useApp();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center p-8">
                    <Card className="max-w-md w-full">
                        <CardContent className="p-8 text-center space-y-4">
                            <h1 className="text-2xl font-bold">Please Login</h1>
                            <p className="text-muted-foreground">
                                You need to be logged in to view your bookings.
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

    const upcomingBookings = bookings.filter(
        (b) =>
            b.status === "pending" ||
            b.status === "confirmed" ||
            b.status === "in-progress"
    );
    const completedBookings = bookings.filter((b) => b.status === "completed" || b.status === "cancelled");

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">My Bookings</h1>
                        <p className="text-muted-foreground mt-1">
                            Track and manage all your service requests
                        </p>
                    </div>

                    <Tabs defaultValue="upcoming" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                            <TabsTrigger value="history">History ({completedBookings.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming" className="space-y-4">
                            {upcomingBookings.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {upcomingBookings.map((booking) => (
                                        <BookingCard key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="py-16 text-center">
                                        <CalendarDays className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                                        <p className="text-muted-foreground mb-6">No upcoming bookings</p>
                                        <Button asChild>
                                            <Link to="/categories">
                                                <Search className="mr-2 h-4 w-4" />
                                                Find a Worker
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="history" className="space-y-4">
                            {completedBookings.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {completedBookings.map((booking) => (
                                        <BookingCard key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="py-16 text-center font-medium text-muted-foreground">
                                        No booking history found
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
}
