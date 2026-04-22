"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [chapters, setChapters] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/shlok")
      .then((res) => res.json())
      .then((data) => {
     
        const grouped: any = {};

        data.forEach((item: any) => {
          if (!grouped[item.chapter]) {
            grouped[item.chapter] = [];
          }
          grouped[item.chapter].push(item);
        });

  
        const result = Object.keys(grouped).map((ch) => ({
          id: Number(ch),
          shlokCount: grouped[ch].length,
        }));

        setChapters(result);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf5] to-[#f7f1e3] text-[#1a1a1a]">
      
      
      <div className="text-center pt-16 pb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-serif">
          Bhagavad Gita
        </h1>
        <p className="mt-4 text-gray-600">
          Start your journey through divine wisdom
        </p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 max-w-4xl mx-auto pb-16">
        
        {chapters.map((ch) => (
          <Link key={ch.id} href={`/reader/${ch.id}/1`}>
            <div className="p-6 rounded-2xl bg-white shadow hover:shadow-xl transition cursor-pointer">
              
              <h2 className="text-xl font-semibold">
                Chapter {ch.id}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                {ch.shlokCount} Shloks
              </p>

              <div className="mt-4 text-sm text-gray-600">
                Start Reading →
              </div>
            </div>
          </Link>
        ))}

      </div>

      {/* Empty state */}
      {chapters.length === 0 && (
        <div className="text-center text-gray-500">
          No shloks added yet ❌
        </div>
      )}
    </div>
  );
}