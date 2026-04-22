import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dgpf4tveb",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file", { status: 400 });
    }

   
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    return Response.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    return new Response("Upload failed", { status: 500 });
  }
}