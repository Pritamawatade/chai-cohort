import { NextResponse } from "next/server";
import Todo from "@/models/Todo.model";
import connectTodatabase from "@/lib/mongodb";

export async function GET() {
  try {
    await connectTodatabase();
    const todos = await Todo.find().sort({ createdAt: -1 });

    return NextResponse.json({ todos });
  } catch (error) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const { title } = body;

    if (!title) {
      return NextResponse.json({
        error: "Title is required",
      });
    }

    await connectTodatabase();
    const todo = await Todo.create({title});

    return NextResponse.json({todo})
  } catch (error) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
