"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-lg font-semibold">Bhagavad Gita</h1>

      <div className="flex gap-4 text-sm">
        <Link href="/reader">Reader</Link>
        <Link href="/login">Admin</Link>
      </div>
    </div>
  );
}