"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/app-context";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBooking } from "@/store/slices/bookingsSlice";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RatingDisplay } from "@/components/ui/rating-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Booking } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  CreditCard,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];

interface BookingFormData {
  service: string;
  description: string;
  date: Date | undefined;
  timeSlot: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  specialInstructions: string;
  agreeToTerms: boolean;
  paymentMethod: "cash" | "jazzcash" | "easypaisa";
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const workerId = params.workerId as string;
  const { t, getWorkerById, addBooking: addBookingToContext } = useApp();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const worker = getWorkerById(workerId);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    service: "",
    description: "",
    date: undefined,
    timeSlot: "",
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: "",
    specialInstructions: "",
    agreeToTerms: false,
    paymentMethod: "cash",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  if (!worker) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="py-16 px-8 text-center">
              <p className="text-lg font-medium text-foreground mb-2">
                Worker not found
              </p>
              <Button asChild>
                <Link href="/categories">Browse Workers</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedService = worker.services.find(
    (s) => s.id === formData.service
  );
  const platformFee = selectedService
    ? Math.round((selectedService.priceMin + selectedService.priceMax) / 20)
    : 200;

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!formData.service && !!formData.address;
      case 2:
        return !!formData.date && !!formData.timeSlot;
      case 3:
        return !!formData.name && !!formData.phone;
      case 4:
        return formData.agreeToTerms;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newBookingId = `MZ${Date.now().toString().slice(-5)}`;
    const newBooking: Booking = {
      id: newBookingId,
      customerId: user?.id || "guest",
      workerId: worker.id,
      worker: {
        name: worker.name,
        photo: worker.avatar || "",
        category: worker.category,
        phone: worker.phone,
      },
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      },
      service: selectedService?.name || formData.service,
      serviceDescription: formData.description,
      date: formData.date?.toISOString().split("T")[0] || "",
      timeSlot: formData.timeSlot,
      address: formData.address,
      status: "pending",
      estimatedPrice: {
        min: selectedService?.priceMin || worker.priceRange.min,
        max: selectedService?.priceMax || worker.priceRange.max,
      },
      platformFee,
      paymentMethod: formData.paymentMethod,
      specialInstructions: formData.specialInstructions,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          event: "Booking created",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    dispatch(addBooking(newBooking));
    addBookingToContext(newBooking);
    setBookingId(newBookingId);
    setIsSubmitting(false);
    setStep(5); // Success step
    toast.success("Booking confirmed!");
  };

  const steps = [
    { number: 1, title: "Service Details" },
    { number: 2, title: "Date & Time" },
    { number: 3, title: "Contact Info" },
    { number: 4, title: "Confirmation" },
  ];

  // Success Screen
  if (step === 5) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="py-12 px-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground mb-6">
                Your booking reference is{" "}
                <span className="font-semibold text-foreground">
                  #{bookingId}
                </span>
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6 text-left space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Worker:</span>{" "}
                  {worker.name}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Service:</span>{" "}
                  {selectedService?.name}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Date:</span>{" "}
                  {formData.date?.toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Time:</span>{" "}
                  {formData.timeSlot}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                The worker will call you within 15 minutes to confirm. You'll
                receive updates via SMS.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link href="/customer/bookings">View Booking Details</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">{t("nav.home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/workers/${worker.id}`}>{worker.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Book</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    step >= s.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s.number ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    s.number
                  )}
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm hidden sm:inline",
                    step >= s.number
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {s.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 sm:w-16 h-0.5 mx-2 sm:mx-4",
                      step > s.number ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {/* Step 1: Service Details */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Service Details</h2>

                      <div className="space-y-2">
                        <Label htmlFor="service">Select Service *</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, service: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {worker.services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name} (Rs.{" "}
                                {service.priceMin.toLocaleString()} -{" "}
                                {service.priceMax.toLocaleString()})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Describe the Issue (Optional)
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Tell us more about the problem..."
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Service Address *</Label>
                        <Textarea
                          id="address"
                          placeholder="Enter your full address..."
                          value={formData.address}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Date & Time */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">
                        Select Date & Time
                      </h2>

                      <div className="space-y-2">
                        <Label>Select Date *</Label>
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) =>
                            setFormData((prev) => ({ ...prev, date }))
                          }
                          disabled={(date) =>
                            date < new Date() ||
                            date >
                              new Date(
                                Date.now() + 30 * 24 * 60 * 60 * 1000
                              )
                          }
                          className="rounded-md border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Select Time Slot *</Label>
                        <RadioGroup
                          value={formData.timeSlot}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, timeSlot: value }))
                          }
                          className="grid grid-cols-2 gap-3"
                        >
                          {TIME_SLOTS.map((slot) => (
                            <div key={slot}>
                              <RadioGroupItem
                                value={slot}
                                id={slot}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={slot}
                                className={cn(
                                  "flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                                  formData.timeSlot === slot &&
                                    "border-primary bg-primary/5"
                                )}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {slot}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Note: Worker will confirm exact time after reviewing
                        your request.
                      </p>
                    </div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">
                        Contact Information
                      </h2>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            placeholder="+92 300 1234567"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instructions">
                          Special Instructions (Optional)
                        </Label>
                        <Textarea
                          id="instructions"
                          placeholder="Anything else the worker should know?"
                          value={formData.specialInstructions}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              specialInstructions: e.target.value,
                            }))
                          }
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Confirmation */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">
                        Review & Confirm
                      </h2>

                      {/* Booking Summary */}
                      <div className="bg-muted rounded-lg p-4 space-y-3">
                        <h3 className="font-medium">Booking Summary</h3>
                        <div className="grid gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Worker
                            </span>
                            <span>{worker.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Service
                            </span>
                            <span>{selectedService?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date</span>
                            <span>
                              {formData.date?.toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time</span>
                            <span>{formData.timeSlot}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Address
                            </span>
                            <span className="text-right max-w-[200px]">
                              {formData.address}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div className="border rounded-lg p-4 space-y-3">
                        <h3 className="font-medium">Price Estimate</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Service estimate
                            </span>
                            <span>
                              Rs. {selectedService?.priceMin.toLocaleString()} -
                              Rs. {selectedService?.priceMax.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Platform fee
                            </span>
                            <span>Rs. {platformFee.toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-medium">
                            <span>Total estimate</span>
                            <span>
                              Rs.{" "}
                              {(
                                (selectedService?.priceMin || 0) + platformFee
                              ).toLocaleString()}{" "}
                              - Rs.{" "}
                              {(
                                (selectedService?.priceMax || 0) + platformFee
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: value as BookingFormData["paymentMethod"],
                            }))
                          }
                          className="grid grid-cols-3 gap-3"
                        >
                          {[
                            { value: "cash", label: "Cash" },
                            { value: "jazzcash", label: "JazzCash" },
                            { value: "easypaisa", label: "EasyPaisa" },
                          ].map((method) => (
                            <div key={method.value}>
                              <RadioGroupItem
                                value={method.value}
                                id={method.value}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={method.value}
                                className={cn(
                                  "flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-3 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground",
                                  formData.paymentMethod === method.value &&
                                    "border-primary bg-primary/5"
                                )}
                              >
                                <CreditCard className="mr-2 h-4 w-4" />
                                {method.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <p className="text-xs text-muted-foreground">
                          Payment to be made after work completion.
                        </p>
                      </div>

                      {/* Terms */}
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              agreeToTerms: !!checked,
                            }))
                          }
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          I agree to the{" "}
                          <Link
                            href="/terms-of-service"
                            className="text-primary underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy-policy"
                            className="text-primary underline"
                          >
                            Cancellation Policy
                          </Link>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    {step > 1 ? (
                      <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    ) : (
                      <Button variant="outline" asChild>
                        <Link href={`/workers/${worker.id}`}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Cancel
                        </Link>
                      </Button>
                    )}
                    {step < 4 ? (
                      <Button onClick={handleNext}>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Confirming..." : "Confirm Booking"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Worker Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Worker</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={worker.avatar || "/placeholder.svg"}
                      alt={worker.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold">{worker.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {t(`category.${worker.category}`)}
                      </p>
                      <RatingDisplay
                        rating={worker.rating}
                        reviewCount={worker.reviewCount}
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {worker.verified.cnic && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Shield className="h-3 w-3" />
                        CNIC
                      </Badge>
                    )}
                    {worker.verified.police && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Police
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    {worker.location}
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
