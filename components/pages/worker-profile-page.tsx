"use client";

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { useAppSelector } from "@/store/hooks";
import { mockReviews } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Shield,
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  Calendar,
  Heart,
  Share2,
  ArrowLeft,
  Zap,
  Droplets,
  Wind,
  Hammer,
  Paintbrush,
  Briefcase,
  AlertTriangle,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  electrician: Zap,
  plumber: Droplets,
  "ac-mechanic": Wind,
  carpenter: Hammer,
  painter: Paintbrush,
};

export default function WorkerProfilePage() {
  const { workerId } = useParams<{ workerId: string }>();
  const navigate = useNavigate();
  const { t, getWorkerById, isFavorite, toggleFavorite } = useApp();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("services");

  const worker = getWorkerById(workerId || "");
  const workerReviews = mockReviews.filter((r) => r.workerId === workerId);

  if (!worker) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Worker not found</h1>
        <Button asChild className="mt-4">
          <Link to="/categories">Browse Workers</Link>
        </Button>
      </div>
    );
  }

  const CategoryIcon = categoryIcons[worker.category] || Briefcase;
  const favorite = isFavorite(worker.id);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/book/${worker.id}`);
    } else {
      navigate(`/book/${worker.id}`);
    }
  };

  const days = [
    { key: "monday", label: "Mon" },
    { key: "tuesday", label: "Tue" },
    { key: "wednesday", label: "Wed" },
    { key: "thursday", label: "Thu" },
    { key: "friday", label: "Fri" },
    { key: "saturday", label: "Sat" },
    { key: "sunday", label: "Sun" },
  ] as const;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <Link
            to={`/categories/${worker.category}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {t(`category.${worker.category}`)}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="relative">
                    <img
                      src={worker.avatar || "/placeholder.svg"}
                      alt={worker.name}
                      className="h-32 w-32 rounded-xl object-cover"
                    />
                    {worker.availableToday && (
                      <div className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Available
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">
                          {worker.name}
                        </h1>
                        <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                          <CategoryIcon className="h-4 w-4" />
                          <span>{t(`category.${worker.category}`)}</span>
                          <span className="text-muted-foreground/50">|</span>
                          <span>{worker.experience} years exp.</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleFavorite(worker.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorite
                                ? "fill-red-500 text-red-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{worker.rating}</span>
                        <span className="text-muted-foreground">
                          ({worker.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        {worker.jobsCompleted} jobs completed
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {worker.location}
                      </div>
                    </div>

                    {/* Verification Badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {worker.verified.cnic && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          CNIC Verified
                        </Badge>
                      )}
                      {worker.verified.police && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700"
                        >
                          <Shield className="mr-1 h-3 w-3" />
                          Police Verified
                        </Badge>
                      )}
                      {worker.verified.skill && (
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-700"
                        >
                          <Star className="mr-1 h-3 w-3" />
                          Skill Tested
                        </Badge>
                      )}
                      {worker.availability.emergencyAvailable && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-700"
                        >
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Emergency Available
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6">
                  <h3 className="font-semibold text-foreground">About</h3>
                  <p className="mt-2 text-muted-foreground">{worker.bio}</p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({workerReviews.length})
                </TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="mt-6">
                <div className="grid gap-4">
                  {worker.services.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {service.name}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {service.duration}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">
                            Rs. {service.priceMin.toLocaleString()} -{" "}
                            {service.priceMax.toLocaleString()}
                          </div>
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={handleBookNow}
                          >
                            Book This
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                {workerReviews.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No reviews yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {workerReviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-foreground">
                                {review.customerName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {review.service}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-muted-foreground/30"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-3 text-muted-foreground">
                            {review.text}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                {worker.portfolio.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">
                        No portfolio items yet
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {worker.portfolio.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Portfolio ${index + 1}`}
                        className="aspect-video rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Book {worker.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price Range</p>
                  <p className="text-xl font-bold text-foreground">
                    Rs. {worker.priceRange.min.toLocaleString()} -{" "}
                    {worker.priceRange.max.toLocaleString()}
                  </p>
                </div>

                <Button className="w-full" size="lg" onClick={handleBookNow}>
                  {t("cta.bookNow")}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  Contact after booking
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {days.map(({ key, label }) => {
                    const dayAvail = worker.availability[key];
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{label}</span>
                        {dayAvail.available ? (
                          <span className="text-foreground">
                            {dayAvail.startTime} - {dayAvail.endTime}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/50">
                            Closed
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {worker.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 md:hidden">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">From</p>
            <p className="font-bold text-foreground">
              Rs. {worker.priceRange.min.toLocaleString()}
            </p>
          </div>
          <Button className="flex-1" size="lg" onClick={handleBookNow}>
            {t("cta.bookNow")}
          </Button>
        </div>
      </div>
    </div>
  );
}
