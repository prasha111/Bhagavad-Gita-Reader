import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/db";       
import Shlok from "@/models/Shlok";

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  await connectDB();
  const body = await req.json();

  try {
    const updated = await Shlok.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    await connectDB();
  
    try {
      const deleted = await Shlok.deleteOne(params.id);
  
      if (!deleted) {
        return NextResponse.json(
          { success: false, error: "Shlok not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ success: true, data: deleted._id });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { success: false, error: "Delete failed" },
        { status: 500 }
      );
    }
  }
  