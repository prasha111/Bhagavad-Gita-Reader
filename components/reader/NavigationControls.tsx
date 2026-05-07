"use client";

import { useRouter } from "next/navigation";

export default function NavigationControls({
  chapter,
  shlok,
}: any) {
  const router = useRouter();

  const prev = () => {
    if (Number(shlok) > 1) {
      router.push(`/reader/${chapter}/${Number(shlok) - 1}`);
    }
  };

  const next = () => {
    router.push(`/reader/${chapter}/${Number(shlok) + 1}`);
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-between px-6">
      
      { <button
        onClick={() =>
          ((shlok !==1 && chapter === 1) &&router.push(`/reader/${chapter}/${Number(shlok) - 1}`))
        }
        className="bg-white shadow-lg px-4 py-2 rounded-full hover:scale-105 transition text-black"
      >
        ←
      </button>}

      <button
        onClick={() =>
          router.push(`/reader/${chapter}/${Number(shlok) + 1}`)
        }
        className="bg-white shadow-lg px-4 py-2 rounded-full hover:scale-105 transition text-black"
      >
        →
      </button>
    </div>
  );
}

