import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface SessionData {
  user?: {
    id: string;
  };
}

export async function GET() {
  try {
    const session = await getIronSession<SessionData>(await cookies(), {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
      cookieName: "user",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    });

    if (session.user) {
      return NextResponse.json({ isLoggedIn: true }, { status: 201 });
    }

    return NextResponse.json({ isLoggedIn: false }, { status: 200 });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
