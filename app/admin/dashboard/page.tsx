"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  DollarSign,
  Star,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  UserCheck,
} from "lucide-react";

// Mock admin
const mockAdmin = {
  id: "a1",
  name: "Admin User",
  email: "admin@mazdoorconnect.pk",
  phone: "+92 300 0000000",
  role: "admin" as const,
  createdAt: "2024-01-01",
  permissions: ["all"],
};

// Mock stats
const platformStats = {
  totalCustomers: 1247,
  totalWorkers: 153,
  activeWorkers: 142,
  totalBookings: 2134,
  monthlyBookings: 2134,
  lastMonthBookings: 1899,
  monthlyRevenue: 534000,
  lastMonthRevenue: 475000,
  avgRating: 4.7,
  pendingVerifications: 7,
  unresolvedDisputes: 2,
  lowRatedWorkers: 3,
};

// Recent bookings
const recentBookings = [
  {
    id: "MZ12345",
    customer: "Asad H.",
    worker: "Muhammad Ali",
    service: "Wiring Repair",
    status: "confirmed",
    amount: 1500,
  },
  {
    id: "MZ12344",
    customer: "Fatima K.",
    worker: "Ahmed Khan",
    service: "Pipe Repair",
    status: "in-progress",
    amount: 1200,
  },
  {
    id: "MZ12343",
    customer: "Omar S.",
    worker: "Hassan Raza",
    service: "AC Gas Refill",
    status: "completed",
    amount: 3000,
  },
  {
    id: "MZ12342",
    customer: "Sara A.",
    worker: "Imran Sheikh",
    service: "Furniture Repair",
    status: "pending",
    amount: 3500,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Auto-login mock admin for demo
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      dispatch(loginSuccess(mockAdmin));
    }
  }, [isAuthenticated, user, dispatch]);

  const growthPercentage = (
    ((platformStats.monthlyBookings - platformStats.lastMonthBookings) /
      platformStats.lastMonthBookings) *
    100
  ).toFixed(1);

  const revenueGrowth = (
    ((platformStats.monthlyRevenue - platformStats.lastMonthRevenue) /
      platformStats.lastMonthRevenue) *
    100
  ).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Platform overview and management
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold mt-1">
                      {(platformStats.totalCustomers + platformStats.totalWorkers).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {platformStats.totalCustomers} customers, {platformStats.totalWorkers} workers
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Bookings
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {platformStats.monthlyBookings.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{growthPercentage}% from last month
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold mt-1">
                      Rs. {(platformStats.monthlyRevenue / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{revenueGrowth}% from last month
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                    <p className="text-2xl font-bold mt-1">
                      {platformStats.avgRating}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Platform average
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Actions */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                  <UserCheck className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-yellow-800">
                    Pending Verifications
                  </p>
                  <p className="text-sm text-yellow-700">
                    {platformStats.pendingVerifications} workers awaiting
                  </p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/verification">Review</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-red-800">Unresolved Disputes</p>
                  <p className="text-sm text-red-700">
                    {platformStats.unresolvedDisputes} need attention
                  </p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/bookings?status=disputed">Review</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-orange-800">Low-Rated Workers</p>
                  <p className="text-sm text-orange-700">
                    {platformStats.lowRatedWorkers} below 4.0 rating
                  </p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/workers?filter=low-rated">Review</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Bookings</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/bookings">
                      View All
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">#{booking.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.customer} → {booking.worker}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={statusColors[booking.status]}>
                            {booking.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            Rs. {booking.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <Link href="/admin/verification">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Verify Workers
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/admin/workers">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Workers
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/admin/customers">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Customers
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/admin/bookings">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Manage Bookings
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/admin/analytics">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Analytics
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Platform Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Platform Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Active Workers
                    </span>
                    <span className="font-semibold">
                      {platformStats.activeWorkers}/{platformStats.totalWorkers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Today's Bookings
                    </span>
                    <span className="font-semibold">87</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Completion Rate
                    </span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Avg. Response Time
                    </span>
                    <span className="font-semibold">12 min</span>
                  </div>
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
