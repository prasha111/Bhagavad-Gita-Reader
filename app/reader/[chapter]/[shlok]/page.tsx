"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ShlokCard from "@/components/reader/ShlokCard";
import NavigationControls from "@/components/reader/NavigationControls";

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

  const [current, setCurrent] = useState<any>(null);
  const [swipeClass, setSwipeClass] = useState("");

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

 
  useEffect(() => {
    fetch(`/api/shlok?chapter=${chapterNum}&shlok=${shlokNum}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrent(data);
      });
  }, [chapterNum, shlokNum]);


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
      setSwipeClass("swipe-left");

      setTimeout(() => {
        router.push(`/reader/${chapterNum}/${shlokNum + 1}`);
      }, 200);
    }

   
    if (diff < -50 && shlokNum > 1) {
      setSwipeClass("swipe-right");

      setTimeout(() => {
        router.push(`/reader/${chapterNum}/${shlokNum - 1}`);
      }, 200);
    }
  };

 
  useEffect(() => {
    setSwipeClass("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapterNum, shlokNum]);


  if (!current) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <h2 className="text-xl mb-2">Shlok not found ❌</h2>
        <p className="text-gray-500">
          Try adding it from admin panel
        </p>
      </div>
    );
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#fdfaf5] to-[#f7f1e3] ${swipeClass}`}
    >
   
      <div className="max-w-3xl w-full fade-in">
        <ShlokCard shlok={current} />
      </div>

  
      <NavigationControls
        chapter={chapterNum}
        shlok={shlokNum}
      />

   
      <div className="absolute bottom-4 text-gray-400 text-sm">
        ← Swipe →
      </div>
    </div>
  );
}