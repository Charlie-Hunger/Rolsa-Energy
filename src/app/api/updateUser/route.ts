import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";

interface SessionData {
  user?: {
    id: string;
  };
}

export async function GET() {
  try {
    await dbConnect();

    const session = await getIronSession<SessionData>(await cookies(), {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
      cookieName: "user",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    });

    if (!session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findById(session.user.id).select(
      "firstName lastName email"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();

    const session = await getIronSession<SessionData>(await cookies(), {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
      cookieName: "user",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    });

    if (!session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, email } = body;

    // Validate required fields
    if (!firstName && !lastName && !email) {
      return NextResponse.json(
        { error: "At least one field must be provided for update" },
        { status: 400 }
      );
    }

    // Prepare update data (only include fields that are provided)
    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;

    // Find user first to verify it exists
    const existingUser = await User.findById(session.user.id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If email is being changed, check if it's already in use
    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 }
        );
      }
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      updateData,
      { new: true }
    ).select("firstName lastName email");

    // Null check
    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }

    // updatedUser cannot be null
    return NextResponse.json(
      {
        message: "User updated successfully",
        user: {
          id: updatedUser._id,
          name: `${updatedUser.firstName} ${updatedUser.lastName}`,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
