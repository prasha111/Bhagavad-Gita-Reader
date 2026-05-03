import { NextResponse } from "next/server";
import  {connectDB}  from "@/lib/db.ts";
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

export async function GET(req: Request) {
    await connectDB();
  
    const { searchParams } = new URL(req.url);
  
    const chapter = searchParams.get("chapter");
    const shlok = searchParams.get("shlok");
  
    try {

      if (chapter && shlok) {
        const data = await Shlok.findOne({
          chapter: Number(chapter),
          shlokNumber: Number(shlok),
        });
  
        return NextResponse.json(data);
      }
  
 
      if (chapter) {
        const data = await Shlok.find({
          chapter: Number(chapter),
        }).sort({ shlokNumber: 1 });
  
        return NextResponse.json(data);
      }
  
      const data = await Shlok.find();
  
      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }