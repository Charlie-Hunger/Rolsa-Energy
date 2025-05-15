import dbConnect from "@/lib/dbConnect";
import Booking from "@/lib/models/Booking";
import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionData {
  user?: {
    id: string;
  };
}

// Get all bookings for the logged in user
export async function GET() {
  try {
    await dbConnect();

    // Verify user is authenticated
    const session = await getIronSession<SessionData>(await cookies(), {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
      cookieName: "user",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    });

    // Check if user is logged in
    if (!session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Find all bookings for this user
    const userBookings = await Booking.find({ userId: session.user.id })
      .sort({ date: -1, time: 1 }) // Sort by date (newest first) then time
      .lean();

    // Transform bookings to match the expected format in the dashboard
    const formattedBookings = userBookings.map((booking) => ({
      id: booking._id.toString(),
      service: booking.type || "Consultation",
      date: new Date(booking.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time: booking.time,
      status: booking.status || "pending", // only set to pending in this dev stage
    }));

    return NextResponse.json(
      {
        bookings: formattedBookings,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
}

// Create a new booking
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Verify user is authenticated
    const session = await getIronSession<SessionData>(await cookies(), {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
      cookieName: "user",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    });

    // Check if user is logged in
    if (!session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Parse request body
    const data = await req.json();

    // Validate required fields
    if (!data.date || !data.time || !data.type) {
      return NextResponse.json(
        {
          error: "Date, time and service type are required",
        },
        {
          status: 400,
        }
      );
    }

    // Create new booking
    const newBooking = new Booking({
      type: data.type,
      date: data.date,
      time: data.time,
      name: data.name,
      email: data.email,
      userId: session.user.id,
      status: "pending", // Default status
    });

    await newBooking.save();

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking: {
          id: newBooking._id.toString(),
          service: newBooking.type,
          date: new Date(newBooking.date).toLocaleDateString(),
          time: newBooking.time,
          status: newBooking.status,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
