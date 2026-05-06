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
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [swipeClass, setSwipeClass] = useState("");

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    let ignore = false;

    const fetchShlok = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        setCurrent(null);

        const res = await fetch(
          `/api/shlok?chapter=${chapterNum}&shlok=${shlokNum}`
        );
        const data = await res.json();

        if (ignore) return;

        const shlokData = data?.data ?? data;

        if (!res.ok || !shlokData) {
          setNotFound(true);
          setCurrent(null);
          return;
        }

        setCurrent(shlokData);
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setNotFound(true);
          setCurrent(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    if (!Number.isNaN(chapterNum) && !Number.isNaN(shlokNum)) {
      fetchShlok();
    }

    return () => {
      ignore = true;
    };
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

    if (Math.abs(diff) < 50 || loading) return;

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-gradient-to-b from-[#fdfaf5] to-[#f7f1e3] px-6">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 animate-pulse">
          <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
          <div className="h-5 w-full bg-gray-200 rounded mb-3" />
          <div className="h-5 w-11/12 bg-gray-200 rounded mb-3" />
          <div className="h-5 w-10/12 bg-gray-200 rounded mb-6" />
          <div className="h-4 w-8/12 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-7/12 bg-gray-200 rounded" />
        </div>
        <p className="mt-6 text-gray-500 text-sm">Loading shlok...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-gradient-to-b from-[#fdfaf5] to-[#f7f1e3] px-6">
        <h2 className="text-xl mb-2">Shlok not found ❌</h2>
        <p className="text-gray-500">Try adding it from admin panel</p>
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

      <NavigationControls chapter={chapterNum} shlok={shlokNum} />

      <div className="absolute bottom-4 text-gray-400 text-sm">← Swipe →</div>
    </div>
  );
}