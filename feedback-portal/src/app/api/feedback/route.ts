import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  message: z
    .string()
    .trim()
    .min(5, "Feedback must be at least 5 characters")
    .max(1000, "Feedback cannot exceed 1000 characters"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .max(30, "Category cannot exceed 30 characters"),
});

// GET: Fetch all feedback
export async function GET() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// POST: Submit feedback
export async function POST(request: Request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request" },
      { status: 400 }
    );
  }

  const result = feedbackSchema.safeParse(body);

  if (!result.success) {
    const errorMsg = result.error.issues[0]?.message || "Invalid feedback details";
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("feedback")
    .insert(result.data)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}

// PUT: Edit feedback
export async function PUT(request: Request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request" },
      { status: 400 }
    );
  }

  const idResult = z.string().uuid("Invalid feedback ID").safeParse(body.id);
  if (!idResult.success) {
    return NextResponse.json(
      { error: idResult.error.issues[0]?.message || "Invalid feedback ID" },
      { status: 400 }
    );
  }

  const feedbackResult = feedbackSchema.safeParse(body.feedback);
  if (!feedbackResult.success) {
    return NextResponse.json(
      { error: feedbackResult.error.issues[0]?.message || "Invalid feedback details" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("feedback")
    .update(feedbackResult.data)
    .eq("id", idResult.data)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to update feedback" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// DELETE: Delete feedback
export async function DELETE(request: Request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request" },
      { status: 400 }
    );
  }

  const idResult = z.string().uuid("Invalid feedback ID").safeParse(body.id);

  if (!idResult.success) {
    return NextResponse.json(
      { error: idResult.error.issues[0]?.message || "Invalid feedback ID" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("feedback")
    .delete()
    .eq("id", idResult.data);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete feedback" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Feedback deleted successfully",
  });
}
