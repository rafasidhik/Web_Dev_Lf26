
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { createToken } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Precomputed valid 12-round bcrypt hash to mitigate timing discrepancy on non-existent users
const DUMMY_BCRYPT_HASH =
  "$2b$12$baM9MvkiujP4zHiSw4GraO7gvsr0ORimKQ.8USJVyq6H3Nu4/v0Wy";

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
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const email = result.data.email.toLowerCase();
    const password = result.data.password;

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password_hash")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Login lookup failed:", error);
      return NextResponse.json(
        { error: "Unable to log in right now" },
        { status: 500 }
      );
    }

    // Always compare password against hash (using real or valid dummy hash) to eliminate timing attacks
    const hashToCompare = user?.password_hash ?? DUMMY_BCRYPT_HASH;
    const passwordMatches = await bcrypt.compare(password, hashToCompare);

    if (!user || !passwordMatches) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createToken(user.id, user.email);

    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
