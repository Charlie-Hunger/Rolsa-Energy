import { NextResponse, type NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionData {
  user?: {
    id: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getIronSession<SessionData>(await cookies(), {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
      cookieName: "user",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    });

    const data = await req.json();
    const foundUser = await User.findOne({ email: data.email });

    if (!foundUser) {
      return NextResponse.json(
        { message: "Email or password incorrect", isLoggedIn: false },
        { status: 404 }
      );
    }

    const passwordMatch = await bcryptjs.compare(
      data.password,
      foundUser.password
    );

    if (passwordMatch) {
      session.user = {
        id: foundUser._id.toString(),
      };

      await session.save();

      return NextResponse.json(
        {
          message: "User logged in successfully",
          isLoggedIn: true,
        },
        {
          status: 200,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Email or password incorrect",
          isLoggedIn: false,
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        message: "An error occurred",
        isLoggedIn: false,
      },
      {
        status: 500,
      }
    );
  }
}
