"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || "Login failed");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3ea] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#eadfcd] bg-white shadow-xl p-8 sm:p-10">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2f2015] text-white text-xl shadow-md">
            ॐ
          </div>

          <p className="text-sm tracking-[0.2em] uppercase text-[#9b6b35]">
            Bhagavad Gita Reader
          </p>

          <h1 className="mt-3 text-3xl font-serif text-[#2f2015]">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-[#7a6450]">
            Sign in to manage shloks, meanings, audio and video.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#5f4a36]">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full rounded-2xl border border-[#e4d6c3] bg-[#fffdf9] px-4 py-3 text-[#2f2015] outline-none transition focus:border-[#9b6b35] focus:ring-4 focus:ring-amber-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#5f4a36]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full rounded-2xl border border-[#e4d6c3] bg-[#fffdf9] px-4 py-3 text-[#2f2015] outline-none transition focus:border-[#9b6b35] focus:ring-4 focus:ring-amber-100"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-2xl bg-[#2f2015] py-3 text-white font-medium transition hover:bg-[#20150e] disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Enter CMS"}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-[#8b735d]">
          Protected access for content management
        </p>
      </div>
    </div>
  );
}