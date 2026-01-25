"use client";

import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { mockWorkers, mockBookings, platformStats } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarDays,
  DollarSign,
  TrendingUp,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  "in-progress": "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalUsers: platformStats.happyCustomers + platformStats.verifiedWorkers,
    totalWorkers: platformStats.verifiedWorkers,
    totalBookings: mockBookings.length,
    revenue: 125000,
    pendingVerifications: mockWorkers.filter(
      (w) => !w.verified.police || !w.verified.skill
    ).length,
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            <span className="text-lg font-bold">Admin Panel</span>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "overview"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Overview
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "users"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-3 h-5 w-5" />
              Users
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "workers"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => setActiveTab("workers")}
            >
              <Briefcase className="mr-3 h-5 w-5" />
              Workers
              {stats.pendingVerifications > 0 && (
                <Badge className="ml-auto bg-destructive text-destructive-foreground">
                  {stats.pendingVerifications}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "bookings"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              <CalendarDays className="mr-3 h-5 w-5" />
              Bookings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <DollarSign className="mr-3 h-5 w-5" />
              Finance
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Button>
          </nav>

          <div className="border-t border-sidebar-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">
                  Dashboard Overview
                </h1>
                <p className="text-muted-foreground">
                  Monitor platform performance and key metrics
                </p>
              </div>

              {/* Stats Cards */}
              <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Users
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stats.totalUsers.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Verified Workers
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stats.totalWorkers}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                      <CalendarDays className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Bookings
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {platformStats.jobsCompleted.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold text-foreground">
                        Rs. {stats.revenue.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.slice(0, 5).map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={booking.worker.photo || "/placeholder.svg"}
                            alt={booking.worker.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">
                              {booking.service}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.customer.name} → {booking.worker.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={statusColors[booking.status]}>
                            {booking.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Workers Tab */}
          {activeTab === "workers" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">
                  Worker Management
                </h1>
                <p className="text-muted-foreground">
                  Manage and verify platform workers
                </p>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Workers ({mockWorkers.length})</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search workers..." className="pl-9" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockWorkers.map((worker) => (
                      <div
                        key={worker.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={worker.avatar || "/placeholder.svg"}
                            alt={worker.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">
                              {worker.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {worker.category} - {worker.location}
                            </p>
                            <div className="mt-1 flex gap-2">
                              {worker.verified.cnic ? (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-700"
                                >
                                  CNIC
                                </Badge>
                              ) : (
                                <Badge
                                  variant="secondary"
                                  className="bg-red-100 text-red-700"
                                >
                                  CNIC Pending
                                </Badge>
                              )}
                              {worker.verified.police ? (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-700"
                                >
                                  Police
                                </Badge>
                              ) : (
                                <Badge
                                  variant="secondary"
                                  className="bg-red-100 text-red-700"
                                >
                                  Police Pending
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium text-foreground">
                              {worker.rating} / 5.0
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {worker.jobsCompleted} jobs
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                Verify Worker
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Suspend Worker
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">
                  Booking Management
                </h1>
                <p className="text-muted-foreground">
                  Monitor and manage all platform bookings
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">
                              {booking.service}
                            </p>
                            <Badge className={statusColors[booking.status]}>
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {booking.customer.name} → {booking.worker.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.date).toLocaleDateString()} -{" "}
                            {booking.timeSlot}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">
                            Rs.{" "}
                            {booking.finalPrice?.toLocaleString() ||
                              `${booking.estimatedPrice.min.toLocaleString()} - ${booking.estimatedPrice.max.toLocaleString()}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Platform Fee: Rs.{" "}
                            {booking.platformFee.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">
                  User Management
                </h1>
                <p className="text-muted-foreground">
                  Manage platform customers
                </p>
              </div>

              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    User management features coming soon
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
