"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Loader2,
  Check,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function BookingPage() {
  const [bookingType, setBookingType] = useState("consultation");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in
        const authResponse = await fetch(
          `/api/isLoggedIn?_=${new Date().getTime()}`,
          {
            method: "GET",
            headers: { "Cache-Control": "no-cache" },
          }
        );

        const authData = await authResponse.json();

        if (authResponse.ok && authData.isLoggedIn) {
          setIsAuthenticated(true);

          // Fetch user details from session
          const userResponse = await fetch("/api/getSession");
          if (userResponse.ok) {
            const userDetails = await userResponse.json();
            setUserData(userDetails);
          } else {
            setError("Failed to load your information. Please try again.");
          }
        } else {
          setIsAuthenticated(false);
          router.push("/auth/signin?returnUrl=/booking");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setError("An error occurred while loading your information.");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !userData) {
      router.push("/auth/signin?returnUrl=/booking");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const fullName = `${userData.firstName} ${userData.lastName}`.trim();

      // Submit booking data to API
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: bookingType,
          date: date,
          time: time,
          name: fullName,
          email: userData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Redirect to dashboard after success
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setError(data.error || "Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-green-600" />
          <p className="text-lg text-gray-500">Loading booking form...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl text-green-600">
              Booking Successful!
            </CardTitle>
            <CardDescription className="text-center">
              Your appointment has been scheduled. Redirecting to dashboard...
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4">
              <p className="font-medium">
                {bookingType === "consultation"
                  ? "Consultation"
                  : "Installation"}
              </p>
              <p className="text-gray-500">
                {new Date(date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                at {time}
              </p>
            </div>
            <Loader2 className="h-6 w-6 animate-spin text-green-600 mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated || !userData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to sign in to book an appointment.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={() => router.push("/auth/signin?returnUrl=/booking")}
              className="bg-green-600 hover:bg-green-700"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Book an Appointment
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-800 px-4 py-3 rounded mb-6">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>New Appointment</CardTitle>
          <CardDescription>
            Select appointment type, date and time to schedule your appointment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Info Display - Read Only */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
              <h3 className="font-medium text-black">Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-black" />
                  <span className="text-black">
                    {userData.firstName} {userData.lastName}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-black" />
                  <span className="text-black">{userData.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Appointment Type</Label>
              <RadioGroup
                value={bookingType}
                onValueChange={setBookingType}
                className="grid grid-cols-2 gap-4"
              >
                <div
                  className={`flex flex-col p-4 rounded-lg border-2 ${
                    bookingType === "consultation"
                      ? "border-green-500 bg-black"
                      : "border-gray-200"
                  }`}
                >
                  <RadioGroupItem
                    value="consultation"
                    id="consultation"
                    className="sr-only"
                  />
                  <Label htmlFor="consultation" className="cursor-pointer">
                    <div className="font-bold text-center mx-auto">
                      Consultation
                    </div>
                  </Label>
                </div>

                <div
                  className={`flex flex-col p-4 rounded-lg border-2 ${
                    bookingType === "installation"
                      ? "border-green-500 bg-black"
                      : "border-gray-200"
                  }`}
                >
                  <RadioGroupItem
                    value="installation"
                    id="installation"
                    className="sr-only"
                  />
                  <Label htmlFor="installation" className="cursor-pointer">
                    <div className="font-bold text-center mx-auto">
                      Installation
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <Label htmlFor="date">Date</Label>
                </div>
                <Input
                  type="date"
                  id="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <Label htmlFor="time">Time</Label>
                </div>
                <Select value={time} onValueChange={setTime} required>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting || !date || !time}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Book Appointment"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t px-6 py-4"></CardFooter>
      </Card>
    </div>
  );
}
