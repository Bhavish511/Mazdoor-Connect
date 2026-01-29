import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Wallet, Briefcase, TrendingUp } from "lucide-react";

const earningsData = [
    { name: 'Mon', amount: 3200 },
    { name: 'Tue', amount: 1500 },
    { name: 'Wed', amount: 4800 },
    { name: 'Thu', amount: 2100 },
    { name: 'Fri', amount: 5500 },
    { name: 'Sat', amount: 9000 },
    { name: 'Sun', amount: 6000 },
];

const jobData = [
    { name: 'Jan', count: 12 },
    { name: 'Feb', count: 18 },
    { name: 'Mar', count: 15 },
    { name: 'Apr', count: 22 },
    { name: 'May', count: 30 },
];

export default function WorkerAnalyticsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">Performance Analytics</h1>

                    <div className="grid gap-6 mb-8 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Earnings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-2xl font-bold">
                                    <span>Rs. 45,200</span>
                                    <Wallet className="h-6 w-6 text-green-500" />
                                </div>
                                <p className="text-xs text-green-500 mt-1 font-medium">+12% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Jobs Completed</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-2xl font-bold">
                                    <span>124</span>
                                    <Briefcase className="h-6 w-6 text-blue-500" />
                                </div>
                                <p className="text-xs text-blue-500 mt-1 font-medium">Top 5% in your area</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Profile Views</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-2xl font-bold">
                                    <span>1,432</span>
                                    <TrendingUp className="h-6 w-6 text-purple-500" />
                                </div>
                                <p className="text-xs text-purple-500 mt-1 font-medium">+40% increase in leads</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Weekly Earnings Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Weekly Earnings</CardTitle>
                                <CardDescription>Earnings distribution over the past 7 days</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px] w-full pt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={earningsData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        />
                                        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Job Growth Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Jobs</CardTitle>
                                <CardDescription>Service request growth over the past 5 months</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px] w-full pt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={jobData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
