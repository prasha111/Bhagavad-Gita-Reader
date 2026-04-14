import ShlokCard from "@/components/reader/ShlokCard";
import NavigationControls from "@/components/reader/NavigationControls";

export default function ReaderPage() {
  const shlok = {
    chapter: 1,
    shlokNumber: 1,
    sanskrit: "धर्मक्षेत्रे कुरुक्षेत्रे...",
    meaning: {
      english: "In the field of dharma...",
      hindi: "धर्मभूमि कुरुक्षेत्र में..."
    },
    media: {
      audio: "/audio/shlok1.mp3"
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fdfaf5]">
      <ShlokCard shlok={shlok} />
      <NavigationControls />
    </div>
  );
}