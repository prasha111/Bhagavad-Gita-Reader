import Link from "next/link";

const chapters = [
  { id: 1, name: "Arjuna Vishada Yoga", shlokCount: 47 },
  { id: 2, name: "Sankhya Yoga", shlokCount: 72 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf5] to-[#f7f1e3] text-[#1a1a1a]">
      

      <div className="text-center pt-16 pb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-serif tracking-wide">
          Bhagavad Gita
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          A timeless guide to life, duty, and inner peace.  
          Start your journey through divine wisdom.
        </p>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 max-w-4xl mx-auto pb-16">
        {chapters.map((ch) => (
          <Link key={ch.id} href={`/reader/${ch.id}/1`}>
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-xl transition duration-300 cursor-pointer hover:scale-[1.02]">
              
         
              <h2 className="text-xl font-semibold mb-2">
                Chapter {ch.id}
              </h2>

              <p className="text-gray-700 font-medium">
                {ch.name}
              </p>

          
              <p className="text-sm text-gray-500 mt-2">
                {ch.shlokCount} Shlokas
              </p>

      
              <div className="mt-4 text-sm text-gray-600">
                Start Reading →
              </div>
            </div>
          </Link>
        ))}
      </div>


      <div className="text-center pb-10 text-gray-500 italic">
        “Whenever dharma declines… I manifest myself.”  
      </div>
    </div>
  );
}