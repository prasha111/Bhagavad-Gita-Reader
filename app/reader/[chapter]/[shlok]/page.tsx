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
  const [allShloks, setAllShloks] = useState<any[]>([]);


  useEffect(() => {
    fetch("/api/shlok")
      .then((res) => res.json())
      .then((data) => {
        setAllShloks(data);

        const found = data.find(
            (s: any) =>
              Number(s?.chapter) === chapterNum &&
              Number(s?.shlokNumber) === shlokNum
          );

        setCurrent(found);
      });
  }, [chapterNum, shlokNum]);


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
      const nextExists = allShloks.find(
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

  
    if (diff < -50 && shlokNum > 1) {
      const prevExists = allShloks.find(
        (s) =>
          s.chapter === chapterNum &&
          s.shlokNumber === shlokNum - 1
      );

      if (prevExists) {
        setSwipeClass("swipe-right");
        setTimeout(() => {
          router.push(`/reader/${chapter}/${shlokNum - 1}`);
        }, 200);
      }
    }
  };


  useEffect(() => {
    setSwipeClass("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapter, shlok]);

 
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