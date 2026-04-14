"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ShlokCard from "@/components/reader/ShlokCard";
import NavigationControls from "@/components/reader/NavigationControls";
import { shloks } from "@/lib/data";

export default function ReaderPage() {
  const router = useRouter();
  const params = useParams();


  const chapter = Array.isArray(params.chapter)
    ? params.chapter[0]
    : params.chapter;

  const shlok = Array.isArray(params.shlok)
    ? params.shlok[0]
    : params.shlok;

  const chapterNum = Number(chapter);
  const shlokNum = Number(shlok);


  const current = shloks.find(
    (s) =>
      s.chapter === chapterNum &&
      s.shlokNumber === shlokNum
  );


  const touchStartX = useRef(0);
  const touchEndX = useRef(0);


  const [swipeClass, setSwipeClass] = useState("");

  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };


  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };


  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;


    if (Math.abs(diff) < 50) return;

 
    if (diff > 50) {
      const nextExists = shloks.find(
        (s) =>
          s.chapter === chapterNum &&
          s.shlokNumber === shlokNum + 1
      );

      if (nextExists) {
        setSwipeClass("swipe-left");

        setTimeout(() => {
          router.push(`/reader/${chapter}/${shlokNum + 1}`);
        }, 200);
      }
    }

    // 👉 Previous shlok
    if (diff < -50 && shlokNum > 1) {
      setSwipeClass("swipe-right");

      setTimeout(() => {
        router.push(`/reader/${chapter}/${shlokNum - 1}`);
      }, 200);
    }
  };


  useEffect(() => {
    setSwipeClass("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapter, shlok]);


  if (!current) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-xl">Shlok not found ❌</h2>
      </div>
    );
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`reader-container min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#fdfaf5] to-[#f7f1e3] ${swipeClass}`}
    >

      <div className="max-w-3xl w-full fade-in">
        <ShlokCard shlok={current} />
      </div>

 
      <NavigationControls chapter={chapter} shlok={shlok} />

 
      <div className="absolute bottom-4 text-gray-400 text-sm">
        ← Swipe →
      </div>
    </div>
  );
}