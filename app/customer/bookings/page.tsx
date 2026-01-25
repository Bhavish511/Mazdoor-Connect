"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookingCard } from "@/components/bookings/booking-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Search } from "lucide-react";
import type { BookingStatus } from "@/types";

export default function CustomerBookingsPage() {
  const { t, bookings } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<BookingStatus | "all">("all");

  const filteredBookings = useMemo(() => {
    let filtered = [...bookings];

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter((b) => b.status === activeTab);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.id.toLowerCase().includes(query) ||
          b.worker.name.toLowerCase().includes(query) ||
          b.service.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [bookings, activeTab, searchQuery]);

  const getTabCount = (status: BookingStatus | "all") => {
    if (status === "all") return bookings.length;
    return bookings.filter((b) => b.status === status).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              {t("nav.bookings")}
            </h1>
            <p className="mt-1 text-muted-foreground">
              View and manage all your bookings
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by booking ID, worker name, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as BookingStatus | "all")}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                All ({getTabCount("all")})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({getTabCount("pending")})
              </TabsTrigger>
              <TabsTrigger value="confirmed">
                Confirmed ({getTabCount("confirmed")})
              </TabsTrigger>
              <TabsTrigger value="in-progress">
                In Progress ({getTabCount("in-progress")})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({getTabCount("completed")})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({getTabCount("cancelled")})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredBookings.length > 0 ? (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-16 text-center">
                    <CalendarDays className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      No bookings found
                    </p>
                    <p className="text-muted-foreground mb-4">
                      {activeTab === "all"
                        ? "You haven't made any bookings yet."
                        : `You don't have any ${activeTab} bookings.`}
                    </p>
                    <Button asChild>
                      <Link href="/categories">
                        <Search className="mr-2 h-4 w-4" />
                        Find a Worker
                      </Link>
                    </Button>
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
