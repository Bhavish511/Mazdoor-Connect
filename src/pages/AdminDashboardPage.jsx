import { Link } from "react-router-dom";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    ShieldCheck,
    AlertTriangle,
    BarChart,
    Search,
    Settings,
    UserCheck
} from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Admin Control Panel</h1>
                            <p className="text-muted-foreground mt-1">
                                Platform management and verification center
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" asChild className="bg-transparent">
                                <Link to="/admin/settings">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link to="/admin/verification-queue">
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Process Verifications
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                    <p className="text-2xl font-bold">12,450</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                                    <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Verified Workers</p>
                                    <p className="text-2xl font-bold">842</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/30">
                                    <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pending Verif.</p>
                                    <p className="text-2xl font-bold">54</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                                    <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Bookings (MTD)</p>
                                    <p className="text-2xl font-bold">3,892</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Recent Platform Activity</CardTitle>
                                    <div className="relative w-48">
                                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            placeholder="Search logs..."
                                            className="w-full bg-background border rounded-md pl-8 py-1 text-sm"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { action: "Worker Verified", target: "Mazhar Ali (Electrician)", time: "2 mins ago" },
                                            { action: "Booking Disputed", target: "Booking #MZ45922", time: "15 mins ago" },
                                            { action: "New Worker Sign-up", target: "Bashir Ahmed", time: "1 hour ago" },
                                            { action: "System Update", target: "Version 1.2.4 deployed", time: "3 hours ago" }
                                        ].map((log, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 border">
                                                <div>
                                                    <p className="font-medium text-sm">{log.action}</p>
                                                    <p className="text-xs text-muted-foreground">{log.target}</p>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{log.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="w-full mt-4 text-primary">
                                        View Audit Logs
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="bg-primary/5 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="text-lg">Quick Access</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-2">
                                    <Button variant="outline" className="justify-start bg-transparent">Manage Workers</Button>
                                    <Button variant="outline" className="justify-start bg-transparent">Manage Customers</Button>
                                    <Button variant="outline" className="justify-start bg-transparent">Platform Fees & Promo</Button>
                                    <Button variant="outline" className="justify-start bg-transparent">Dispute Resolution</Button>
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
