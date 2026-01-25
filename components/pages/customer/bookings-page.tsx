"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  Star,
  MessageCircle,
} from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  "in-progress": "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function CustomerBookingsPage() {
  const { bookings, t } = useApp();
  const [activeTab, setActiveTab] = useState("all");

  const customerBookings = bookings.filter((b) => b.customerId === "c1");

  const filteredBookings =
    activeTab === "all"
      ? customerBookings
      : activeTab === "active"
        ? customerBookings.filter((b) =>
            ["pending", "confirmed", "in-progress"].includes(b.status)
          )
        : customerBookings.filter((b) => b.status === activeTab);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              My Bookings
            </h1>
            <p className="mt-1 text-muted-foreground">
              Track and manage your service bookings
            </p>
          </div>
          <Button asChild>
            <Link to="/categories">New Booking</Link>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              All ({customerBookings.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active (
              {
                customerBookings.filter((b) =>
                  ["pending", "confirmed", "in-progress"].includes(b.status)
                ).length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed (
              {customerBookings.filter((b) => b.status === "completed").length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled (
              {customerBookings.filter((b) => b.status === "cancelled").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CalendarDays className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No bookings found</p>
                  <Button asChild className="mt-4">
                    <Link to="/categories">Find a Worker</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-6 md:flex-row md:items-start">
                        <img
                          src={booking.worker.photo || "/placeholder.svg"}
                          alt={booking.worker.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {booking.service}
                              </h3>
                              <p className="text-muted-foreground">
                                {booking.worker.name} -{" "}
                                {t(`category.${booking.worker.category}`)}
                              </p>
                            </div>
                            <Badge className={statusColors[booking.status]}>
                              {t(`booking.status.${booking.status}`)}
                            </Badge>
                          </div>

                          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <CalendarDays className="h-4 w-4" />
                              {new Date(booking.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {booking.timeSlot}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
                              <MapPin className="h-4 w-4" />
                              {booking.address}
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-4 border-t pt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Estimated Price
                              </p>
                              <p className="font-semibold text-foreground">
                                Rs.{" "}
                                {booking.estimatedPrice.min.toLocaleString()} -{" "}
                                {booking.estimatedPrice.max.toLocaleString()}
                              </p>
                            </div>
                            {booking.finalPrice && (
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Final Price
                                </p>
                                <p className="font-semibold text-foreground">
                                  Rs. {booking.finalPrice.toLocaleString()}
                                </p>
                              </div>
                            )}
                            <div className="ml-auto flex gap-2">
                              {["confirmed", "in-progress"].includes(
                                booking.status
                              ) && (
                                <Button variant="outline" size="sm">
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call Worker
                                </Button>
                              )}
                              {booking.status === "completed" &&
                                !booking.rating && (
                                  <Button size="sm">
                                    <Star className="mr-2 h-4 w-4" />
                                    Rate & Review
                                  </Button>
                                )}
                              {booking.status === "completed" &&
                                booking.rating && (
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < (booking.rating || 0)
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-muted-foreground/30"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
