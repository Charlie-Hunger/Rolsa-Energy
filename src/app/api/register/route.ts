import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import bcryptjs from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    dbConnect();
    const data = await req.json();
    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcryptjs.hash(data.password, 10);
    const newUser = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
