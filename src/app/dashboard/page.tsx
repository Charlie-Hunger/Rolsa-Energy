"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  Save,
  Loader2,
  Calendar,
  ArrowRight,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// interface for booking type
interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
  status: "pending";
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [bookingError, setBookingError] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/getSession");
        if (!response.ok) {
          if (response.status === 401) {
            // Not authenticated, redirect to login
            router.push("/auth/signin");
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
        setEditedUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [router]);

  // Fetch user bookings
  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/bookings");

        if (!response.ok) {
          if (response.status === 401) {
            // Will be handled by the other useEffect
            return;
          }
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookingError(
          "Failed to load your bookings. Please try again later."
        );
      } finally {
        setIsLoadingBookings(false);
      }
    }

    // Only fetch bookings if user is loaded
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setEditedUser(user);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      // Update the user state with the edited values
      setUser(editedUser);
      setIsEditing(false);
      // Success message could be added here
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to update user information. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Get status color based on booking status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-green-600" />
          <p className="text-lg text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              My Dashboard
            </h1>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400">
              View and manage your account information
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-grow w-full py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}

            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-green-600" />
                  <CardTitle>Profile Information</CardTitle>
                </div>
                <CardDescription>
                  {isEditing
                    ? "Edit your personal information below"
                    : "View your personal information"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        name="firstName"
                        value={editedUser.firstName}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        {user?.firstName || "Not provided"}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        name="lastName"
                        value={editedUser.lastName}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        {user?.lastName || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={editedUser.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                      {user?.email || "Not provided"}
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-medium">Account Settings</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Additional account settings and preferences will appear here.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEdit} className="ml-auto">
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Bookings Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <CardTitle>Your Bookings</CardTitle>
                  </div>
                  <Link href="/booking">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      New Booking
                    </Button>
                  </Link>
                </div>
                <CardDescription>
                  View and manage your appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookingError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                    {bookingError}
                  </div>
                )}

                {isLoadingBookings ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{booking.service}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.date} at {booking.time}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      You don't have any bookings yet.
                    </p>
                    <Link href="/booking">
                      <Button className="bg-green-600 hover:bg-green-700">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="w-full text-sm text-gray-500"></div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
