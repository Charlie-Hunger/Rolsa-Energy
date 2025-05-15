import { NextResponse, type NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
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

    // destroy the session
    await session.destroy();

    return NextResponse.json({ message: "User logged out" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
