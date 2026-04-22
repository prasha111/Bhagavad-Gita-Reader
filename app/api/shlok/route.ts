import { NextResponse } from "next/server";
import  {connectDB}  from "../../../lib/data";
import Shlok from "@/models/Shlok";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const newShlok = await Shlok.create(body);

  return NextResponse.json({
    success: true,
    data: newShlok,
  });
}

export async function GET() {
  await connectDB();

  const shloks = await Shlok.find();

  return NextResponse.json(shloks);
}