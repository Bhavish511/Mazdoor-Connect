"use client";

import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  ArrowRight,
  Search,
  History,
} from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  "in-progress": "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function CustomerDashboardPage() {
  const { bookings, t } = useApp();
  const { user } = useAppSelector((state) => state.auth);

  const customerBookings = bookings.filter((b) => b.customerId === "c1");
  const activeBookings = customerBookings.filter((b) =>
    ["pending", "confirmed", "in-progress"].includes(b.status)
  );
  const completedBookings = customerBookings.filter(
    (b) => b.status === "completed"
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Welcome back, {user?.name.split(" ")[0]}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your bookings and find workers
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="group cursor-pointer transition-all hover:border-primary">
            <Link to="/categories">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Find Workers</p>
                  <p className="text-sm text-muted-foreground">
                    Browse categories
                  </p>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="group cursor-pointer transition-all hover:border-primary">
            <Link to="/customer/bookings">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">My Bookings</p>
                  <p className="text-sm text-muted-foreground">
                    {activeBookings.length} active
                  </p>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="group cursor-pointer transition-all hover:border-primary">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Completed</p>
                <p className="text-sm text-muted-foreground">
                  {completedBookings.length} jobs done
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer transition-all hover:border-primary">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Reviews Given</p>
                <p className="text-sm text-muted-foreground">
                  {completedBookings.filter((b) => b.rating).length} reviews
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Bookings */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Active Bookings
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/customer/bookings">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {activeBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CalendarDays className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No active bookings</p>
                <Button asChild className="mt-4">
                  <Link to="/categories">Find a Worker</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {activeBookings.slice(0, 4).map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={booking.worker.photo || "/placeholder.svg"}
                        alt={booking.worker.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-foreground">
                              {booking.service}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {booking.worker.name}
                            </p>
                          </div>
                          <Badge className={statusColors[booking.status]}>
                            {t(`booking.status.${booking.status}`)}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Recent Activity
            </h2>
          </div>

          <Card>
            <CardContent className="p-0">
              {customerBookings.slice(0, 5).map((booking, index) => (
                <div
                  key={booking.id}
                  className={`flex items-center gap-4 p-4 ${
                    index !== customerBookings.slice(0, 5).length - 1
                      ? "border-b"
                      : ""
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : booking.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {booking.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : booking.status === "cancelled" ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {booking.service} with {booking.worker.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.timeline[booking.timeline.length - 1]?.event}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
