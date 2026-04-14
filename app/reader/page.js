"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const dummyData = [
  {
    chapter: 1,
    verse: 1,
    shlok: "धर्मक्षेत्रे कुरुक्षेत्रे...",
    meaning: "In the holy land of Kurukshetra..."
  },
  {
    chapter: 1,
    verse: 2,
    shlok: "संजय उवाच...",
    meaning: "Sanjaya said..."
  }
];

export default function Reader() {
  const [index, setIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#f8f5f0]">

      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-10">

        <div className="max-w-2xl w-full">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-md"
            >
              <p className="text-sm text-gray-500 mb-2">
                Chapter {dummyData[index].chapter} • Verse {dummyData[index].verse}
              </p>

              <h2 className="text-2xl text-center mb-4">
                {dummyData[index].shlok}
              </h2>

              <p className="text-lg text-gray-600 text-center">
                {dummyData[index].meaning}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setIndex(index - 1)}
              disabled={index === 0}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Prev
            </button>

            <button
              onClick={() => setIndex(index + 1)}
              disabled={index === dummyData.length - 1}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}