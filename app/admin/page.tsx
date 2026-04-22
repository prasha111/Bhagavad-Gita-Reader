"use client";


import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    chapter: "",
    shlokNumber: "",
    sanskrit: "",
    english: "",
    hindi: "",
    audio: "",
    video:""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/shlok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapter: Number(form.chapter),
          shlokNumber: Number(form.shlokNumber),
          sanskrit: form.sanskrit,
          english: form.english,
          hindi: form.hindi,
          audio: form.audio,
          video:form.video
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Saved to MongoDB ✅");

        setForm({
          chapter: "",
          shlokNumber: "",
          sanskrit: "",
          english: "",
          hindi: "",
          audio: "",
          video:""
        });
      } else {
        alert("Error saving data");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };
  const handleAudioUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const url = await uploadToCloudinary(file);
  
    setForm((prev) => ({
      ...prev,
      audio: url,
    }));
  };
  
  const handleVideoUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const url = await uploadToCloudinary(file);
  
    setForm((prev) => ({
      ...prev,
      video: url,
    }));
  };
  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    //console.log(process.env.NEXT_PUBLIC_CLOUDINARY_URL)
    //const url = "https://api.cloudinary.com/v1_1/dgpf4tveb/auto/upload"
    const res = await fetch("/api/upload",
      {
        method: "POST",
        body: data,
      }
    );
  
    const result = await res.json();
    return result.secure_url;
  };

  return (
    <div className="min-h-screen flex bg-[#f5f5f5] text-black">
      <div className="w-64 bg-black text-white p-6 hidden md:block">
        <h2 className="text-xl font-semibold mb-6">CMS Panel</h2>

        <ul className="space-y-4 text-gray-300">
          <li className="hover:text-white cursor-pointer">📖 Add Shlok</li>
          <li className="hover:text-white cursor-pointer">📚 All Shloks</li>
          <li className="hover:text-white cursor-pointer">⚙ Settings</li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-serif">Add Shlok</h1>
          <p className="text-gray-500">Manage your Gita content</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="chapter"
              placeholder="Chapter"
              onChange={handleChange}
              className="input"
            />
            <input
              name="shlokNumber"
              placeholder="Shlok Number"
              onChange={handleChange}
              className="input"
            />
          </div>

          <textarea
            name="sanskrit"
            placeholder="Sanskrit Shlok"
            onChange={handleChange}
            className="input h-24"
          />

          <textarea
            name="english"
            placeholder="English Meaning"
            onChange={handleChange}
            className="input h-24"
          />

          <textarea
            name="hindi"
            placeholder="Hindi Meaning"
            onChange={handleChange}
            className="input h-24"
          />

          <input
            name="audio"
            type="file"
            placeholder="Audio URL"
            onChange={handleAudioUpload}
            className="input"
          />
          <input
            name="video"
            type="file"
            placeholder="Video URL (optional)"
            onChange={handleVideoUpload}
            className="input"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded-xl hover:scale-[1.02] transition"
          >
            ➕ Add Shlok
          </button>
        </div>

        <div className="mt-8 max-w-2xl bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg mb-2">Live Preview</h2>

          <p className="text-sm text-gray-500">
            Chapter {form.chapter} • Shlok {form.shlokNumber}
          </p>

          <p className="mt-2 font-serif text-lg">
            {form.sanskrit || "Sanskrit will appear here..."}
          </p>

          <p className="mt-2 text-gray-700">
            {form.english || "English meaning..."}
          </p>

          <p className="mt-2 text-gray-500 italic">
            {form.hindi || "Hindi meaning..."}
          </p>
        </div>
      </div>
    </div>
  );
}
