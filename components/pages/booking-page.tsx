"use client";

import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { useAppSelector } from "@/store/hooks";
import { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Clock,
  CreditCard,
  Shield,
  Star,
} from "lucide-react";

const timeSlots = [
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
];

export default function BookingPage() {
  const { workerId } = useParams<{ workerId: string }>();
  const navigate = useNavigate();
  const { getWorkerById, addBooking, t } = useApp();
  const { user } = useAppSelector((state) => state.auth);

  const worker = getWorkerById(workerId || "");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    service: "",
    timeSlot: "",
    address: "",
    description: "",
    paymentMethod: "cash",
  });

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

  const selectedService = worker.services.find((s) => s.id === formData.service);
  const platformFee = selectedService
    ? Math.round(selectedService.priceMin * 0.1)
    : 0;

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedService || !user) return;
    setLoading(true);

    // Create booking
    const booking: Booking = {
      id: `b-${Date.now()}`,
      customerId: user.id,
      workerId: worker.id,
      worker: {
        name: worker.name,
        photo: worker.avatar || "",
        category: worker.category,
        phone: worker.phone,
      },
      customer: {
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
      service: selectedService.name,
      serviceDescription: formData.description,
      date: selectedDate.toISOString().split("T")[0],
      timeSlot: formData.timeSlot,
      address: formData.address,
      status: "pending",
      estimatedPrice: {
        min: selectedService.priceMin,
        max: selectedService.priceMax,
      },
      platformFee,
      paymentMethod: formData.paymentMethod as "cash" | "jazzcash" | "easypaisa",
      createdAt: new Date().toISOString(),
      timeline: [
        { event: "Booking created", timestamp: new Date().toISOString() },
      ],
    };

    setTimeout(() => {
      addBooking(booking);
      setLoading(false);
      navigate("/customer/bookings");
    }, 1500);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.service !== "";
      case 2:
        return selectedDate && formData.timeSlot !== "";
      case 3:
        return formData.address.trim() !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <Link
            to={`/workers/${worker.id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {["Service", "Date & Time", "Address", "Review"].map(
                (label, index) => (
                  <div key={label} className="flex flex-1 items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                        step > index + 1
                          ? "bg-primary text-primary-foreground"
                          : step === index + 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > index + 1 ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    {index < 3 && (
                      <div
                        className={`mx-2 h-0.5 flex-1 ${
                          step > index + 1 ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                )
              )}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Service</span>
              <span>Date & Time</span>
              <span>Address</span>
              <span>Review</span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Select Service */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select a Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData({ ...formData, service: value })
                      }
                    >
                      <div className="space-y-3">
                        {worker.services.map((service) => (
                          <label
                            key={service.id}
                            className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                              formData.service === service.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value={service.id} />
                              <div>
                                <p className="font-medium">{service.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  <Clock className="mr-1 inline h-3 w-3" />
                                  {service.duration}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                Rs. {service.priceMin.toLocaleString()} -{" "}
                                {service.priceMax.toLocaleString()}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date & Time</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="mb-3 block">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) =>
                          date < new Date() ||
                          date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        }
                        className="rounded-md border"
                      />
                    </div>
                    <div>
                      <Label className="mb-3 block">Select Time Slot</Label>
                      <Select
                        value={formData.timeSlot}
                        onValueChange={(value) =>
                          setFormData({ ...formData, timeSlot: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Address */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Service Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Complete Address</Label>
                      <Textarea
                        id="address"
                        placeholder="House/Apartment number, Street, Area, City"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Additional Notes (Optional)
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Any specific instructions or details about the work needed"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Review & Payment */}
              {step === 4 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Your Booking</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4 rounded-lg border p-4">
                        <img
                          src={worker.avatar || "/placeholder.svg"}
                          alt={worker.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{worker.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {t(`category.${worker.category}`)}
                          </p>
                          <div className="mt-1 flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm">{worker.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service</span>
                          <span className="font-medium">
                            {selectedService?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-medium">
                            {selectedDate?.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time</span>
                          <span className="font-medium">{formData.timeSlot}</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <span className="text-muted-foreground">Address</span>
                          <span className="max-w-[200px] text-right font-medium">
                            {formData.address}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) =>
                          setFormData({ ...formData, paymentMethod: value })
                        }
                      >
                        <div className="space-y-3">
                          <label
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                              formData.paymentMethod === "cash"
                                ? "border-primary bg-primary/5"
                                : ""
                            }`}
                          >
                            <RadioGroupItem value="cash" />
                            <div>
                              <p className="font-medium">Cash on Completion</p>
                              <p className="text-sm text-muted-foreground">
                                Pay in cash after the work is done
                              </p>
                            </div>
                          </label>
                          <label
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                              formData.paymentMethod === "jazzcash"
                                ? "border-primary bg-primary/5"
                                : ""
                            }`}
                          >
                            <RadioGroupItem value="jazzcash" />
                            <div>
                              <p className="font-medium">JazzCash</p>
                              <p className="text-sm text-muted-foreground">
                                Pay via JazzCash mobile wallet
                              </p>
                            </div>
                          </label>
                          <label
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
                              formData.paymentMethod === "easypaisa"
                                ? "border-primary bg-primary/5"
                                : ""
                            }`}
                          >
                            <RadioGroupItem value="easypaisa" />
                            <div>
                              <p className="font-medium">Easypaisa</p>
                              <p className="text-sm text-muted-foreground">
                                Pay via Easypaisa mobile wallet
                              </p>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                {step < 4 ? (
                  <Button onClick={handleNext} disabled={!canProceed()}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Confirming..." : "Confirm Booking"}
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={worker.avatar || "/placeholder.svg"}
                      alt={worker.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{worker.name}</p>
                      <Badge variant="secondary" className="mt-1">
                        <Shield className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                  </div>

                  {selectedService && (
                    <>
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Service</span>
                          <span>{selectedService.name}</span>
                        </div>
                        <div className="mt-2 flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Estimated Price
                          </span>
                          <span>
                            Rs. {selectedService.priceMin.toLocaleString()} -{" "}
                            {selectedService.priceMax.toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Platform Fee
                          </span>
                          <span>Rs. {platformFee.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total (Estimated)</span>
                          <span>
                            Rs.{" "}
                            {(
                              selectedService.priceMin + platformFee
                            ).toLocaleString()}{" "}
                            -{" "}
                            {(
                              selectedService.priceMax + platformFee
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="rounded-lg bg-primary/10 p-3">
                    <div className="flex items-start gap-2">
                      <Shield className="mt-0.5 h-4 w-4 text-primary" />
                      <div className="text-sm">
                        <p className="font-medium text-primary">
                          Damage Protection
                        </p>
                        <p className="text-muted-foreground">
                          Up to Rs. 25,000 coverage included
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
