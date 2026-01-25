"use client";

import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import type { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  booking: Booking;
  onView?: () => void;
  onCancel?: () => void;
  onReview?: () => void;
  userRole?: "customer" | "worker";
}

const statusColors: Record<Booking["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  "in-progress": "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  disputed: "bg-orange-100 text-orange-800 border-orange-200",
};

export function BookingCard({
  booking,
  onView,
  onCancel,
  onReview,
  userRole = "customer",
}: BookingCardProps) {
  const { t } = useApp();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const showCancelButton =
    booking.status === "pending" || booking.status === "confirmed";
  const showReviewButton =
    booking.status === "completed" && !booking.rating && userRole === "customer";

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Worker/Customer Image */}
          <div className="relative h-32 w-full sm:h-auto sm:w-32 shrink-0">
            <Image
              src={booking.worker.photo || "/placeholder.svg"}
              alt={booking.worker.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">
                    {booking.worker.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={cn("text-xs", statusColors[booking.status])}
                  >
                    {t(`booking.status.${booking.status}`)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {t(`category.${booking.worker.category}`)} - {booking.service}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onView} asChild>
                    <Link href={`/customer/bookings/${booking.id}`}>
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  {showCancelButton && (
                    <DropdownMenuItem
                      onClick={onCancel}
                      className="text-destructive"
                    >
                      Cancel Booking
                    </DropdownMenuItem>
                  )}
                  {showReviewButton && (
                    <DropdownMenuItem onClick={onReview}>
                      Leave Review
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Details */}
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(booking.date)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {booking.timeSlot}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1 max-w-[150px]">
                  {booking.address}
                </span>
              </div>
            </div>

            {/* Price and Rating */}
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm">
                {booking.finalPrice ? (
                  <span className="font-semibold text-foreground">
                    Rs. {booking.finalPrice.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Est. Rs. {booking.estimatedPrice.min.toLocaleString()}-
                    {booking.estimatedPrice.max.toLocaleString()}
                  </span>
                )}
              </div>
              {booking.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{booking.rating}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/customer/bookings/${booking.id}`}>
                  View Details
                </Link>
              </Button>
              {booking.status === "confirmed" && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`tel:${booking.worker.phone}`}>
                    <Phone className="mr-1 h-3 w-3" />
                    Call Worker
                  </a>
                </Button>
              )}
              {showReviewButton && (
                <Button size="sm" onClick={onReview}>
                  Leave Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
