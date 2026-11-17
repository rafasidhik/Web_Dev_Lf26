
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { createToken } from "@/lib/auth";

const signupSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  try {
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const email = result.data.email.toLowerCase();
    const password = result.data.password;

    const { data: existingUser, error: lookupError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) {
      console.error("User lookup failed:", lookupError);
      return NextResponse.json(
        { error: "Unable to create account right now" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const { data: user, error: insertError } = await supabase
      .from("users")
      .insert({ email, password_hash: passwordHash })
      .select("id, email")
      .single();

    if (insertError || !user) {
      console.error("User creation failed:", insertError);
      return NextResponse.json(
        { error: "Unable to create account right now" },
        { status: 500 }
      );
    }

    const token = await createToken(user.id, user.email);

    const response = NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
