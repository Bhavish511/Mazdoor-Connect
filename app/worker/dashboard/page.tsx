"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/app-context";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  DollarSign,
  Star,
  Calendar,
  Clock,
  ArrowRight,
  MapPin,
  Phone,
  Check,
  X,
  User,
  Settings,
  TrendingUp,
} from "lucide-react";

// Mock worker for demo
const mockWorker = {
  id: "w1",
  name: "Muhammad Ali",
  email: "ali@example.com",
  phone: "+92 300 1234567",
  role: "worker" as const,
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  createdAt: "2024-01-15",
  category: "electrician" as const,
  bio: "15 years experience in residential and commercial electrical work.",
  experience: 15,
  rating: 4.9,
  reviewCount: 127,
  jobsCompleted: 342,
  priceRange: { min: 800, max: 2500 },
  specialties: ["Wiring", "Installation", "Troubleshooting"],
  availableToday: true,
  verified: { cnic: true, police: true, skill: true, backgroundCheck: true },
  portfolio: [],
  services: [
    { id: "s1", name: "Wiring Repair", priceMin: 800, priceMax: 1500, duration: "1-2 hours" },
  ],
  availability: {
    monday: { available: true, startTime: "09:00", endTime: "18:00" },
    tuesday: { available: true, startTime: "09:00", endTime: "18:00" },
    wednesday: { available: true, startTime: "09:00", endTime: "18:00" },
    thursday: { available: true, startTime: "09:00", endTime: "18:00" },
    friday: { available: true, startTime: "09:00", endTime: "17:00" },
    saturday: { available: true, startTime: "10:00", endTime: "16:00" },
    sunday: { available: false },
    emergencyAvailable: true,
  },
  location: "DHA Phase 5, Karachi",
  memberSince: "January 2024",
};

// Mock pending jobs
const pendingJobs = [
  {
    id: "j1",
    customerName: "Asad H.",
    customerPhone: "+92 321 1234567",
    service: "Wiring Repair",
    date: "2026-01-28",
    timeSlot: "10:00 AM - 12:00 PM",
    address: "House 45, Street 12, DHA Phase 6",
    distance: "3.5 km",
    estimatedEarnings: 1300,
    expiresIn: "2h 15m",
  },
  {
    id: "j2",
    customerName: "Fatima K.",
    customerPhone: "+92 333 9876543",
    service: "New Installation",
    date: "2026-01-29",
    timeSlot: "2:00 PM - 4:00 PM",
    address: "Flat 12, Block B, Clifton",
    distance: "5.2 km",
    estimatedEarnings: 2200,
    expiresIn: "5h 30m",
  },
];

// Mock today's schedule
const todaysJobs = [
  {
    id: "t1",
    customerName: "Omar S.",
    customerPhone: "+92 300 5555555",
    service: "Circuit Breaker Repair",
    timeSlot: "11:00 AM - 1:00 PM",
    address: "Office 5, Commercial Area, DHA",
    status: "confirmed",
  },
  {
    id: "t2",
    customerName: "Sara A.",
    customerPhone: "+92 321 7777777",
    service: "Wiring Inspection",
    timeSlot: "3:00 PM - 4:00 PM",
    address: "House 89, Block 7, Gulshan",
    status: "on-the-way",
  },
];

export default function WorkerDashboardPage() {
  const { t } = useApp();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Auto-login mock worker for demo
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "worker") {
      dispatch(loginSuccess(mockWorker));
    }
  }, [isAuthenticated, user, dispatch]);

  const currentWorker = (user?.role === "worker" ? user : mockWorker) as typeof mockWorker;

  // Profile completion percentage
  const profileCompletion = 80;

  // Mock earnings
  const monthlyEarnings = 57000;
  const monthlyJobs = 23;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Welcome, {currentWorker.name.split(" ")[0]}!
              </h1>
              <p className="mt-1 text-muted-foreground">
                Manage your jobs and earnings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                Profile: {profileCompletion}% complete
              </div>
              <Progress value={profileCompletion} className="w-24 h-2" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{currentWorker.rating}</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    Rs. {monthlyEarnings.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{monthlyJobs}</p>
                  <p className="text-sm text-muted-foreground">Jobs This Month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {currentWorker.jobsCompleted}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Jobs</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Pending Job Requests */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Pending Job Requests
                    {pendingJobs.length > 0 && (
                      <Badge variant="destructive">{pendingJobs.length}</Badge>
                    )}
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/worker/jobs">
                      View All
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {pendingJobs.length > 0 ? (
                    <div className="space-y-4">
                      {pendingJobs.map((job) => (
                        <div
                          key={job.id}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{job.service}</h4>
                              <p className="text-sm text-muted-foreground">
                                {job.customerName}
                              </p>
                            </div>
                            <Badge variant="outline">
                              Expires in {job.expiresIn}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {job.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.timeSlot}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.distance}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Est. Earning:{" "}
                              </span>
                              <span className="font-semibold text-green-600">
                                Rs. {job.estimatedEarnings.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                                <X className="mr-1 h-3 w-3" />
                                Decline
                              </Button>
                              <Button size="sm">
                                <Check className="mr-1 h-3 w-3" />
                                Accept
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Briefcase className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No pending job requests
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Make sure your availability is up to date
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  {todaysJobs.length > 0 ? (
                    <div className="space-y-4">
                      {todaysJobs.map((job) => (
                        <div
                          key={job.id}
                          className="flex items-center gap-4 border rounded-lg p-4"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{job.service}</h4>
                              <Badge
                                variant={
                                  job.status === "on-the-way"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {job.status === "on-the-way"
                                  ? "On The Way"
                                  : "Confirmed"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {job.customerName} - {job.timeSlot}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {job.address}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <a href={`tel:${job.customerPhone}`}>
                                <Phone className="mr-1 h-3 w-3" />
                                Call
                              </a>
                            </Button>
                            <Button size="sm">Navigate</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No jobs scheduled for today
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <Link href="/worker/jobs">
                      <Briefcase className="mr-2 h-4 w-4" />
                      View All Jobs
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/worker/profile">
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/worker/earnings">
                      <DollarSign className="mr-2 h-4 w-4" />
                      View Earnings
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/worker/reviews">
                      <Star className="mr-2 h-4 w-4" />
                      View Reviews
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verification Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CNIC Verified</span>
                    <Badge variant={currentWorker.verified.cnic ? "default" : "secondary"}>
                      {currentWorker.verified.cnic ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Police Verification</span>
                    <Badge variant={currentWorker.verified.police ? "default" : "secondary"}>
                      {currentWorker.verified.police ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Skill Test</span>
                    <Badge variant={currentWorker.verified.skill ? "default" : "secondary"}>
                      {currentWorker.verified.skill ? "Passed" : "Not Taken"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* This Month Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Jobs Completed
                    </span>
                    <span className="font-semibold">{monthlyJobs}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Earnings
                    </span>
                    <span className="font-semibold text-green-600">
                      Rs. {monthlyEarnings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Avg. per Job
                    </span>
                    <span className="font-semibold">
                      Rs. {Math.round(monthlyEarnings / monthlyJobs).toLocaleString()}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/worker/earnings">View Details</Link>
                  </Button>
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
