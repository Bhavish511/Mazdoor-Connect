"use client";

import React, { useState } from "react";
import { useApp } from "@/context/app-context";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { mockBookings } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  LayoutDashboard,
  CalendarDays,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  "in-progress": "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function WorkerDashboardPage() {
  const { t } = useApp();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [availableToday, setAvailableToday] = useState(true);

  // Mock worker data
  const workerBookings = mockBookings.filter((b) => b.workerId === "w1");
  const pendingBookings = workerBookings.filter((b) => b.status === "pending");
  const todayBookings = workerBookings.filter(
    (b) => b.date === new Date().toISOString().split("T")[0]
  );

  const stats = {
    totalEarnings: 45000,
    thisMonth: 12500,
    completedJobs: 15,
    rating: 4.9,
    reviewCount: 127,
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
            <span className="text-lg font-bold">Worker Portal</span>
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
              className="w-full justify-start bg-sidebar-accent text-sidebar-accent-foreground"
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CalendarDays className="mr-3 h-5 w-5" />
              Bookings
              {pendingBookings.length > 0 && (
                <Badge className="ml-auto bg-primary text-primary-foreground">
                  {pendingBookings.length}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <DollarSign className="mr-3 h-5 w-5" />
              Earnings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Star className="mr-3 h-5 w-5" />
              Reviews
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
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Available Today
              </span>
              <Switch
                checked={availableToday}
                onCheckedChange={setAvailableToday}
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user?.name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground">
              {"Here's what's happening with your business today."}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    This Month Earnings
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    Rs. {stats.thisMonth.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Jobs Completed
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.completedJobs}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Rating</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.rating}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      ({stats.reviewCount})
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold text-foreground">
                    Rs. {stats.totalEarnings.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Requests */}
          {pendingBookings.length > 0 && (
            <Card className="mb-8 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Bell className="h-5 w-5" />
                  New Booking Requests ({pendingBookings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col gap-4 rounded-lg border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-foreground">
                          {booking.service}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.customer.name} - {booking.customer.phone}
                        </p>
                        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {booking.timeSlot}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <XCircle className="mr-2 h-4 w-4" />
                          Decline
                        </Button>
                        <Button size="sm">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {workerBookings.filter((b) =>
                ["confirmed", "in-progress"].includes(b.status)
              ).length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  No upcoming bookings
                </p>
              ) : (
                <div className="space-y-4">
                  {workerBookings
                    .filter((b) =>
                      ["confirmed", "in-progress"].includes(b.status)
                    )
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">
                              {booking.service}
                            </p>
                            <Badge className={statusColors[booking.status]}>
                              {t(`booking.status.${booking.status}`)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {booking.customer.name}
                          </p>
                          <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {new Date(booking.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {booking.timeSlot}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            Rs.{" "}
                            {booking.estimatedPrice.min.toLocaleString()} -{" "}
                            {booking.estimatedPrice.max.toLocaleString()}
                          </p>
                          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
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
