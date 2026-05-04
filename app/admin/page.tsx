"use client";

import React, { useEffect, useState } from "react";

type ShlokType = {
  _id: string;
  chapter: number;
  shlokNumber: number;
  sanskrit: string;
  english: string;
  hindi: string;
  audio?: string;
  video?: string;
};

type FormState = {
  chapter: string;
  shlokNumber: string;
  sanskrit: string;
  english: string;
  hindi: string;
  audio: string;
  video: string;
};

const emptyForm: FormState = {
  chapter: "",
  shlokNumber: "",
  sanskrit: "",
  english: "",
  hindi: "",
  audio: "",
  video: "",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"add" | "list">("add");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [shloks, setShloks] = useState<ShlokType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchShloks = async () => {
    try {
      setIsLoadingList(true);
      const res = await fetch("/api/shlok");
      const data = await res.json();
      setShloks(data || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching shloks");
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    if (activeTab === "list") {
      fetchShloks();
    }
  }, [activeTab]);

  const handleSubmit = async () => {
    try {
      setIsSaving(true);

      const payload = {
        chapter: Number(form.chapter),
        shlokNumber: Number(form.shlokNumber),
        sanskrit: form.sanskrit,
        english: form.english,
        hindi: form.hindi,
        audio: form.audio,
        video: form.video,
      };

      const url = editingId ? `/api/shlok/${editingId}` : "/api/shlok";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingId ? "Shlok updated ✅" : "Saved to MongoDB ✅");

        setForm(emptyForm);
        setEditingId(null);

        if (activeTab === "list") {
          fetchShloks();
        }
      } else {
        alert("Error saving data");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (s: ShlokType) => {
    setForm({
      chapter: String(s.chapter),
      shlokNumber: String(s.shlokNumber),
      sanskrit: s.sanskrit,
      english: s.english,
      hindi: s.hindi,
      audio: s.audio || "",
      video: s.video || "",
    });
    setEditingId(s._id);
    setActiveTab("add");
  };
  const handleDelete = async (id: string) => {
    console.log("Deleting id:", id);
  
    if (!confirm("Delete this shlok?")) return;
  
    try {
      const res = await fetch(`/api/shlok/${id}`, { method: "DELETE" });
      const data = await res.json();
      console.log("Delete response:", res.status, data);
  
      if (!res.ok || !data.success) {
        alert(data.error || "Error deleting shlok");
        return;
      }
  
      setShloks((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Server error Not success full❌");
    }
  };




  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);

    setForm((prev) => ({
      ...prev,
      audio: url,
    }));
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url as string;
  };

  const isEditing = Boolean(editingId);

  return (
    <div className="min-h-screen flex bg-[#f5f5f5] text-black">
 
      <div className="w-64 bg-black text-white p-6 hidden md:block">
        <h2 className="text-xl font-semibold mb-6">CMS Panel</h2>

        <ul className="space-y-4 text-gray-300">
          <li
            className={`hover:text-white cursor-pointer ${
              activeTab === "add" ? "text-white" : ""
            }`}
            onClick={() => {
              setActiveTab("add");
              setEditingId(null);
              setForm(emptyForm);
            }}
          >
            📖 Add / Edit Shlok
          </li>
          <li
            className={`hover:text-white cursor-pointer ${
              activeTab === "list" ? "text-white" : ""
            }`}
            onClick={() => setActiveTab("list")}
          >
            📚 All Shloks
          </li>
          <li className="hover:text-white cursor-pointer">⚙ Settings</li>
        </ul>
      </div>


      <div className="flex-1 p-6">
        {activeTab === "add" ? (
          <>

            <div className="mb-6">
              <h1 className="text-3xl font-serif">
                {isEditing ? "Edit Shlok" : "Add Shlok"}
              </h1>
              <p className="text-gray-500">Manage your Gita content</p>
            </div>


            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="chapter"
                  placeholder="Chapter"
                  value={form.chapter}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  name="shlokNumber"
                  placeholder="Shlok Number"
                  value={form.shlokNumber}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <textarea
                name="sanskrit"
                placeholder="Sanskrit Shlok"
                value={form.sanskrit}
                onChange={handleChange}
                className="input h-24"
              />

              <textarea
                name="english"
                placeholder="English Meaning"
                value={form.english}
                onChange={handleChange}
                className="input h-24"
              />

              <textarea
                name="hindi"
                placeholder="Hindi Meaning"
                value={form.hindi}
                onChange={handleChange}
                className="input h-24"
              />

              <input
                name="audio"
                type="file"
                onChange={handleAudioUpload}
                className="input"
              />
              {form.audio && (
                <p className="text-xs text-green-600">
                  Audio uploaded ✔ ({form.audio.slice(0, 40)}…)
                </p>
              )}

              <input
                name="video"
                type="file"
                onChange={handleVideoUpload}
                className="input"
              />
              {form.video && (
                <p className="text-xs text-green-600">
                  Video uploaded ✔ ({form.video.slice(0, 40)}…)
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="w-full bg-black text-white py-3 rounded-xl hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 transition"
              >
                {isSaving
                  ? "Saving..."
                  : isEditing
                  ? "💾 Update Shlok"
                  : "➕ Add Shlok"}
              </button>
            </div>

            <div className="mt-8 max-w-2xl bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg mb-2">Live Preview</h2>

              <p className="text-sm text-gray-500">
                Chapter {form.chapter || "–"} • Shlok {form.shlokNumber || "–"}
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
          </>
        ) : (
          <div className="max-w-4xl bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl mb-4">All Shloks</h1>

            {isLoadingList ? (
              <p className="text-gray-500">Loading...</p>
            ) : shloks.length === 0 ? (
              <p className="text-gray-500">No shloks found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Chap</th>
                      <th className="text-left py-2">Shlok</th>
                      <th className="text-left py-2">Sanskrit (snippet)</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shloks.map((s) => (
                      <tr key={s._id} className="border-b">
                        <td className="py-2">{s.chapter}</td>
                        <td className="py-2">{s.shlokNumber}</td>
                        <td className="py-2 max-w-xs truncate">
                          {s.sanskrit.slice(0, 50)}…
                        </td>
                        <td className="py-2 space-x-2">
                          <button
                            onClick={() => handleEdit(s)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(s._id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}